import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CourseContext from "../context/CourseContext";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function ModulePage({ route, navigation }) {
  const { course, setCourse } = useContext(CourseContext);

  const [module, setModule] = useState({});
  const [conQuizz, setConQuizz] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const currCourse = course;
      currCourse.modulos.forEach((mod) => {
        if (mod.id === route.params.modId) {
          if (
            mod.conteudos.every((cont) => cont.completo == 1) &&
            mod.quizzes.every((qui) => qui.completo == 1)
          ) {
            axios.put('http://192.168.15.4:3000/student/completeModule', 
              { moduloId: route.params.modId },
              { withCredentials: true }
            ).then(res => {
              mod.completo = 1;
              console.log(currCourse.modulos)
              if(currCourse?.alc_status == 0) {
                console.log('a')
                if (currCourse.modulos.every((mod) => mod.completo == 1)) {
                  console.log('b')
                  navigation.dispatch(StackActions.popToTop())
                }
              }
              setCourse(currCourse);
            }).catch(err => console.log(err))
          }
        }
      });
    }, [course])
  );

  useFocusEffect(
    useCallback(() => {
      const modId = route.params.modId;
      const tempMod = course.modulos.find((mod) => mod.id === modId);
      const tempCq = [...tempMod.conteudos, ...tempMod.quizzes];
      tempCq.sort((a, b) => a.index - b.index);

      setModule(tempMod);
      setConQuizz(tempCq);
    }, [route.params.modId])
  );

  return (
    <ScrollView>
      <View className="px-4 py-2 mb-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center"
        >
          <Ionicons name="chevron-back" size={16} />
          <Text>Voltar</Text>
        </TouchableOpacity>
        <View className="mb-4">
          <Text className="text-center text-xl font-bold">
            {module?.titulo}
          </Text>
        </View>
        <View>
          {conQuizz?.map((cq, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="p-2 rounded-md border border-amber-500 mb-4 flex-row items-center justify-between max-w-full"
                onPress={() =>
                  cq.material
                    ? navigation.navigate("content", {
                        modId: route.params.modId,
                        contId: cq.id,
                      })
                    : navigation.navigate("quizz", {
                        modId: route.params.modId,
                        quizzId: cq.id,
                      })
                }
              >
                <View className="flex-row items-center">
                  <View className="bg-amber-200/50 p-2 rounded-md">
                    {cq.material ? (
                      <MaterialCommunityIcons
                        name="text"
                        color={"rgb(245 158 11)"}
                        size={20}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="format-list-checks"
                        color={"rgb(245 158 11)"}
                        size={20}
                      />
                    )}
                  </View>
                  <Text className="text-amber-500 text-base font-bold ml-2 flex-1">
                    {cq.titulo}
                  </Text>
                  <View className="bg-amber-200/90 rounded-md p-1">
                    <FontAwesome
                      name="check"
                      size={20}
                      color={cq.completo === 1 ? "rgb(245 158 11)" : "#fffbeb"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
