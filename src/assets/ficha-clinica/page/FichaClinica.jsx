import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Divider,
  useToast,
  Select,

} from "@chakra-ui/react";

import  {FichaClinica}  from "../api/fichaClinicaModel";
import { guardarFichaClinica } from "../api/servicios";

const FichaClinicaPage = () => {
  const [formData, setFormData] = useState(FichaClinica.default());

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("cambio: ",formData);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(formData);
    await guardarFichaClinica(formData)
      .then((data) => {
        console.log("Ficha guardada con éxito:", data);
        toast({
            title: "Ficha guardada",
            description: "Los datos se han registrado correctamente.",
            duration: 2000,
            isClosable: true,
            colorScheme: "pink",
          });
    })
      .catch((error) => {
        console.error("Error al guardar la ficha:", error);
        toast({
            title: "Error",
            description: "Hubo un problema al guardar la ficha clínica.",
            duration: 2000,
            isClosable: true,
            colorScheme: "red",
          });
      });
    
};

  return (
    <Box maxW="800px" mx="auto" p={6} bg="pink.100" borderRadius="2xl" boxShadow="md">
      <Heading size="lg" mb={4} textAlign="center" color="pink.500">
        Ficha Clínica Matrona
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading size="md">Datos del Paciente</Heading>
          <Divider />

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input name="nombre" value={formData.nombre} onChange={handleChange} borderColor={"violet"} />
            </FormControl>

            <FormControl>
              <FormLabel>RUT / DNI</FormLabel>
              <Input name="rut" value={formData.rut} onChange={handleChange} borderColor={"violet"} />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Edad</FormLabel>
              <Input type="number" name="edad" value={formData.edad} onChange={handleChange} borderColor={"violet"} />
            </FormControl>

            <FormControl>
              <FormLabel>Sexo</FormLabel>
              <Select name="sexo" donChange={handleChange} placeholder="Seleccione" borderColor={"violet"}>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no binario">No binario</option>
                <option value="prefiero no decirlo">Prefiero no decirlo</option>
                <option value="travesaño">Travesaño</option>
                <option value="otro">Otro</option>
              </Select>
            </FormControl>
          </HStack> 

          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input name="direccion" value={formData.direccion} onChange={handleChange} borderColor={"violet"} />
          </FormControl>

          <FormControl>
            <FormLabel>Teléfono</FormLabel>
            <Input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} borderColor={"violet"} />
          </FormControl>

          <Heading size="md" mt={6}>Antecedentes Médicos</Heading>
          <Divider />

          <FormControl>
            <FormLabel>Motivo de consulta</FormLabel>
            <Textarea name="motivo" value={formData.motivo} onChange={handleChange} borderColor={"violet"} />
          </FormControl>
          
          <FormControl>
            <FormLabel>Antecedentes</FormLabel>
            <Textarea name="antecedentes" value={formData.antecedentes} onChange={handleChange} borderColor={"violet"} />
          </FormControl>

          <FormControl>
            <FormLabel>Alergias</FormLabel>
            <Textarea name="alergias" value={formData.alergias} onChange={handleChange} borderColor={"violet"} />
          </FormControl>


          <Heading size="md" mt={6}>Signos Vitales</Heading>
          <Divider />

          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Presión arterial</FormLabel>
              <Input name="presionArterial" value={formData.presionArterial} onChange={handleChange} borderColor={"violet"} />
            </FormControl>

            <FormControl>
              <FormLabel>Temperatura (°C)</FormLabel>
              <Input name="temperatura" value={formData.temperatura} onChange={handleChange} borderColor={"violet"} />
            </FormControl>

            <FormControl>
              <FormLabel>Frecuencia cardíaca (bpm)</FormLabel>
              <Input name="frecuenciaCardiaca" value={formData.frecuenciaCardiaca} onChange={handleChange} borderColor={"violet"} />
            </FormControl>
          </HStack>

          <Button type="submit" colorScheme="pink" size="lg" mt={6}>
            Guardar Ficha
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FichaClinicaPage;
