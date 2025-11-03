import axios from "axios";

const url_api = "http://localhost:3000/api/";

export const guardarFichaClinica = async (fichaData) => {
  try {
    console.log("Enviando datos de la ficha clínica:", fichaData);
    const response = await axios.post(
      url_api + "create-fichas-clinica",
      fichaData
    );
    console.log("Respuesta del servidor:", response);
    return response.data;
  } catch (error) {
    console.error("Error al guardar la ficha clínica:", error);
    throw error;
  }
};
