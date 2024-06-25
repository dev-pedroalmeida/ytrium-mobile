import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AlternativeRadio({ alt, selected, onSelect }) {
  return (
    <TouchableOpacity
      key={alt.id}
      className={`p-1 mb-2 rounded-md flex-row items-center`}
      onPress={onSelect}
    >
      <View>
        <Ionicons
          name="checkmark-circle"
          color={selected ? "rgb(245 158 11)" : "#fde68a"}
          size={28}
        />
      </View>

      <Text className="px-1">{alt.alternativa}</Text>
    </TouchableOpacity>
  );
}
