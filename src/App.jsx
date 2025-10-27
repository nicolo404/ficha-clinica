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


const FichaClinica = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    edad: "",
    sexo: "",
    direccion: "",
    telefono: "",
    antecedentes: "",
    alergias: "",
    motivoConsulta: "",
    presion: "",
    temperatura: "",
    frecuenciaCardiaca: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Ficha guardada",
      description: "Los datos se han registrado correctamente.",
      
      duration: 3000,
      isClosable: true,
      colorScheme: "pink",
    });
    console.log(formData);
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
              <Select name="sexo" value={formData.sexo} onChange={handleChange} borderColor={"violet"}>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no_binario">No binario</option>
                <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
                <option value="otro">Travesaño</option>
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
            <Textarea name="motivoConsulta" value={formData.motivoConsulta} onChange={handleChange} borderColor={"violet"} />
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
              <Input name="presion" value={formData.presion} onChange={handleChange} borderColor={"violet"} />
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

export default FichaClinica;
