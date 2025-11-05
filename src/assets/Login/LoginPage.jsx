import { Box, Flex, Heading, Text, Image, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import LoginForm from "../Login/Components/FormLogin.jsx";

export default function LoginPage() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const logoSize = useBreakpointValue({ base: "48px", md: "64px" });

  return (
    <Flex minH="100dvh" bg={bg}>
      {/* Panel ilustrado: solo en md+ */}
      <Box
        flex={{ base: "0", md: "1" }}
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-b, teal.600, teal.700)"
        color="white"
        p={{ base: 6, md: 10 }}
      >
        <Box maxW="lg">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Logo Salud"
            boxSize={logoSize}
            mb={{ base: 4, md: 6 }}
            opacity={0.9}
          />
          <Heading size={useBreakpointValue({ base: "md", md: "lg" })} lineHeight="short">
            Portal Clínico
          </Heading>
          <Text mt={3} opacity={0.95}>
            Accede de forma segura a tus herramientas clínicas y registros electrónicos.
          </Text>
          <Text mt={8} fontSize="sm" opacity={0.8}>
            Usa credenciales personales y 2FA cuando esté disponible.
          </Text>
        </Box>
      </Box>

      {/* Panel formulario: ocupa todo en móvil */}
      <Flex flex="1" align="center" justify="center" p={{ base: 4, sm: 6, md: 10 }}>
        <Box
          w="full"
          maxW={{ base: "xs", sm: "sm" }}
          bg={cardBg}
          borderRadius={{ base: "xl", md: "2xl" }}
          boxShadow={{ base: "md", md: "lg" }}
          p={{ base: 5, md: 8 }}
        >
          <Heading
            size={useBreakpointValue({ base: "md", md: "md" })}
            mb={2}
          >
            Iniciar sesión
          </Heading>
          <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.500" mb={{ base: 4, md: 6 }}>
            Ingresa con tus credenciales institucionales
          </Text>

          <LoginForm />
        </Box>
      </Flex>
    </Flex>
  );
}
