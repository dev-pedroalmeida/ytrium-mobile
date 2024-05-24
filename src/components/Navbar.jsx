import { View } from "react-native";
import YtriumLogo from "./logo/YtriumLogo";
import YtriumText from "./logo/YtriumText";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Login from "./Login";

export default function Navbar({ props }) {
  const route = props.route;
  const navigation = props.navigation;

  // console.log(route)

  const [isLogin, setIsLogin] = useState(false);

  return (
    <View className="p-4 items-center justify-between flex-row h-fit mt-4">
      <View className="items-center flex-row">
        {route.name !== "landing" && (
          <Button variant="action" classes="px-0 py-1 mr-3">
            <Ionicons name="menu" size={28} />
          </Button>
        )}
        {route.name === "landing" && (
          <>
            <YtriumLogo color="#fff" />
            <YtriumText color="#fff" />
          </>
        )}
      </View>

      {route.name === "landing" ? (
        <>
          <Button
            text="Login"
            variant="secondary"
            onPress={() => setIsLogin(true)}
          />
          <Login
            navigation={navigation}
            isOpen={isLogin}
            onClose={() => setIsLogin(false)}
          />
        </>
      ) : (
        <View className="h-10 w-10 bg-amber-500 rounded-full"></View>
      )}
    </View>
  );
}
