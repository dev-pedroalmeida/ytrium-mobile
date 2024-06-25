import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import RichText from "../components/RichText";
import Button from "../components/Button";
import CourseContext from "../context/CourseContext";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function ContentPage({ route, navigation }) {
  const { course, setCourse } = useContext(CourseContext);

  const [content, setContent] = useState({});

  function handleCompleteContent() {
    const currCouse = course;
    const modId = route.params.modId;
    const contId = route.params.contId;

    axios
      .put(
        `http://192.168.15.4:3000/student/completeContent`,
        { conteudoId: contId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        currCouse.modulos.forEach((mod) => {
          if (mod.id == modId) {
            mod.conteudos.forEach((cont) => {
              if (cont.id == contId) {
                cont.completo = 1;
              }
            });
          }
        });

        setContent((prev) => ({
          ...prev,
          completo: 1,
        }));

        setCourse(currCouse);
        navigation.goBack();
      }).catch(err => console.log(err))
  }

  useFocusEffect(
    useCallback(() => {
      const modId = route.params.modId;
      const contId = route.params.contId;

      setContent(
        course.modulos
          .find((mod) => mod.id == modId)
          .conteudos.find((cont) => (cont.id = contId))
      );
    }, [route.params.contId])
  );

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
            <View className="bg-amber-200/90 rounded-md p-1">
              <FontAwesome
                name="check"
                size={20}
                color={content?.completo === 1 ? "rgb(245 158 11)" : "#fffbeb"}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <Text className="text-center text-xl font-bold">
            {content?.titulo}
          </Text>
        </View>
        <RichText data={content?.material} />

        <Button
          text="Completar"
          classes="mt-12"
          onPress={() => {
            handleCompleteContent();
          }}
          disabled={content.completo == 1}
        />
      </View>
    </ScrollView>
  );
}
