import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import CourseCard from "../components/CourseCard";

export default function CompletedCourses() {
  const [courses, setCourses] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get("http://192.168.15.4:3000/student/completedCourses", {
          withCredentials: true,
        })
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  return (
    <View className="px-4 mb-12">
      <Text className="font-bold text-center text-2xl mb-8">
        Cursos completos
      </Text>
      <View>
        {courses?.length > 0 ? (
          <FlatList
            data={courses}
            renderItem={({ item }) => <CourseCard course={item} isProfile={true} />}
            keyExtractor={(item) => item.cur_id}
            ItemSeparatorComponent={() => <View className="h-1"></View>}
          />
        ) : (
          <Text className="text-center">Nenhum curso completo!</Text>
        )}
      </View>
    </View>
  );
}
