import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { GlobalStyles } from "../../styles/GlobalStyles";

export default function HomePage() {
  const { theme, colors } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <View style={[GlobalStyles.pageCenter, { backgroundColor: colors[theme].background }]}>
        <Text style={{ color: colors[theme].text, fontSize: 16, textAlign: "center" }}>
          Nenhuma informação cadastrada. Por favor, registre seus dados.
        </Text>
      </View>
    );
  }

  const { cpf, telefone, endereco, nascimento, sexo, tipoSanguineo, contatoEmergencia, doencas, tratamentos } = user;

  const renderCard = (title, fields) => (
    <View
      style={[
        GlobalStyles.card,
        {
          backgroundColor: colors[theme].card,
          marginBottom: 20,
          shadowColor: theme === "dark" ? "#000" : "#ccc",
          borderWidth: theme === "dark" ? 0 : 1,
          borderColor: theme === "dark" ? "#333" : "#e0e0e0",
        },
      ]}
    >
      <Text style={[GlobalStyles.title, { color: colors[theme].text, fontSize: 20 }]}>{title}</Text>
      {fields.map(({ label, value }, index) => (
        <View key={index} style={{ marginTop: index === 0 ? 0 : 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: colors[theme].muted }}>{label}:</Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: colors[theme].text }}>
            {value || "Não cadastrado"}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors[theme].background }}
      contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
    >
      {renderCard("Informações Pessoais", [
        { label: "CPF", value: cpf },
        { label: "Telefone", value: telefone },
        { label: "Endereço", value: endereco },
        { label: "Nascimento", value: nascimento },
        { label: "Sexo", value: sexo },
        { label: "Tipo Sanguíneo", value: tipoSanguineo },
      ])}

      {renderCard("Contato de Emergência", [
        { label: "Nome", value: contatoEmergencia?.nome },
        { label: "CPF", value: contatoEmergencia?.cpf },
        { label: "Telefone", value: contatoEmergencia?.telefone },
      ])}

      {renderCard("Saúde", [
        { label: "Doenças Crônicas", value: doencas },
        { label: "Tratamentos", value: tratamentos },
      ])}
    </ScrollView>
  );
}
  