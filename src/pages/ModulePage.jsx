import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ModulePage({ route, navigation }) {
  const [module, setModule] = useState(route.params.module);
  const [listConQuizz, setListConQuizz] = useState([]);

  useEffect(() => {
    if (module.quizzes) {
      setListConQuizz([...module.conteudos, ...module.quizzes]);
    } else {
      setListConQuizz([...module.conteudos]);
    }
  }, []);

  return (
    <View className="px-4 py-2 mb-12">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center"
      >
        <Ionicons name="chevron-back" size={16} />
        <Text>Voltar</Text>
      </TouchableOpacity>
      <View className="mb-4">
        <Text className="text-center text-xl font-bold">{module?.titulo}</Text>
      </View>
      <View>
        {listConQuizz?.map((cq, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="p-1 rounded-md bg-amber-200/50 mb-4 flex-row items-center justify-between"
              onPress={() => 
                cq.material ?
                 navigation.navigate("content", { content: cq })
                : (navigation.navigate("quizz", { quizz: cq }))
              }
            >
              <View className="flex-row items-center">
                {cq.material ? (
                  <MaterialCommunityIcons name="text" color={"rgb(245 158 11)"} size={20} />
                ) : (
                  <MaterialCommunityIcons name="format-list-checks" color={"rgb(245 158 11)"} size={20} />
                )}
                <Text className="text-amber-500 text-base font-bold ml-2">
                  {cq.titulo}
                </Text>
              </View>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={"rgb(245 158 11)"}
                // #f5cc84 ou rgb(245 158 11)
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
