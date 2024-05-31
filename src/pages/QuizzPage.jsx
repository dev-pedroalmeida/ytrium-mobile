import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";

export default function QuizzPage({ route, navigation }) {
  const [quizz, setQuizz] = useState(route.params.quizz);

  // console.log(quizz.questoes[0].alternativas)

  return (
    <ScrollView>
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
            <Ionicons
              name="checkmark-circle"
              color={"rgb(245 158 11)"}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <Text className="text-center text-xl font-bold">{quizz?.titulo}</Text>
        </View>
        <View>
          {quizz?.questoes?.map((que, index) => {
            return (
              <View key={que.id} className="mb-4">
                <Text className="font-bold text-lg mb-1">
                  {index + 1 + " - " + que.pergunta}
                </Text>
                {que.alternativas.map((alt) => {
                  return (
                    <TouchableOpacity
                      key={alt.id}
                      className="bg-amber-300/50 p-1 mb-2 rounded-md flex-row items-center"
                    >
                      <Ionicons
                        name="checkmark-circle"
                        color={"rgb(245 158 11)"}
                        size={24}
                      />
                      <Text className="pl-1">{alt.alternativa}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <Button text="Completar" classes="mt-12" />
      </View>
    </ScrollView>
  );
}
