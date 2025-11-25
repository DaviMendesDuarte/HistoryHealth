import React, { useContext } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GlobalStyles } from "../../styles/GlobalStyles";

export default function SettingsPage() {
  const { theme, toggleTheme, daltonismType, setDaltonismType, colors } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const daltonismOptions = [
    { label: "Normal", value: "normal" },
    { label: "Protanopia (vermelho)", value: "protanopia" },
    { label: "Deuteranopia (verde)", value: "deuteranopia" },
    { label: "Tritanopia (azul)", value: "tritanopia" },
  ];

  return (
    <ScrollView
      contentContainerStyle={[GlobalStyles.pageCenter, { paddingVertical: 30, backgroundColor: colors[theme].background }]}
    >
      <Text style={[GlobalStyles.title, { color: colors[theme].text, marginBottom: 24 }]}>Configurações</Text>

      {/* Tema */}
      <View style={[GlobalStyles.card, { backgroundColor: colors[theme].card, marginBottom: 20 }]}>
        <Text style={[GlobalStyles.title, { fontSize: 18, color: colors[theme].text, marginBottom: 12 }]}>Tema</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Text style={{ color: colors[theme].text, fontWeight: "500" }}>Modo Escuro</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#ccc", true: colors[theme].primary }}
            thumbColor={isDark ? "#fff" : "#f4f3f4"}
            accessible={true}
            accessibilityLabel="Alternar modo escuro"
            accessibilityHint="Ativa ou desativa o modo escuro"
          />
        </View>
      </View>

      {/* Acessibilidade */}
      <View style={[GlobalStyles.card, { backgroundColor: colors[theme].card, marginBottom: 20 }]}>
        <Text style={[GlobalStyles.title, { fontSize: 18, color: colors[theme].text, marginBottom: 12 }]}>Acessibilidade</Text>
        {daltonismOptions.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            accessible={true}
            accessibilityLabel={`Selecionar ${opt.label}`}
            accessibilityHint="Altera a percepção de cores para daltonismo"
            style={[
              GlobalStyles.button,
              {
                marginVertical: 6,
                width: "100%",
                backgroundColor: daltonismType === opt.value ? colors[theme].primary + "22" : colors[theme].card,
                borderWidth: 1,
                borderColor: daltonismType === opt.value ? colors[theme].primary : "#ccc",
              },
            ]}
            onPress={() => setDaltonismType(opt.value)}
          >
            <Text style={{ color: colors[theme].text, fontWeight: "600" }}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
