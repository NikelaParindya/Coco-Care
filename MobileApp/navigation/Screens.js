import { Animated, Dimensions, Easing } from "react-native";
// header for screens
import { Header, Icon } from "../components";
// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TravelForm from "../screens/TravelForm";
import Register from "../screens/Register";
import Optimality from "../screens/Optimality";
import Registetwo from "../screens/Registertwo";

const Stack = createStackNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="GrowthPrediction"
        component={TravelForm}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Growth Prediction"
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
      {/* <Stack.Screen
        name="OptimalityChecking"
        component={Optimality}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Optimality Checking"
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: "#FFFFFF",
        }}
      /> */}
      <Stack.Screen
        name="Login"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Predictor" navigation={navigation} scene={scene} />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation }) => (
            <Header title="SLTB" navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Stack.Navigator style={{ flex: 1 }}>
      <Stack.Screen
        name="Time Table"
        component={ComponentsStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scan QR"
        component={ComponentsStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Optimality" component={Optimality} />
      <Stack.Screen name="Registertwo" component={Registetwo} />
    </Stack.Navigator>
  );
}
