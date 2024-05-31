import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandindPage from "../pages/LandingPage";
import Navbar from "../components/Navbar";
import { View } from "react-native";
import Home from "../pages/Home";
import CoursePage from "../pages/CoursePage";
import CourseSubscribed from "../pages/CourseSubscribed";
import ModulePage from "../pages/ModulePage";
import ContentPage from "../pages/ContentPage";
import QuizzPage from "../pages/QuizzPage";
import StudentProfile from "../pages/StudentProfile";

const Stack = createStackNavigator();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgba(254, 243, 199, 0.8)",
  }
}

export default function Navigation() {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator screenOptions={{ 
        header: (hProps) => <Navbar props={hProps} />,
      }}>
        <Stack.Screen name="landing" component={LandindPage} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="course" component={CoursePage} />
        <Stack.Screen name="subscribed" component={CourseSubscribed} /> 
        <Stack.Screen name="module" component={ModulePage} /> 
        <Stack.Screen name="content" component={ContentPage} /> 
        <Stack.Screen name="quizz" component={QuizzPage} /> 
        <Stack.Screen name="profile" component={StudentProfile} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
