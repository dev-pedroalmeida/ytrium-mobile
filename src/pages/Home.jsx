import { FlatList, Text, View } from "react-native";
import CourseCard from "../components/CourseCard";
import { Ionicons } from "@expo/vector-icons";

export default function Home({navigation}) {
  const coursesList = [
    {
      cur_id: 1,
      cur_titulo: "React básico",
      cur_status: "publico",
      cur_qtdInscritos: 5,
      cur_dificuldade: "Iniciante",
      usu_nome: "Instrutor",
      categorias: ["Javascript", "React"],
    },
  ];

  return (
    <View className="px-4 py-2 mb-12">
      <Text className="text-3xl font-bold mb-4">Novos Cursos</Text>

      <FlatList
        data={coursesList}
        renderItem={({item}) => <CourseCard course={item} navigation={navigation} />}
        keyExtractor={item => item.cur_id}
        ItemSeparatorComponent={() => (
          <View className="h-1"></View>
        )}
      />
    </View>
  );
}
