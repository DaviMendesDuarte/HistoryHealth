import React, { useContext, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { GlobalStyles } from "../../styles/GlobalStyles";

export default function RegisterInfoPage() {
  const { theme, colors } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const [cpf, setCPF] = useState(user?.cpf || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");
  const [endereco, setEndereco] = useState(user?.endereco || "");
  const [nascimento, setNascimento] = useState(user?.nascimento || "");
  const [sexo, setSexo] = useState(user?.sexo || "");
  const [tipoSanguineo, setTipoSanguineo] = useState(user?.tipoSanguineo || "");
  const [contatoNome, setContatoNome] = useState(user?.contatoEmergencia?.nome || "");
  const [contatoCPF, setContatoCPF] = useState(user?.contatoEmergencia?.cpf || "");
  const [contatoTelefone, setContatoTelefone] = useState(user?.contatoEmergencia?.telefone || "");
  const [doencas, setDoencas] = useState(user?.doencas || "");
  const [tratamentos, setTratamentos] = useState(user?.tratamentos || "");

  const sexos = ["Masculino", "Feminino", "Outro"];
  const tiposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Formatação de CPF
  const formatCPF = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  };

  // Formatação de telefone
  const formatTelefone = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 11);
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      v = v.replace(/(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return v;
  };

  // Formatação de data
  const formatData = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 8);
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    return v;
  };

  const salvar = async () => {
    const updated = {
      ...user,
      cpf,
      telefone,
      endereco,
      nascimento,
      sexo,
      tipoSanguineo,
      contatoEmergencia: { nome: contatoNome, cpf: contatoCPF, telefone: contatoTelefone },
      doencas,
      tratamentos,
    };
    await setUser(updated);
    Alert.alert("Sucesso", "Informações atualizadas.");
  };

  const renderOption = (option, selected, onPress) => (
    <TouchableOpacity
      key={option}
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: selected ? colors[theme].primary : colors[theme].card,
        borderWidth: selected ? 0 : 1,
        borderColor: colors[theme].muted,
        marginRight: 10,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: selected ? "#fff" : colors[theme].text, fontWeight: "600" }}>{option}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 24 }}>
      {/* Informações Pessoais */}
      <View style={[GlobalStyles.card, { backgroundColor: colors[theme].card }]}>
        <Text style={[GlobalStyles.title, { color: colors[theme].text }]}>Informações Pessoais</Text>

        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="CPF"
          placeholderTextColor={colors[theme].muted}
          value={cpf}
          keyboardType="numeric"
          onChangeText={(v) => setCPF(formatCPF(v))}
        />
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="Telefone"
          placeholderTextColor={colors[theme].muted}
          value={telefone}
          keyboardType="numeric"
          onChangeText={(v) => setTelefone(formatTelefone(v))}
        />
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="Endereço"
          placeholderTextColor={colors[theme].muted}
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="Data de nascimento"
          placeholderTextColor={colors[theme].muted}
          value={nascimento}
          keyboardType="numeric"
          onChangeText={(v) => setNascimento(formatData(v))}
        />

        <Text style={{ marginTop: 10, color: colors[theme].text }}>Sexo:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
          {sexos.map((s) => renderOption(s, sexo === s, () => setSexo(s)))}
        </View>

        <Text style={{ marginTop: 10, color: colors[theme].text }}>Tipo sanguíneo:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
          {tiposSanguineos.map((t) => renderOption(t, tipoSanguineo === t, () => setTipoSanguineo(t)))}
        </View>
      </View>

      {/* Contato de Emergência */}
      <View style={[GlobalStyles.card, { backgroundColor: colors[theme].card, marginTop: 20 }]}>
        <Text style={[GlobalStyles.title, { color: colors[theme].text }]}>Contato de Emergência</Text>
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="Nome"
          placeholderTextColor={colors[theme].muted}
          value={contatoNome}
          onChangeText={setContatoNome}
        />
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="CPF"
          placeholderTextColor={colors[theme].muted}
          value={contatoCPF}
          keyboardType="numeric"
          onChangeText={(v) => setContatoCPF(formatCPF(v))}
        />
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text }]}
          placeholder="Telefone"
          placeholderTextColor={colors[theme].muted}
          value={contatoTelefone}
          keyboardType="numeric"
          onChangeText={(v) => setContatoTelefone(formatTelefone(v))}
        />
      </View>

      {/* Saúde */}
      <View style={[GlobalStyles.card, { backgroundColor: colors[theme].card, marginTop: 20 }]}>
        <Text style={[GlobalStyles.title, { color: colors[theme].text }]}>Saúde</Text>
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text, minHeight: 60 }]}
          placeholder="Doenças crônicas"
          placeholderTextColor={colors[theme].muted}
          value={doencas}
          multiline
          onChangeText={setDoencas}
        />
        <TextInput
          style={[GlobalStyles.input, { backgroundColor: colors[theme].background, color: colors[theme].text, minHeight: 60 }]}
          placeholder="Tratamentos"
          placeholderTextColor={colors[theme].muted}
          value={tratamentos}
          multiline
          onChangeText={setTratamentos}
        />
      </View>

      <TouchableOpacity style={[GlobalStyles.button, { backgroundColor: colors[theme].primary, marginTop: 20 }]} onPress={salvar}>
        <Text style={GlobalStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
