import axios from "axios";
import { FichaClinica } from "./fichaClinicaModel";

const url_api = "https://ficha-clinica-back.vercel.app/api/";

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

export const getFichasClinicas = async () => {
  try {
    const response = await axios.get(url_api + "fichas-clinica");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las fichas clínicas:", error);
    throw error;
  }
};
