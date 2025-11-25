import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const usersStorage = await AsyncStorage.getItem("USERS");
        const loggedUser = await AsyncStorage.getItem("LOGGED_USER");
        if (usersStorage) setUsers(JSON.parse(usersStorage));
        if (loggedUser) setUserState(JSON.parse(loggedUser));
      } catch (err) {
        console.log("Erro ao carregar dados:", err);
      }
    })();
  }, []);

  const saveUsers = async (newList) => {
    setUsers(newList);
    await AsyncStorage.setItem("USERS", JSON.stringify(newList));
  };

  const registerAccount = async (email, senha) => {
    if (users.some(u => u.email === email)) return { ok: false, msg: "Email já cadastrado" };
    const newUser = { id: Date.now(), email, senha };
    await saveUsers([...users, newUser]);
    return { ok: true };
  };

  const login = async (email, senha) => {
    const found = users.find(u => u.email === email && u.senha === senha);
    if (!found) return { ok: false, msg: "Email ou senha incorretos" };
    setUserState(found);
    await AsyncStorage.setItem("LOGGED_USER", JSON.stringify(found));
    return { ok: true };
  };

  const logout = async () => {
    setUserState(null);
    await AsyncStorage.removeItem("LOGGED_USER");
  };

  const setUser = async (updatedUser) => {
    setUserState(updatedUser);
    await AsyncStorage.setItem("LOGGED_USER", JSON.stringify(updatedUser));
    const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    await saveUsers(updatedUsers);
  };

  const deleteUser = async (id) => {
    const updated = users.filter(u => u.id !== id);
    await saveUsers(updated);
    if (user?.id === id) await logout();
  };

  return (
    <UserContext.Provider value={{ users, user, setUser, registerAccount, login, logout, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}
