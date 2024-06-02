import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import Button from "../components/Button";
import RichText from "../components/RichText";
import axios from "axios";

export default function CoursePage({ route, navigation }) {
  const [course, setCourse] = useState({});

  async function subscribe() {
    await axios.post(`http://192.168.15.4:3000/student/subscribe`,
      {curso: course},
      {withCredentials: true}
    )
    .then(res => {
      console.log(res)
      navigation.navigate("subscriptions")
    })
  }

  function getCourseById(id) {
    axios.get(`http://192.168.15.4:3000/course/${id}`, {
      withCredentials: true,
    })
    .then(res => {
      setCourse(res.data)
    })
  }

  useEffect(() => {
    getCourseById(route.params.id);
  }, []);

  return (
    <>
      {course ? (
        <ScrollView>
          <View className="px-4 py-2 mb-12">
            <Text className="text-3xl font-bold mb-4">{course.cur_titulo}</Text>
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="h-8 w-8 bg-amber-400 rounded-full mr-3 items-center justify-center">
                  <Ionicons name="person" size={20} color={"#fef3c7"} />
                </View>
                <Text className="text-lg font-bold">{course.usu_nome}</Text>
              </View>
              <View>
                <Text className="p-1 bg-amber-500 text-white rounded font-bold">
                  {course.cur_dificuldade}-{course.cur_qtdExperiencia} XP
                </Text>
              </View>
            </View>
            <View className="mb-4">
              <FlatList
                horizontal={true}
                className="flex-row"
                data={course.categorias}
                renderItem={({ item }) => (
                  <View className="p-1 mr-1 w-fit bg-amber-200/50 rounded">
                    <Text className="text-amber-500 font-bold">
                      {item.descricao}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View className="mb-10">
              <Text className="text-right">
                {course?.cur_qtdInscritos} inscritos
              </Text>
            </View>
            {
              course?.alc_status == null ? (
                <Button
                  text="INSCREVER"
                  onPress={subscribe}
                />
              ) : (
                <Button
                  text="CONTINUAR"
                  onPress={() =>
                    navigation.navigate("subscriptions")
                  }
                />
              )
            }
            <View className="my-10">
              <Text className="text-xl font-bold mb-2">Descrição</Text>
              <RichText data={course.cur_descricao} />
            </View>
            <View>
              <Text className="text-xl font-bold mb-2">Módulos</Text>
              {course?.modulos?.map(mod => {
                return (
                  <View key={mod.id} className="p-1 bg-amber-200/50 mb-2 flex-row">
                    <Ionicons name="library" color={'rgb(245 158 11)'} size={20} />
                    <Text className="text-amber-500 text-base font-bold ml-2">{mod.titulo}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text>Nada encontrado!</Text>
      )}
    </>
  );
}
