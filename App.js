import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Navigation from "./src/routes/Navigation";

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Navigation />
    </View>
  );
}
