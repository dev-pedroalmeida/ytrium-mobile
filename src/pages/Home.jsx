import { FlatList, Text, View } from "react-native";
import CourseCard from "../components/CourseCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Home({navigation}) {

  const [coursesList, setCoursesList] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await getAllCourses()
    setRefreshing(false)
  }, [])

  const getAllCourses = async () => {
    await axios.get("http://192.168.15.4:3000/course/getAll", {
      withCredentials: true,
    })
    .then(res => {
      setCoursesList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getAllCourses()
  }, [])

  return (
    <View className="px-4 py-2 mb-12">
      <Text className="text-3xl font-bold mb-4">Novos Cursos</Text>

      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
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
