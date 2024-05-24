import { ImageBackground, Text, View } from "react-native";

import gradient from "../../assets/image3.png";
import Button from "../components/Button";
import { useState } from "react";
import SignUp from "../components/SignUp"

export default function LandindPage({navigation, route}) {

  const [isSign, setIsSign] = useState(false)

  return (
    <>
      <ImageBackground
        source={gradient}
        className="h-screen w-screen absolute -top-28 "
      ></ImageBackground>
      <View className="mt-24 px-4">
        <Text className="text-4xl text-center font-black mb-6">
          Aprenda no Seu Ritmo, Conquiste o Futuro
        </Text>
        <Text className="text-lg font-bold text-center mb-4 text-zinc-700">
          Explore cursos de tecnologia, suba de nível e alcance seus objetivos.
        </Text>
        <View className="mt-20 px-4">
          <Button onPress={() => setIsSign(true)} text="Cadastre-se" variant="large" />
        </View>
      </View>

      {isSign && <SignUp 
        navigation={navigation}
        isOpen={isSign}
        onClose={() => setIsSign(false)}
      />}
    </>
  );
}
