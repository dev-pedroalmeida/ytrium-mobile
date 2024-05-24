import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Navigation from "./src/routes/Navigation";
import AuthContext from "./src/context/AuthContext";
import { useState } from "react";

export default function App() {

  const [user, _setUser] = useState({})
  const [isAuth, _setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={{
      user: user, 
      setUser: _setUser, 
      isAuth: isAuth, 
      setIsAuth: _setIsAuth
    }}>
      <View className="flex-1">
        <StatusBar style="auto" />
        <Navigation />
      </View>
    </AuthContext.Provider>
  );
}
