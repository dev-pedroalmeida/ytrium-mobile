import { TouchableOpacity, View } from "react-native";
import YtriumLogo from "./logo/YtriumLogo";
import YtriumText from "./logo/YtriumText";
import Button from "./Button";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import Login from "./Login";
import ProfileModal from "./ProfileModal";

export default function Navbar({ props }) {
  const route = props.route;
  const navigation = props.navigation;

  // console.log(route)

  const [isLogin, setIsLogin] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

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
        <>
          <TouchableOpacity onPress={() => setIsProfile(true)} className="h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center">
            <Octicons name="person" size={28} color={"#fff"} />
          </TouchableOpacity>
          <ProfileModal 
            navigation={navigation}
            isOpen={isProfile}
            onClose={() => setIsProfile(false)}
          />
        </>
      )}
    </View>
  );
}
