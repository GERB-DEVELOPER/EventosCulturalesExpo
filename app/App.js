import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../src/screens/HomeScreen";
import DetalleEventoScreen from "../src/screens/DetalleEventoScreen";
import FormularioEventoScreen from "../src/screens/FormularioEventoScreen";
import { eventosData as eventosIniciales } from "../src/data/eventosData";

const Stack = createStackNavigator();

export default function App() {
  // Usamos los datos iniciales como estado inicial
  const [eventos, setEventos] = useState(eventosIniciales);

  // Función para añadir un nuevo evento
  const addEvento = (nuevoEvento) => {
    setEventos([...eventos, nuevoEvento]);
  };

  return (
    <SafeAreaProvider>
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
        <Stack.Screen name="Home" options={{ title: "Eventos Culturales" }}>
          {(props) => <HomeScreen {...props} eventos={eventos} />}
        </Stack.Screen>
        <Stack.Screen
          name="DetalleEvento"
          component={DetalleEventoScreen}
          options={{ title: "Detalle del Evento" }}
        />
        <Stack.Screen
          name="FormularioEvento"
          options={{ title: "Crear Evento" }}
        >
          {(props) => (
            <FormularioEventoScreen {...props} addEvento={addEvento} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
