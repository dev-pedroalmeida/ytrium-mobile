import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function CourseCard({ course, isProfile = false }) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate("course", {id: course.cur_id})} className="mb-4">
      <View className="p-4 bg-white rounded-md min-w-[90vw] max-w-[90vw]">
        <View className="flex-row items-center mb-3 overflow-hidden">
          <Ionicons name="sparkles" size={20} color={"#F59E0B"} />
          <View className="ml-3 h-[3px] flex-1 bg-amber-500"></View>
          {course?.alc_status == 1 &&
            <Text className="ml-3 py-0.5 px-1 text-sm font-bold tracking-tight rounded-lg bg-amber-500 text-white">Completo</Text>
          }
        </View>
        <Text className="mb-3 text-xl font-bold">{course.cur_titulo}</Text>
        <View>
          <FlatList
            horizontal={true}
            className=" flex-row"
            data={course.categorias}
            renderItem={({ item }) => (
              <View className="p-1 mr-1 w-fit bg-amber-100/70 rounded">
                <Text className="text-amber-500 font-bold">{item}</Text>
              </View>
            )}
          />
        </View>
        <View className="flex-row justify-between mt-3">
          {!isProfile &&
            <Text>{course.cur_qtdInscritos} inscritos</Text>
          }
          <Text className="p-1 bg-amber-500 text-white rounded font-bold">
            {course.cur_dificuldade}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
