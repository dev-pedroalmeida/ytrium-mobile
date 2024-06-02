import { Alert, Modal, Text, TextInput, View } from "react-native";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

export default function Login({ isOpen, onClose, navigation }) {

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confSenha, setConfSenha] = useState("")

  const [error, setError] = useState()

  function handleSignUp() {
    try {
      setError()
      if(
        nome === "" ||
        email === "" ||
        senha === "" ||
        confSenha === ""
      ) {
        setError("Preencha todos os campos!");
        return;
      } else {
        if(senha !== confSenha) return setError("As senhas não são iguais!")
        axios.post("http://192.168.15.4:3000/signup", {
          nome: nome,
          email: email,
          senha: senha,
          tipo: "estudante",
        })
        .then(res => {
          console.log(res)
          if(res.status == 200) {
            Alert.alert("Cadastro realizado com sucesso!", "Faça login para continuar")
            onClose()
          }
          setNome("")
          setEmail("")
          setSenha("")
          setConfSenha("")
        })
        .catch(err => {
          console.log(err)
          if(err.response.status == 400) {
            setError("Email já cadastrado!")
            return
          }
        })
      }

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View className="h-[99%] w-full absolute bottom-0 bg-amber-50 p-4 rounded-t-xl">
        <View className="mt-6">
          <Text className="text-4xl font-bold">Cadastro</Text>
          <Text className="text-zinc-600 font-bold">Insira seus dados!</Text>
        </View>

        <View className="mt-6">
          <Text>Nome:</Text>
          <TextInput
            keyboardType="default"
            placeholder="Nome"
            className="border border-zinc-300 rounded-lg py-1 px-2"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </View>
        <View className="mt-6">
          <Text>Email:</Text>
          <TextInput
            keyboardType="email-address"
            inputMode="email"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            placeholder="email@hotmail.com"
            className="border border-zinc-300 rounded-lg py-1 px-2"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="mt-6">
          <Text className>Senha:</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="********"
            className="border border-zinc-300 rounded-lg py-1 px-2"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
        <View className="my-6">
          <Text className>Confirmar Senha:</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="********"
            className="border border-zinc-300 rounded-lg py-1 px-2"
            value={confSenha}
            onChangeText={(text) => setConfSenha(text)}
          />
        </View>

        {error && (
          <Text className="text-red-500 bg-red-400/30 font-bold text-center p-1 rounded-md">
            {error}
          </Text>
        )}

        <View className="mt-8">
          <Button
            text="Cadastrar"
            classes="mb-4"
            onPress={handleSignUp}
          />
          <Button text="Cancelar" onPress={onClose} variant="text" />
        </View>
      </View>
    </Modal>
  );
}
