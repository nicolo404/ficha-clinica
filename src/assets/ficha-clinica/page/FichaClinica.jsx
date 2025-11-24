import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Divider,
  useToast,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";

import { FichaClinica } from "../api/fichaClinicaModel";
import { guardarFichaClinica } from "../api/servicios";
import { useNavigate } from "react-router-dom";

const FichaClinicaPage = () => {
  const [formData, setFormData] = useState(FichaClinica.default());
  const toast = useToast();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await guardarFichaClinica(formData);
      console.log("Ficha guardada con éxito:", data);
      toast({
        title: "Ficha guardada",
        description: "Los datos se han registrado correctamente.",
        duration: 2000,
        isClosable: true,
        colorScheme: "pink",
      });
      setFormData(FichaClinica.default());
      // Redirigir a la lista de fichas
      navigate("/fichas");

    } catch (error) {
      console.error("Error al guardar la ficha:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la ficha clínica.",
        duration: 2000,
        isClosable: true,
        colorScheme: "red",
      });
    }
  };

  return (
    <Box
      maxW={{ base: "100%", md: "900px" }}
      mx="auto"
      px={{ base: 4, sm: 6, md: 8 }}
      py={{ base: 5, md: 8 }}
      bg="pink.50"
      borderRadius={{ base: "xl", md: "2xl" }}
      boxShadow={{ base: "sm", md: "md" }}
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        mb={{ base: 3, md: 4 }}
        textAlign="center"
        color="pink.500"
      >
        Ficha Clínica Matrona
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <Heading size={{ base: "sm", md: "md" }}>Datos del Paciente</Heading>
          <Divider />

          {/* Nombre / RUT: 1 col en móvil, 2 en md+ */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
            <FormControl isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                borderColor="violet"
              />
            </FormControl>

            <FormControl>
              <FormLabel>RUT / DNI</FormLabel>
              <Input
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                borderColor="violet"
              />
            </FormControl>
          </SimpleGrid>

          {/* Edad / Sexo */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
            <FormControl>
              <FormLabel>Edad</FormLabel>
              <Input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                borderColor="violet"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sexo</FormLabel>
              <Select
                name="sexo"
                onChange={handleChange}
                placeholder="Seleccione"
                borderColor="violet"
                value={formData.sexo}
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no binario">No binario</option>
                <option value="prefiero no decirlo">Prefiero no decirlo</option>
                <option value="travesaño">Travesaño</option>
                <option value="otro">Otro</option>
              </Select>
            </FormControl>
          </SimpleGrid>

          {/* Dirección / Teléfono */}
          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              borderColor="violet"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              borderColor="violet"
            />
          </FormControl>

          <Heading size={{ base: "sm", md: "md" }} mt={{ base: 2, md: 6 }}>
            Antecedentes Médicos
          </Heading>
          <Divider />

          {/* Motivo / Antecedentes / Alergias: apilados en móvil */}
          <FormControl>
            <FormLabel>Motivo de consulta</FormLabel>
            <Textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              borderColor="violet"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Antecedentes</FormLabel>
            <Textarea
              name="antecedentes"
              value={formData.antecedentes}
              onChange={handleChange}
              borderColor="violet"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Alergias</FormLabel>
            <Textarea
              name="alergias"
              value={formData.alergias}
              onChange={handleChange}
              borderColor="violet"
              rows={3}
            />
          </FormControl>

          <Heading size={{ base: "sm", md: "md" }} mt={{ base: 2, md: 6 }}>
            Signos Vitales
          </Heading>
          <Divider />

          {/* Presión / Temperatura / Frecuencia: 1 col en móvil, 3 en md+ */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 4 }}>
            <FormControl>
              <FormLabel>Presión arterial</FormLabel>
              <Input
                name="presionArterial"
                value={formData.presionArterial}
                onChange={handleChange}
                borderColor="violet"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Temperatura (°C)</FormLabel>
              <Input
                name="temperatura"
                value={formData.temperatura}
                onChange={handleChange}
                borderColor="violet"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Frecuencia cardíaca (bpm)</FormLabel>
              <Input
                name="frecuenciaCardiaca"
                value={formData.frecuenciaCardiaca}
                onChange={handleChange}
                borderColor="violet"
              />
            </FormControl>
          </SimpleGrid>

          <Button
            type="submit"
            colorScheme="pink"
            size="lg"
            mt={{ base: 4, md: 6 }}
            w={{ base: "full", md: "auto" }}   // full en móvil
          >
            Guardar Ficha
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FichaClinicaPage;
