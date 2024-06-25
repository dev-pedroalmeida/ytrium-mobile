import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function StudentBadges() {
  const [badges, setBadges] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get("http://192.168.15.4:3000/student/myBadges", {
          withCredentials: true,
        })
        .then((res) => {
          setBadges(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  return (
    <View className="px-4 mb-12">
      <Text className="font-bold text-center text-2xl mb-8">Insígnias</Text>
      <View>
        {badges?.length > 0 ? (
          <FlatList
            data={badges}
            renderItem={({ item }) => (
              <View className="bg-white items-center p-4 shadow rounded-lg">
                <Image 
                  source={{uri: `http://192.168.15.4:3000/badges/${item?.ins_icone}`}}
                  className="w-28 h-28 mb-2"
                />
                <View className="w-full h-0.5 bg-amber-500"></View>
                <Text className="font-bold text-lg my-1">{item?.ins_titulo}</Text>
                <Text>Por completar {item?.ins_qtdCursos} cursos!</Text>
              </View>
            )}
            keyExtractor={(item) => item.ins_id}
            ItemSeparatorComponent={() => <View className="h-1"></View>}
          />
        ) : (
          <Text className="text-center">
            Você ainda não possui nenhuma insígnia, complete cursos para
            conseguí-las!
          </Text>
        )}
      </View>
    </View>
  );
}
