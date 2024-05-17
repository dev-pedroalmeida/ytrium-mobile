import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Navbar from "./src/components/Navbar"

export default function App() {
  return (
    <View className="h-screen bg-amber-100/80 z-10">
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor="rgba(254, 243, 199, 0.8)"
      />
      <Navbar />
    </View>
  );
}
