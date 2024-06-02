import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function ProfileModal({ isOpen, onClose, navigation }) {
  const { user, _setIsAuth, _setUser } = useContext(AuthContext);

  function handleLogout() {
    axios.get("http://192.168.15.4:3000/logout", {
      withCredentials: true,
    })
    .then(res => {
      onClose()
      _setUser({})
      _setIsAuth(false)
      navigation.navigate("landing")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={isOpen}
    >
      <View className="bg-zinc-950/20 h-full">
        <View className="h-fit mx-5 mt-14 bg-amber-50 rounded-xl p-3 pb-12">
          <TouchableOpacity className="items-end" onPress={onClose}>
            <Ionicons name="close" size={26} />
          </TouchableOpacity>
          <View className="mt-1 p-2 flex-row gap-2 items-center">
            <View className="h-11 w-11 bg-amber-500 rounded-full flex items-center justify-center">
              <Octicons name="person" size={28} color={"#fff"} />
            </View>
            <View>
              <Text className="text-zinc-800 font-bold text-base">
                {user?.nome}
              </Text>
              <Text className="text-zinc-600 font-light">{user?.email}</Text>
            </View>
          </View>
          <View className="rounded-lg bg-amber-100/40 py-2 mt-4">
            <TouchableOpacity 
              onPress={() => {
                onClose()
                navigation.navigate("profile")
              }}
              className="rounded-lg transition p-4 cursor-pointer active:bg-amber-100 flex-row items-center mb-2"
            >
              <MaterialCommunityIcons name="cog-outline" size={22} />
              <Text className="text-zinc-900/70 text-base ml-4">Meu perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleLogout}
              className="rounded-lg transition p-4 pl-5 cursor-pointer active:bg-amber-100 flex-row items-center mb-2"
            >
              <MaterialIcons name="logout" size={22} />
              <Text className="text-zinc-900/70 text-base ml-4">Sair</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
}
