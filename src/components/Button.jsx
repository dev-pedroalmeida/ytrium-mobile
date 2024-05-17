import { Text, TouchableOpacity, View } from "react-native";

export default function Button({ text = "", variant = "default", children, onPress, disabled=false, classes="" }) {
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        className={`justify-center flex-row items-center py-2 px-2 rounded-md shadow bg-amber-500
                    ${variant === "large" && "bg-amber-500"}
                    ${variant === "secondary" && "bg-amber-400"}
                    ${variant === "text" && "bg-transparent shadow-none"}
                    ${variant === "action" && "bg-transparent shadow-none p-1"}
                    ${classes}`}
      >
        <Text
          className={`font-bold text-white
            ${variant === "large" && "text-lg"}
            ${variant === "secondary" && "text-zinc-900/90"}
            ${variant === "text" && "text-zinc-800 underline"}
            ${variant === "action" && "text-zinc-800"}
            ${disabled === true && "text-neutral-600/70"}
          `}
        >
          {text}
        </Text>
        {children}
      </TouchableOpacity>
    </View>
  );
}
