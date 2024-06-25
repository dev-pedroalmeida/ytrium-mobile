import { Alert, FlatList, Text, View } from "react-native";
import { useCallback, useState } from "react";
import axios from "axios";
import CourseCardSubbed from "../components/CourseCardSubbed";
import { useFocusEffect } from "@react-navigation/native";

export default function SubscriptionsPage({navigation}) {

  const [coursesList, setCoursesList] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await getSubbedCourses()
    setRefreshing(false)
  }, [])

  const getSubbedCourses = async () => {
    await axios.get("http://192.168.15.4:3000/student/subscriptions", {
      withCredentials: true,
    })
    .then(res => {
      setCoursesList(res.data)
    })
    .catch(err => {
      console.log(err)
      Alert.alert("Erro na conexão")
    })
  }

  useFocusEffect(useCallback(() => {
    getSubbedCourses()
  }, []))

  return (
    <View className="px-4 py-2 mb-12">
      <Text className="text-3xl font-bold mb-4">Suas inscrições</Text>

      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={coursesList}
        renderItem={({item}) => <CourseCardSubbed course={item} navigation={navigation} />}
        keyExtractor={item => item.cur_id}
        ItemSeparatorComponent={() => (
          <View className="h-1"></View>
        )}
      />
    </View>
  );
}
