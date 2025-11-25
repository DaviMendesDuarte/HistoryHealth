import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "./src/contexts/ThemeContext";
import { UserProvider } from "./src/contexts/UserContext";

import LoginRegisterScreen from "./src/screens/LoginRegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {/* Tela inicial */}
            <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />

            {/* Tela que contém sidebar + tudo em uma só */}
            <Stack.Screen name="Home" component={HomeScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
