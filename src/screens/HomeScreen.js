import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import { GlobalStyles } from "../styles/GlobalStyles";

// Telas internas
import RegisterInfoScreen from "./sidebar/RegisterInfoPage";
import HomePage from "./sidebar/HomePage";
import SettingsPage from "./sidebar/SettingsPage"; // <-- Import necessário

export default function HomeScreen({ navigation }) {
  const { theme, colors, setTheme } = useContext(ThemeContext);
  const { user, logout, users: contextUsers, deleteUser } = useContext(UserContext);

  const [page, setPage] = useState("home");
  const [users, setUsers] = useState([]);

  useEffect(() => setUsers(contextUsers), [contextUsers]);

  useEffect(() => {
    if (!user) navigation.reset({ index: 0, routes: [{ name: "LoginRegister" }] });
  }, [user]);

  const renderSidebarItem = (icon, label, key) => {
    const active = page === key;
    return (
      <TouchableOpacity
        key={key}
        style={[
          GlobalStyles.sidebarItem,
          active && { backgroundColor: colors[theme].primary, borderRadius: 12 },
        ]}
        onPress={() => setPage(key)}
      >
        <Ionicons name={icon} size={22} color={active ? "#fff" : colors[theme].text} />
        <Text style={{ marginLeft: 12, fontWeight: "600", color: active ? "#fff" : colors[theme].text }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const confirmDelete = (id) => deleteUser(id);

  const UsersPage = () => (
    <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
      <Text style={[GlobalStyles.title, { color: colors[theme].text }]}>Usuários Cadastrados</Text>
      {(!users || users.length === 0) ? (
        <Text style={{ color: colors[theme].muted, marginTop: 12 }}>Nenhum usuário cadastrado.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[GlobalStyles.card, { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors[theme].primary, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontWeight: "700" }}>{item.email[0].toUpperCase()}</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: colors[theme].text, fontWeight: "700" }}>{item.email}</Text>
                  <Text style={{ color: colors[theme].muted }}>Senha: {item.senha}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[GlobalStyles.button, { backgroundColor: colors[theme].danger }]}
                onPress={() => confirmDelete(item.id)}
              >
                <Text style={GlobalStyles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ width: "100%", alignItems: "center" }}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row", backgroundColor: colors[theme].background }}>
      {/* SIDEBAR */}
      <View style={[GlobalStyles.sidebar, { backgroundColor: colors[theme].card, justifyContent: "space-between" }]}>
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors[theme].primary, alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 22 }}>{user?.email?.[0]?.toUpperCase() || "U"}</Text>
          </View>
          <Text style={{ color: colors[theme].text, fontWeight: "700", fontSize: 14, textAlign: "center" }} numberOfLines={1}>
            {user?.email || "Não logado"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {renderSidebarItem("home-outline", "Início", "home")}
          {renderSidebarItem("document-text-outline", "Cadastrar Informações", "registerInfo")}
          {renderSidebarItem("people-outline", "Usuários", "users")}
          {renderSidebarItem("settings-outline", "Configurações", "settings")}
        </View>

        <TouchableOpacity
          style={[GlobalStyles.button, { backgroundColor: colors[theme].danger, flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={[GlobalStyles.buttonText, { marginLeft: 8 }]}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={{ flex: 1, padding: 24 }}>
        {page === "home" && <HomePage />}
        {page === "registerInfo" && <RegisterInfoScreen />}
        {page === "users" && <UsersPage />}
        {page === "settings" && <SettingsPage />} {/* <-- Aqui agora leva para SettingsPage */}
      </View>
    </SafeAreaView>
  );
}
