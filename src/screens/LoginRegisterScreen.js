import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function LoginRegisterScreen({ navigation }) {
  const { registerAccount, login, user } = useContext(UserContext);
  const { theme, colors } = useContext(ThemeContext);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (user) navigation.replace("Home");
  }, [user]);

  const validEmail = (e) => /\S+@\S+\.\S+/.test(e);

  async function handleRegister() {
    if (!validEmail(email)) return alert("Email inválido");
    const res = await registerAccount(email, senha);
    if (!res.ok) return alert(res.msg);
    alert("Conta criada — agora faça login");
    setMode("login");
    setEmail("");
    setSenha("");
  }

  async function handleLogin() {
    if (!validEmail(email)) return alert("Email inválido");
    const res = await login(email, senha);
    if (!res.ok) return alert(res.msg);
    navigation.replace("Home");
  }

  return (
    <View style={[GlobalStyles.pageCenter, { backgroundColor: colors[theme].background }]}>
      <View style={[GlobalStyles.card, { backgroundColor: colors[theme].card }]}>
        <Text style={[GlobalStyles.title, { color: colors[theme].text }]}>
          {mode === "login" ? "Entrar" : "Criar Conta"}
        </Text>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={colors[theme].muted}
          value={email}
          onChangeText={setEmail}
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor={colors[theme].muted}
          value={senha}
          onChangeText={setSenha}
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
        />

        <TouchableOpacity
          style={[GlobalStyles.button, { backgroundColor: colors[theme].primary }]}
          onPress={mode === "login" ? handleLogin : handleRegister}
        >
          <Text style={GlobalStyles.buttonText}>{mode === "login" ? "Entrar" : "Cadastrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")} style={{ marginTop: 12 }}>
          <Text style={{ color: colors[theme].primary, fontWeight: "700", textAlign: "center" }}>
            {mode === "login" ? "Criar conta" : "Já tenho conta — Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
