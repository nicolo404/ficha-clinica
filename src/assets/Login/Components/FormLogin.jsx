import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const toast = useToast();
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = { email: "", password: "" };
    if (!values.email) e.email = "El correo es obligatorio";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(values.email)) e.email = "Correo no válido";

    if (!values.password) e.password = "La contraseña es obligatoria";
    else if (values.password.length < 6) e.password = "Mínimo 6 caracteres";
    setErrors(e);
    return !e.email && !e.password;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      // Simulación de login; aquí llamarías a tu API
      await new Promise((r) => setTimeout(r, 900));

      toast({
        title: "Sesión iniciada",
        description: values.remember
          ? "Se mantendrá tu sesión en este dispositivo."
          : "No se recordará tu sesión.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      navigate("/ficha_clinica");
      // Redirigir, e.g. window.location.href = "/dashboard";
    } catch (err) {
      toast({
        title: "Error de autenticación",
        description: "Revisa tus credenciales e intenta nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <VStack align="stretch" spacing={4}>
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Correo institucional</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="nombre@hospital.cl"
            value={values.email}
            onChange={onChange}
            autoComplete="username"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={values.password}
              onChange={onChange}
              autoComplete="current-password"
            />
            <InputRightElement>
              <IconButton
                aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                size="sm"
                variant="ghost"
                onClick={() => setShowPwd((s) => !s)}
                icon={showPwd ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <Checkbox name="remember" isChecked={values.remember} onChange={onChange}>
          Recuérdame en este equipo
        </Checkbox>

        <Button
        type="submit"
        colorScheme="teal"
        size="md"
        isLoading={loading}
        loadingText="Ingresando..."
        mt={2}
        w={{ base: "full", md: "auto" }}   // <-- full en móvil
        >
            Ingresar
        </Button>

        <Link
          href="/recuperar"
          color="teal.600"
          fontSize="sm"
          alignSelf="flex-end"
          _hover={{ textDecoration: "underline" }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </VStack>
    </form>
  );
}
