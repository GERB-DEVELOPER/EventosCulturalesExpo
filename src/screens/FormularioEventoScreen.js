import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { categorias } from "../data/eventosData";

const FormularioEventoScreen = ({ navigation, addEvento }) => {
  // Estado para los campos del formulario
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen] = useState("https://picsum.photos/id/100/300/200");

  // Estado para errores de validación
  const [errores, setErrores] = useState({});

  // Función para validar el formulario
  const validarFormulario = () => {
    let erroresTemp = {};

    if (!titulo) erroresTemp.titulo = "El título es obligatorio";
    if (!fecha) erroresTemp.fecha = "La fecha es obligatoria";
    if (!hora) erroresTemp.hora = "La hora es obligatoria";
    if (!lugar) erroresTemp.lugar = "El lugar es obligatorio";
    if (!direccion) erroresTemp.direccion = "La dirección es obligatoria";
    if (!descripcion) erroresTemp.descripcion = "La descripción es obligatoria";
    if (!categoria) erroresTemp.categoria = "La categoría es obligatoria";

    setErrores(erroresTemp);

    // Si no hay errores, retorna true
    return Object.keys(erroresTemp).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (validarFormulario()) {
      // Crear el nuevo evento
      const nuevoEvento = {
        id: Date.now().toString(), // Generamos un ID único basado en timestamp
        titulo,
        fecha,
        hora,
        lugar,
        direccion,
        descripcion,
        categoria,
        imagen,
        favorito: false,
      };
      // Añadir el nuevo evento
      addEvento(nuevoEvento);

      // Para este ejemplo, mostramos un mensaje y navegamos a la pantalla anterior
      Alert.alert("Evento creado", "El evento ha sido creado exitosamente", [
        {
          text: "OK",
          onPress: () => {
            // Aquí podríamos pasar el nuevo evento a la pantalla anterior
            navigation.navigate("Home");
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Crear Nuevo Evento</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={[styles.input, errores.titulo && styles.inputError]}
            placeholder="Título del evento"
            value={titulo}
            onChangeText={setTitulo}
          />
          {errores.titulo && (
            <Text style={styles.errorText}>{errores.titulo}</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={[styles.input, errores.fecha && styles.inputError]}
              placeholder="DD/MM/AAAA"
              value={fecha}
              onChangeText={setFecha}
            />
            {errores.fecha && (
              <Text style={styles.errorText}>{errores.fecha}</Text>
            )}
          </View>

          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={[styles.input, errores.hora && styles.inputError]}
              placeholder="HH:MM"
              value={hora}
              onChangeText={setHora}
            />
            {errores.hora && (
              <Text style={styles.errorText}>{errores.hora}</Text>
            )}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Lugar</Text>
          <TextInput
            style={[styles.input, errores.lugar && styles.inputError]}
            placeholder="Nombre del lugar"
            value={lugar}
            onChangeText={setLugar}
          />
          {errores.lugar && (
            <Text style={styles.errorText}>{errores.lugar}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={[styles.input, errores.direccion && styles.inputError]}
            placeholder="Dirección completa"
            value={direccion}
            onChangeText={setDireccion}
          />
          {errores.direccion && (
            <Text style={styles.errorText}>{errores.direccion}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoría</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriasContainer}
          >
            {categorias
              .filter((cat) => cat !== "Todos")
              .map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoriaBoton,
                    categoria === cat && styles.categoriaSeleccionada,
                  ]}
                  onPress={() => setCategoria(cat)}
                >
                  <Text
                    style={[
                      styles.categoriaTexto,
                      categoria === cat && styles.categoriaTextoSeleccionado,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
          {errores.categoria && (
            <Text style={styles.errorText}>{errores.categoria}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.textArea, errores.descripcion && styles.inputError]}
            placeholder="Descripción del evento"
            multiline
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
          />
          {errores.descripcion && (
            <Text style={styles.errorText}>{errores.descripcion}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.botonGuardar} onPress={handleSubmit}>
          <Text style={styles.botonTexto}>Guardar Evento</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#212529",
  },
  formGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#343a40",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#fa5252",
  },
  errorText: {
    color: "#fa5252",
    marginTop: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 100,
  },
  botonGuardar: {
    backgroundColor: "#4263eb",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  botonTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  categoriasContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  categoriaBoton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#e9ecef",
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
});

export default FormularioEventoScreen;
