import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

/** Mapea estado a esquema de color Chakra */
const estadoColor = (estado) =>
  estado === "Abierta" ? "green" :
  estado === "En revisión" ? "yellow" :
  estado === "Cerrada" ? "gray" : "gray";

export default function FichaDetailModal({ isOpen, onClose, ficha, onEdit }) {
  const cardBg        = useColorModeValue("white", "gray.800");
  const subText       = useColorModeValue("gray.600", "gray.300");
  const sectionBorder = useColorModeValue("gray.100", "whiteAlpha.200");

  if (!ficha) return null;

  const fichaId = ficha._id ?? ficha.id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent
        bg={cardBg}
        borderRadius={{ base: 0, md: "2xl" }}
        h={{ base: "100dvh", md: "auto" }}
      >
        <ModalHeader
          py={{ base: 4, md: 6 }}
          fontSize={{ base: "lg", md: "xl" }}
          boxShadow={{ base: "sm", md: "none" }}
          position="sticky"
          top="0"
          zIndex="1"
          bg={cardBg}
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{ficha.paciente}</Text>
              <Text fontSize="xs" color={subText}>
                {ficha.rut} · {fichaId}
              </Text>
            </VStack>
            {ficha.estado && (
              <Badge colorScheme={estadoColor(ficha.estado)}>{ficha.estado}</Badge>
            )}
          </HStack>
        </ModalHeader>

        <ModalCloseButton top={{ base: 3, md: 4 }} />

        <ModalBody p={{ base: 4, md: 6 }}>
          <Stack spacing={{ base: 5, md: 6 }}>
            {/* Datos del paciente */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Datos del paciente
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                <Item label="Nombre" value={ficha.nombre} />
                <Item label="RUT / DNI" value={ficha.rut} />
                <Item label="Edad" value={ficha.edad} />
                <Item label="Sexo" value={ficha.sexo} />
                <Item label="Teléfono" value={ficha.telefono} />
                <Item label="Dirección" value={ficha.direccion} />
              </SimpleGrid>
            </Box>

            <Divider borderColor={sectionBorder} />

            {/* Antecedentes */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Antecedentes
              </Text>
              <Stack spacing={3}>
                <Item label="Motivo de consulta" value={ficha.motivo ?? ficha.motivoConsulta} multiline />
                <Item label="Antecedentes" value={ficha.antecedentes} multiline />
                <Item label="Alergias" value={ficha.alergias} multiline />
              </Stack>
            </Box>

            <Divider borderColor={sectionBorder} />

            {/* Signos vitales */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Signos vitales
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                <Item label="Presión arterial" value={ficha.presionArterial ?? ficha.presion} />
                <Item label="Temperatura (°C)" value={ficha.temperatura} />
                <Item label="Frecuencia cardíaca (bpm)" value={ficha.frecuenciaCardiaca} />
              </SimpleGrid>
              {(ficha.fechaActualizacion || ficha.updatedAt) && (
                <Text mt={3} fontSize="sm" color={subText}>
                  Última actualización: {ficha.fechaActualizacion ?? ficha.updatedAt}
                </Text>
              )}
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={sectionBorder} py={{ base: 3, md: 4 }}>
          <HStack w="full" spacing={3}>
            <Button variant="ghost" onClick={onClose} w={{ base: "full", md: "auto" }}>
              Cerrar
            </Button>
            <Button colorScheme="teal" onClick={() => onEdit?.(ficha)} w={{ base: "full", md: "auto" }}>
              Editar ficha
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Item({ label, value, multiline }) {
  const subText = useColorModeValue("gray.600", "gray.300");
  if (value === undefined || value === null || value === "") return <Box />; // mantiene la grilla

  return (
    <VStack align="start" spacing={0}>
      <Text fontSize="xs" color={subText}>
        {label}
      </Text>
      <Text
        whiteSpace={multiline ? "pre-wrap" : "nowrap"}
        textOverflow={multiline ? "clip" : "ellipsis"}
        overflow="hidden"
      >
        {value}
      </Text>
    </VStack>
  );
}
