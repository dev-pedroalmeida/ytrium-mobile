import { Text, View } from "react-native";
import AlternativeRadio from "./AlternativeRadio";
import { useState } from "react";

export default function Question({que, queIndex, handleSelectAnswer}) {

  const [selected, setSelected] = useState()

  return (
    <View className="mb-4 px-1">
      <Text className="font-bold text-lg mb-1">
        {(queIndex + 1) + " - " + que.pergunta}
      </Text>
      {que.alternativas.map((alt) => (
        <AlternativeRadio
          key={alt.id}
          alt={alt}
          selected={selected === alt.id}
          onSelect={() => {
            setSelected(alt.id)
            handleSelectAnswer(alt.id)
          }}
        />
      ))}
    </View>
  );
}
