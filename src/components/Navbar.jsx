import { View } from "react-native";
import YtriumLogo from "./logo/YtriumLogo";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";

export default function Navbar() {
  return (
    <View className="p-4 items-center justify-between flex-row">
      <View className="items-center flex-row">
        <Button variant="action" classes="px-1 py-1 mr-3">
          <Ionicons name="menu" size={28} />
        </Button>
        <YtriumLogo />
      </View>
      <Button text="Login" variant="secondary" />
    </View>
  );
}
