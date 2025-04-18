import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { categorias } from "../data/eventosData";
import { eventosData as eventosDataDefault } from "../data/eventosData"; // Importamos los datos predeterminados

const HomeScreen = ({ navigation, eventos = eventosDataDefault }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  // Filtrar eventos por categoría
  const eventosFiltrados =
    categoriaSeleccionada === "Todos"
      ? eventos
      : eventos.filter(
          (evento) => evento.categoria === categoriaSeleccionada
        );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Eventos Culturales</Text>

      {/* Filtro de categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasContainer}
        contentContainerStyle={{ alignItems: "center", height: 40 }} // Añade esta línea
      >
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            style={[
              styles.categoriaBoton,
              categoriaSeleccionada === categoria &&
                styles.categoriaSeleccionada,
            ]}
            onPress={() => setCategoriaSeleccionada(categoria)}
          >
            <Text
              style={[
                styles.categoriaTexto,
                categoriaSeleccionada === categoria &&
                  styles.categoriaTextoSeleccionado,
              ]}
            >
              {categoria}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de eventos */}
      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        style={styles.lista} // // Asegura que no haya padding superior
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tarjetaEvento}
            onPress={() =>
              navigation.navigate("DetalleEvento", { evento: item })
            }
          >
            <Image source={{ uri: item.imagen }} style={styles.imagenEvento} />
            <View style={styles.infoEvento}>
              <Text style={styles.tituloEvento}>{item.titulo}</Text>
              <Text style={styles.fechaEvento}>
                {item.fecha} - {item.hora}
              </Text>
              <Text style={styles.lugarEvento}>{item.lugar}</Text>
              <View style={styles.categoriaTag}>
                <Text style={styles.categoriaTagTexto}>{item.categoria}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Botón para añadir nuevo evento */}
      <TouchableOpacity
        style={styles.botonAnadir}
        onPress={() => navigation.navigate("FormularioEvento")}
      >
        <Text style={styles.textoBotonAnadir}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f8f9fa",
    backgroundColor: "#e056fd", //fuccia
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
    color: "#212529",
  },
  categoriasContainer: {
    backgroundColor: "#f9ca24", // amarillo
    paddingHorizontal: 16,
    //marginBottom: 16,
    height: 130,
  },
  categoriaBoton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12, // Aumentamos el margen entre botones
    borderRadius: 20,
    backgroundColor: "#e9ecef",
   // height: 36, // Altura fija para todos los botones
  },
  categoriaSeleccionada: {
    backgroundColor: "#4263eb",
  },
  categoriaTexto: {
    color: "#495057",
  },
  categoriaTextoSeleccionado: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  lista: {
    paddingHorizontal: 16,
    marginTop: 10, // Añadimos un pequeño margen superior a la lista
    backgroundColor: "#6ab04c", // verde
  },
  tarjetaEvento: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 10,
    //backgroundColor: "#ffffff",
    backgroundColor: "#eb4d4b", //rojo
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  imagenEvento: {
    width: 100,
    height: 100,
  },
  infoEvento: {
    flex: 1,
    padding: 12,
  },
  tituloEvento: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#212529",
  },
  fechaEvento: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 2,
  },
  lugarEvento: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 8,
  },
  categoriaTag: {
    alignSelf: "flex-start",
    backgroundColor: "#e9ecef",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoriaTagTexto: {
    fontSize: 12,
    color: "#495057",
  },
  botonAnadir: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4263eb",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  textoBotonAnadir: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
