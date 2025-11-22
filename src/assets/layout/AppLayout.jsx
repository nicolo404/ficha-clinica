import {
  Box,
  Flex,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Link as ChakraLink,
  Button,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Fichas", to: "/fichas" },
  { label: "Crear ficha", to: "/fichas/nueva" },
];

export default function AppLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex minH="100dvh" bg={bg}>
      {/* Sidebar fija en md+ */}
      <SidebarContent display={{ base: "none", md: "block" }} />

      {/* Drawer en móvil */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onNavigate={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Contenedor principal */}
      <Box flex="1" ml={{ base: 0, md: 64 }}>
        <MobileNav onOpenMenu={onOpen} />
        <MainContent />
      </Box>
    </Flex>
  );
}

/* ---------- Sidebar / Drawer ---------- */
function SidebarContent({ onNavigate, ...props }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="nav"
      w={{ base: "full", md: 64 }}
      pos={{ base: "relative", md: "fixed" }}
      h="full"
      bg={cardBg}
      borderRightWidth={{ base: 0, md: "1px" }}
      borderRightColor={border}
      boxShadow={{ base: "none", md: "sm" }}
      p={4}
      {...props}
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between" mb={2}>
          <Text fontWeight="bold">Portal Clínico</Text>
          <Badge colorScheme="teal" variant="subtle">v1</Badge>
        </HStack>
        <Divider />
        <VStack align="stretch" spacing={1}>
          {navItems.map((item) => (
            <NavRow key={item.to} to={item.to} onClick={onNavigate} label={item.label} />
          ))}
        </VStack>

        <Box mt="auto" pt={4}>
          <Divider mb={3} />
          <Text fontSize="xs" color="gray.500">
            Sesión segura · Solo personal autorizado
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

function NavRow({ to, label, onClick }) {
  const activeColor = useColorModeValue("teal.600", "teal.300");
  const hoverBg = useColorModeValue("teal.50", "whiteAlpha.100");

  return (
    <ChakraLink
      as={NavLink}
      to={to}
      onClick={onClick}
      end
      _activeLink={{ color: activeColor, fontWeight: "semibold", bg: hoverBg }}
      _hover={{ textDecoration: "none", bg: hoverBg }}
      borderRadius="lg"
      px={3}
      py={2}
    >
      {label}
    </ChakraLink>
  );
}

/* ---------- Barra superior (móvil) ---------- */
function MobileNav({ onOpenMenu }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const location = useLocation();

  const title = location.pathname.startsWith("/fichas/nueva")
    ? "Crear ficha"
    : "Fichas";

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={4}
      h={14}
      bg={cardBg}
      borderBottomWidth="1px"
      borderBottomColor={border}
      position="sticky"
      top={0}
      zIndex={10}
      display={{ base: "flex", md: "none" }}
    >
      <IconButton
        aria-label="Abrir menú"
        icon={<HamburgerIcon />}
        variant="ghost"
        onClick={onOpenMenu}
      />
      <Text fontWeight="semibold">{title}</Text>
      <Box w={10} /> {/* spacer simétrico */}
    </Flex>
  );
}

/* ---------- Área de contenido + FAB móvil ---------- */
function MainContent() {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box p={{ base: 4, md: 8 }}>
      {/* Breadcrumbs simples si quieres agregarlos (opcional)
      <Breadcrumb mb={4}><BreadcrumbItem><BreadcrumbLink as={Link} to="/fichas">Fichas</BreadcrumbLink></BreadcrumbItem></Breadcrumb>
      */}

      <Box bg={cardBg} borderRadius="2xl" boxShadow="sm" p={{ base: 4, md: 6 }}>
        <Outlet />
      </Box>

      {/* Botón flotante SOLO en móvil para crear ficha */}
      <Button
        as={Link}
        to="/fichas/nueva"
        aria-label="Crear ficha"
        position="fixed"
        right={4}
        bottom={4}
        colorScheme="teal"
        leftIcon={<AddIcon />}
        borderRadius="full"
        size="lg"
        boxShadow="lg"
        display={{ base: "inline-flex", md: "none" }}
      >
        Crear
      </Button>
    </Box>
  );
}
