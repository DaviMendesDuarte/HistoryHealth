import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { GlobalStyles } from "../../styles/GlobalStyles";

export default function UsersPage() {
  const { theme, colors } = useContext(ThemeContext);
  const { users: contextUsers, deleteUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  // Atualiza lista local ao mudar o context
  useEffect(() => setUsers(contextUsers), [contextUsers]);

  // Exclui usuário
  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Renderiza cada usuário
  const renderUser = ({ item }) => (
    <View
      style={[
        GlobalStyles.card,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors[theme].card,
          marginBottom: 16,
          width: "95%",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors[theme].primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
            {item.email[0].toUpperCase()}
          </Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={{ color: colors[theme].text, fontWeight: "700" }}>
            {item.email}
          </Text>
          <Text style={{ color: colors[theme].muted }}>Senha: {item.senha}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors[theme].danger,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 10,
        }}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
      }}
    >
      <Text style={[GlobalStyles.title, { color: colors[theme].text, marginBottom: 20 }]}>
        Usuários Cadastrados
      </Text>

      {(!users || users.length === 0) ? (
        <Text style={{ color: colors[theme].muted }}>Nenhum usuário cadastrado.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
