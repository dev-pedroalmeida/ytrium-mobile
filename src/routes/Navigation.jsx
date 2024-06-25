import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import LandindPage from "../pages/LandingPage";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import CoursePage from "../pages/CoursePage";
import CourseSubscribed from "../pages/CourseSubscribed";
import ModulePage from "../pages/ModulePage";
import ContentPage from "../pages/ContentPage";
import QuizzPage from "../pages/QuizzPage";
import StudentProfile from "../pages/StudentProfile";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import YtriumLogo from "../components/logo/YtriumLogo";
import YtriumText from "../components/logo/YtriumText";
import { View } from "react-native";
import CompletedCourses from "../pages/CompletedCourses";
import StudentBadges from "../pages/StudentBadges";
import CourseContext from "../context/CourseContext";

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const CourseStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgba(254, 243, 199, 0.8)",
  },
};

export default function Navigation() {
  const { isAuth } = useContext(AuthContext);

  return (
    <NavigationContainer theme={myTheme}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <>
            <MainStack.Screen name="landing" component={LandindPage} />
          </>
        ) : (
          <>
            <MainStack.Screen name="auth" component={AuthDrawer} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

function CourseStackNav() {
  const [course, setCourse] = useState({});

  return (
    <CourseContext.Provider value={{ course: course, setCourse: setCourse }}>
      <CourseStack.Navigator
        initialRouteName="subscribed"
        screenOptions={{ headerShown: false }}
      >
        <CourseStack.Screen name="subscribed" component={CourseSubscribed} />
        <CourseStack.Screen name="module" component={ModulePage} />
        <CourseStack.Screen name="content" component={ContentPage} />
        <CourseStack.Screen name="quizz" component={QuizzPage} />
      </CourseStack.Navigator>
    </CourseContext.Provider>
  );
}

function ProfileStackNav() {
  return (
    <ProfileStack.Navigator
      initialRouteName="studentProfile"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="studentProfile" component={StudentProfile} />
      <ProfileStack.Screen
        name="completedCourses"
        component={CompletedCourses}
      />
      <ProfileStack.Screen name="badges" component={StudentBadges} />
    </ProfileStack.Navigator>
  );
}

function AuthDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        header: (hProps) => <Navbar props={hProps} />,
      }}
    >
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="subscriptions" component={SubscriptionsPage} />
      <Drawer.Screen name="course" component={CoursePage} />
      <Drawer.Screen options={{unmountOnBlur: true}} name="courseSubscribed" component={CourseStackNav} />
      <Drawer.Screen name="profile" component={ProfileStackNav} />
    </Drawer.Navigator>
  );
}

function CustomDrawer(props) {
  const activeBg = {
    backgroundColor: "#FFE2C2",
  };

  const activeText = {
    color: "#92400e",
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: "#fffbeb" }} {...props}>
      <View className="flex-row px-4 pt-4 pb-8">
        <YtriumLogo color="#f59e0b" />
        <YtriumText color="#09090b" />
      </View>
      <DrawerItem
        label={"Home"}
        onPress={() => props.navigation.jumpTo("home")}
        style={props.state.index === 0 && activeBg}
        labelStyle={props.state.index === 0 && activeText}
      />
      <DrawerItem
        label={"Inscrições"}
        onPress={() => props.navigation.jumpTo("subscriptions")}
        style={props.state.index === 1 && activeBg}
        labelStyle={props.state.index === 1 && activeText}
      />
    </DrawerContentScrollView>
  );
}
