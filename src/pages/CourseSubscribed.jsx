import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CourseContext from "../context/CourseContext";
import Button from "../components/Button";
import AuthContext from "../context/AuthContext";

export default function CourseSubscribed({ route, navigation }) {
  const { course, setCourse } = useContext(CourseContext);
  const { user, _setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [badgeWon, setBadgeWon] = useState();

  async function getCourseById(id) {
    setIsLoading(true);
    await axios
      .get(`http://192.168.15.4:3000/student/subscribed/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCourse(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useFocusEffect(useCallback(
    () => {
    const currCourse = course;
    console.log('c')

    if (currCourse?.alc_status == 1) return;

    console.log('d')

    if (currCourse?.modulos?.every((mod) => mod.completo == 1)) {
      axios
        .put(
          "http://192.168.15.4:3000/student/completeCourse",
          {
            cursoId: course.cur_id,
            cursoXp: course.cur_qtdExperiencia,
            userNivel: user.nivel || 1,
            userXp: user.experiencia || 0,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          _setUser({
            ...user,
            nivel: res.data.userNivel,
            experiencia: res.data.userXp,
          });
          currCourse.alc_status = 1;
          setCourse(currCourse);

          setBadgeWon(res.data.badge);

          setTimeout(() => {
            setCourseCompleted(true);
          }, 1000);
        })
        .catch((err) => {
          console.log("eoq", err);
        });
    }
  }, [course]));

  useEffect(() => {
    getCourseById(route.params.id);
  }, [route.params.id]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={courseCompleted}
      >
        <View className="bg-zinc-950/20 h-full">
          <View className="h-fit mx-5 mt-14 bg-amber-50 rounded-xl p-3 pb-6">
            <TouchableOpacity
              className="items-end mb-4"
              onPress={() => setCourseCompleted(false)}
            >
              <Ionicons name="close" size={26} />
            </TouchableOpacity>
            <View>
              <View className="w-full h-0.5 bg-amber-500"></View>
              <Text className="text-3xl font-bold text-center my-4">
                Parabéns!
              </Text>
              <Text className="text-lg text-center">
                Você completou o curso
              </Text>
              <Text className="text-lg text-center font-bold">
                {course?.cur_titulo}
              </Text>

              {badgeWon && (
                <View className="justify-center items-center">
                  <Text className="text-lg font-medium text-center">
                    e ganhou a insígnia {badgeWon?.ins_titulo}:
                  </Text>
                  <Image
                    source={{
                      uri: `http://192.168.15.4:3000/badges/${badgeWon?.ins_icone}`,
                    }}
                    className="w-28 h-28 mt-4"
                  />
                </View>
              )}

              <View className="items-center">
                <View className="bg-amber-400 flex-row items-center justify-center py-1 px-2 my-3 rounded-md">
                  <Ionicons name="add" size={32} color={"white"} />
                  <Text className="font-bold text-lg text-white">
                    {course?.cur_qtdExperiencia} XP
                  </Text>
                </View>
              </View>
              <View className="mt-6">
                <Button
                  text="Ir ao perfil"
                  onPress={() => navigation.jumpTo("profile")}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading ? (
        <Text></Text>
      ) : (
        <ScrollView>
          <View className="px-4 py-2 mb-12">
            <Text className="text-3xl font-bold mb-4">
              {course?.cur_titulo}
            </Text>
            <View>
              {course?.modulos?.map((mod) => {
                return (
                  <TouchableOpacity
                    key={mod.id}
                    className="p-2 rounded-md mb-4 border border-amber-500 flex-row items-center justify-between"
                    onPress={() => {
                      navigation.navigate("module", { modId: mod.id });
                    }}
                  >
                    <View className="flex-row items-center">
                      <View className="bg-amber-200/50 p-2 rounded-md">
                        <Ionicons
                          name="library"
                          color={"rgb(245 158 11)"}
                          size={24}
                        />
                      </View>
                      <Text className="text-amber-500 text-lg font-bold ml-2 flex-1">
                        {mod.titulo}
                      </Text>
                      <View className="bg-amber-200/90 rounded-md p-1">
                        <FontAwesome
                          name="check"
                          size={20}
                          color={
                            mod.completo === 1 ? "rgb(245 158 11)" : "#fffbeb"
                          }
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
