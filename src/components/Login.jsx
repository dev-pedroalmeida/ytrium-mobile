import { Alert, Modal, Text, TextInput, View } from "react-native";
import Button from "./Button";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function Login({ isOpen, onClose, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const { _setUser, _setIsAuth } = useContext(AuthContext);

  function handleLogin() {
    try {
      if (email === "" || password === "") {
        setError("Preencha todos os campos!");
        return;
      } else {
        _setUser({
          email,
          name: "Pedro",
        });
        _setIsAuth(true);

        navigation.navigate("home");
      }
    } catch (err) {
      Alert.alert(err);
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View className="h-[99%] w-full absolute bottom-0 bg-amber-50 p-4 rounded-t-xl">
        <View className="mt-6">
          <Text className="text-4xl font-bold">Login</Text>
          <Text className="text-zinc-600 font-bold">Insira seus dados!</Text>
        </View>

        <View className="mt-6">
          <Text>Email:</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="email@hotmail.com"
            className="border border-zinc-300 rounded-lg py-1 px-2"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View className="my-6">
          <Text className>Senha:</Text>
          <TextInput
            keyboardType="visible-password"
            placeholder="********"
            className="border border-zinc-300 rounded-lg py-1 px-2"
            value={password}
            onChangeText={(pass) => setPassword(pass)}
          />
        </View>

        {error && (
          <Text className="text-red-500 bg-red-400/30 font-bold text-center p-1 rounded-md">
            {error}
          </Text>
        )}

        <View className="mt-8">
          <Button text="Logar" classes="mb-4" onPress={handleLogin} />
          <Button text="Cancelar" onPress={onClose} variant="text" />
        </View>
      </View>
    </Modal>
  );
}
