import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

// Importar pantallas
import HomeScreen from "../screens/HomeScreen";
import DetalleEventoScreen from "../screens/DetalleEventoScreen";
import FormularioEventoScreen from "../screens/FormularioEventoScreen";

// Crear navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de stack para las pantallas principales
const EventosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4263eb",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Eventos Culturales" }}
      />
      <Stack.Screen
        name="DetalleEvento"
        component={DetalleEventoScreen}
        options={{ title: "Detalle del Evento" }}
      />
      <Stack.Screen
        name="FormularioEvento"
        component={FormularioEventoScreen}
        options={{ title: "Crear Evento" }}
      />
    </Stack.Navigator>
  );
};

// Navegador de tabs para la aplicación
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "EventosTab") {
              iconName = "🎭"; // Emoji como icono para eventos
            } else if (route.name === "FormularioTab") {
              iconName = "➕"; // Emoji como icono para crear evento
            }
            return <Text style={{ fontSize: size }}>{iconName}</Text>;
          },
          tabBarActiveTintColor: "#4263eb",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="EventosTab"
          component={EventosStack}
          options={{
            headerShown: false,
            title: "Eventos",
          }}
        />
        <Tab.Screen
          name="FormularioTab"
          component={FormularioEventoScreen}
          options={{
            title: "Crear Evento",
            headerStyle: {
              backgroundColor: "#4263eb",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

