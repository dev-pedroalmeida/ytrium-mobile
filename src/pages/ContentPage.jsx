import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RichText from "../components/RichText";
import Button from "../components/Button"

export default function ContentPage({ route, navigation }) {

  const [content, setContent] = useState(route.params.content);

  return (
    <View className="px-4 py-2 mb-12">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center"
        >
          <Ionicons name="chevron-back" size={16} />
          <Text>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Pressed!")}
          className="flex-row items-center"
        >
          <Ionicons name="checkmark-circle" color={"rgb(245 158 11)"} size={28} />
        </TouchableOpacity>
      </View>
      <View className="mb-4">
        <Text className="text-center text-xl font-bold">{content?.titulo}</Text>
      </View>
      <RichText data={content.material} />

      <Button text="Completar" classes="mt-12" />
    </View>
  )
}