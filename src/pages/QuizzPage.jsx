import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import AlternativeRadio from "../components/AlternativeRadio";
import Question from "../components/Question";
import { useFocusEffect } from "@react-navigation/native";
import CourseContext from "../context/CourseContext";
import axios from "axios";

export default function QuizzPage({ route, navigation }) {
  const { course, setCourse } = useContext(CourseContext);

  const [quizz, setQuizz] = useState({});

  const [answers, setAnswers] = useState([]);

  function handleCompleteQuizz() {
    let err = false;

    answers.forEach((ans) => {
      if (ans.selectId == null) {
        Alert.alert("Selecione uma alternativa para cada questão!");
        err = true;
        return;
      }
    });

    if (err) return;

    let corretas = 0;
    let incorretas = 0;
    let qtdPerguntas = answers.length;
    let porAcertos = 0;

    answers.forEach((ans) => {
      if (ans.selectId == ans.corretaId) {
        corretas++;
      } else {
        incorretas++;
      }
    });

    porAcertos = (corretas / qtdPerguntas) * 100;

    if (porAcertos < 50) {
      Alert.alert(
        `Você acertou ${porAcertos}%. Acerte 50% ou mais para passar!`
      );
    } else {
      // save in database
      Alert.alert(`Parabéns, você acertou ${porAcertos}%`);
      
      const currCourse = course;
      const modId = route.params.modId;
      const quiId = route.params.quizzId;

      axios.put('http://192.168.15.4:3000/student/completeQuizz',
        { quizzId: quiId, porAcertos: porAcertos },
        { withCredentials: true }
      ).then(res => {
        console.log(res);

        currCourse.modulos.forEach((mod) => {
          if(mod.id = modId) {
            mod.quizzes.forEach((qui) => {
              if(qui.id = quiId) {
                qui.completo = 1
              }
            })
          }
        });
  
        setQuizz((prev) => ({
          ...prev,
          completo: 1,
        }))
  
        setCourse(currCourse)
      }).catch(err => console.log(err))
    }
  }

  useFocusEffect(
    useCallback(() => {
      const modId = route.params.modId;
      const quiId = route.params.quizzId;

      const currQuizz = course.modulos
        .find((mod) => mod.id == modId)
        .quizzes.find((qui) => qui.id == quiId);

      setQuizz(currQuizz);

      const answers = [];

      currQuizz.questoes.forEach((que) => {
        let { id } = que.alternativas.find((alt) => alt.correta == 1);

        answers.push({
          questaoId: que.id,
          corretaId: id,
          selectId: null,
        });
      });

      setAnswers(answers);
    }, [route.params.quizzId])
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
                color={quizz.completo === 1 ? "rgb(245 158 11)" : "#fffbeb"}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <Text className="text-center text-xl font-bold">{quizz?.titulo}</Text>
        </View>
        <View className="w-full">
          {quizz?.questoes?.map((que, queIndex) => (
            <Question
              key={que.id}
              que={que}
              queIndex={queIndex}
              handleSelectAnswer={(altId) => {
                setAnswers((prev) => {
                  const newAnswers = prev;
                  newAnswers.forEach((ans) => {
                    if (ans.questaoId == que.id) {
                      ans.selectId = altId;
                    }
                  });
                  return newAnswers;
                });
              }}
            />
          ))}
        </View>
        <Button
          text="Completar"
          classes="mt-12"
          onPress={handleCompleteQuizz}
          disabled={quizz.completo == 1}
        />
      </View>
    </ScrollView>
  );
}
