import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CourseSubscribed({ route, navigation }) {
  const [course, setCourse] = useState({});

  async function getCourseById(id) {
    await axios.get(`http://192.168.15.4:3000/student/subscribed/${id}`, {
      withCredentials: true,
    })
    .then(res => {
      console.log(res)
      setCourse(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCourseById(route.params.id);
  }, []);

  return (
    <ScrollView>
      <View className="px-4 py-2 mb-12">
        <Text className="text-3xl font-bold mb-4">{course?.cur_titulo}</Text>
        <View>
          {course?.modulos?.map((mod) => {
            return (
              <TouchableOpacity
                key={mod.id}
                className="p-1 rounded-md bg-amber-200/50 mb-4 flex-row items-center justify-between"
                onPress={() => navigation.navigate("module", { module: mod })}
              >
                <View className="flex-row">
                  <Ionicons
                    name="library"
                    color={"rgb(245 158 11)"}
                    size={20}
                  />
                  <Text className="text-amber-500 text-base font-bold ml-2">
                    {mod.titulo}
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
    </ScrollView>
  );
}
