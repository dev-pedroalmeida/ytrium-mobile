import { Modal, Text, TextInput, View } from "react-native";
import Button from "./Button";

export default function Login({ isOpen, onClose, navigation }) {
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
          />
        </View>
        <View className="my-6">
          <Text className>Senha:</Text>
          <TextInput
            keyboardType="visible-password"
            placeholder="********"
            className="border border-zinc-300 rounded-lg py-1 px-2"
          />
        </View>

        <View className="mt-8">
          <Button
            text="Logar"
            classes="mb-4"
            onPress={() => {
              navigation.navigate("home");
              onClose();
            }}
          />
          <Button text="Cancelar" onPress={onClose} variant="text" />
        </View>
      </View>
    </Modal>
  );
}
