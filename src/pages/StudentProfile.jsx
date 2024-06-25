import { useCallback, useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../context/AuthContext";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function StudentProfile({navigation}) {
  const { user } = useContext(AuthContext);

  const [xpPerc, setXpPerc] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setXpPerc(((user?.experiencia || 0) / ((user?.nivel || 1) * 4000)) * 100);
    }, [])
  );

  return (
    <View className="px-4 mb-12">
      <View className="items-center">
        <View className="h-20 w-20 bg-amber-500 rounded-full flex items-center justify-center">
          <Octicons name="person" size={54} color={"#fff"} />
        </View>
        <Text className="mt-4 mb-1 text-2xl font-bold">{user?.nome}</Text>
        <Text>{user?.email}</Text>
      </View>
      <View className="my-8 items-center">
        <View className="justify-between items-center flex-row w-72 mb-2">
          <View className="bg-amber-500 p-1 rounded-md w-fit">
            <Text className="font-bold text-amber-50">
              Nível {user?.nivel || 1}
            </Text>
          </View>
          <View>
            <Text className="font-bold">
              {user?.experiencia || 0} / {(user?.nivel || 1) * 4000}
            </Text>
          </View>
        </View>
        <View className="w-72 h6 bg-amber-500/20 rounded-lg overflow-hidden">
          {xpPerc !== null && (
            <View
              className={`bg-amber-500 h-6`}
              style={{ width: `${xpPerc}%` }}
            ></View>
          )}
        </View>
      </View>
      <View className="p-6 rounded-lg">
        <TouchableOpacity className="py-3 px-4 bg-amber-500/30 rounded-lg flex-row items-center justify-between mb-4"
          onPress={() => navigation.navigate('completedCourses')}
        >
          <Text className="font-bold text-zinc-700 text-base">
            Cursos completos
          </Text>
          <Octicons name="arrow-right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="py-3 px-4 bg-amber-500/30 rounded-lg flex-row items-center justify-between"
          onPress={() => navigation.navigate('badges')}
        >
          <Text className="font-bold text-zinc-700 text-base">
            Insígnias
          </Text>
          <Octicons name="arrow-right" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
