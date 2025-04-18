import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const DetalleEventoScreen = ({ route, navigation }) => {
  // Obtener el evento de los parámetros de navegación
  const { evento } = route.params;

  // Estado para marcar como favorito (en una app real, esto se guardaría en un estado global o base de datos)
  const [favorito, setFavorito] = useState(evento.favorito);

  // Función para cambiar el estado de favorito
  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Imagen del evento */}
        <Image source={{ uri: evento.imagen }} style={styles.imagen} />

        {/* Contenido del evento */}
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{evento.titulo}</Text>

          <View style={styles.categoriaContainer}>
            <Text style={styles.categoriaTexto}>{evento.categoria}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Fecha y Hora</Text>
            <Text style={styles.texto}>
              {evento.fecha} a las {evento.hora}
            </Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Ubicación</Text>
            <Text style={styles.texto}>{evento.lugar}</Text>
            <Text style={styles.texto}>{evento.direccion}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Descripción</Text>
            <Text style={styles.texto}>{evento.descripcion}</Text>
          </View>

          {/* Botones de acción */}
          <View style={styles.botonesContainer}>
            <TouchableOpacity
              style={[styles.boton, styles.botonFavorito]}
              onPress={toggleFavorito}
            >
              <Text style={styles.botonTexto}>
                {favorito ? "❤️ Favorito" : "🤍 Añadir a favoritos"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.boton, styles.botonCompartir]}
              onPress={() => {
                // Aquí iría la lógica para compartir (en una app real)
                alert("Compartiendo evento: " + evento.titulo);
              }}
            >
              <Text style={styles.botonTexto}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: "#ffffff",

  },
  imagen: {
    width: "100%",
    height: 200,
  },
  contenido: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  categoriaContainer: {
    backgroundColor: "#e9ecef",

    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  categoriaTexto: {
    color: "#495057",
    fontWeight: "bold",
  },
  seccion: {
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 4,
  },
  texto: {
    fontSize: 16,
    color: "#495057",
    lineHeight: 24,
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  botonFavorito: {
    backgroundColor: "#fa5252",
  },
  botonCompartir: {
    backgroundColor: "#4263eb",
  },
  botonTexto: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetalleEventoScreen;
