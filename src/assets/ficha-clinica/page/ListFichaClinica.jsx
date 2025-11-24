import {
  Box, Flex, HStack, VStack, Stack,
  Heading, Text, Badge, Avatar,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Input, InputGroup, InputLeftElement, Select,
  Button, IconButton, ButtonGroup,
  Menu, MenuButton, MenuList, MenuItem,
  Skeleton, useBreakpointValue, useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import {
  SearchIcon, ChevronDownIcon, ViewIcon, EditIcon
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { getFichasClinicas } from "../api/servicios";
import FichaDetailModal from "../components/ModalDetails";
import { useMemo, useState, useEffect } from "react";

/** Ejemplo de datos (reemplaza con tu fetch) */
const MOCK = [
  {
    id: "FCH-00123",
    paciente: "María Pérez",
    rut: "12.345.678-9",
    estado: "Abierta",
    profesional: "Dr. Soto",
    updatedAt: "2025-11-20 09:12",
  },
  {
    id: "FCH-00124",
    paciente: "Juan Rodríguez",
    rut: "9.876.543-2",
    estado: "En revisión",
    profesional: "Enf. Aguilar",
    updatedAt: "2025-11-19 16:04",
  },
  {
    id: "FCH-00125",
    paciente: "Ana López",
    rut: "21.345.111-0",
    estado: "Cerrada",
    profesional: "Dra. Muñoz",
    updatedAt: "2025-11-18 11:40",
  },
];

const estadoColor = (estado) =>
  estado === "Abierta" ? "green"
  : estado === "En revisión" ? "yellow"
  : "gray";

export default function FichasListView() {
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("todos");
  const [orden, setOrden] = useState("recientes");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardBg  = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50");

  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Simula fetch
  useEffect(() => {
    setLoading(true);
    const t = async () => {
      try {
        const fichas = await getFichasClinicas();
        setData(fichas);
      } catch (error) {
        console.error("Error al cargar las fichas clínicas:", error);
        setData([]); // O manejar el error según sea necesario
      } finally {
        setLoading(false);
      }
    };
    t();
  }, []);

  
  const filtered = useMemo(() => {
    let list = [...data];

    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (i) =>
          i.paciente.toLowerCase().includes(s) ||
          i.rut.toLowerCase().includes(s) ||
          i.id.toLowerCase().includes(s)
      );
    }
    if (estado !== "todos") {
      list = list.filter((i) => i.estado === estado);
    }
    if (orden === "recientes") {
      list.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    } else if (orden === "alfabetico") {
      list.sort((a, b) => a.paciente.localeCompare(b.paciente));
    }
    return list;
  }, [q, estado, orden, data]);

  const hasData = filtered.length > 0;

  const openDetails = (item) => {
    console.log("Item seleccionado:", item);
    setSelected(item);
    onOpen();
  };
  
  
  return (
    <>
    <Box>
      {/* Toolbar */}
      <Flex direction={{ base: "column", md: "row" }} gap={3} mb={4} align="stretch">
        <InputGroup maxW={{ base: "full", md: "360px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Buscar por paciente, RUT o ID"
          />
        </InputGroup>

        <HStack spacing={3}>
          {/* <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            maxW={{ base: "full", md: "200px" }}
          >
            <option value="todos">Todos los estados</option>
            <option value="Abierta">Activo</option>
            <option value="En revision">En revisión</option>
            <option value="Cerrada">Cerrado</option>
          </Select> */}

          {/* <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Orden: {orden === "recientes" ? "Recientes" : "A–Z"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setOrden("recientes")}>Más recientes</MenuItem>
              <MenuItem onClick={() => setOrden("alfabetico")}>Alfabético</MenuItem>
            </MenuList>
          </Menu> */}

          <Button
            as={Link}
            to="/fichas/nueva"
            colorScheme="teal"
            ml={{ base: 0, md: "auto" }}
          >
            Crear ficha
          </Button>
        </HStack>
      </Flex>

      {/* Tabla (md+) */}
      <Box display={{ base: "none", md: "block" }}>
        <TableContainer bg={cardBg} borderRadius="2xl" boxShadow="sm">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Paciente</Th>
                <Th>RUT</Th>
                {/* <Th>Estado</Th> */}
                {/* <Th>Profesional</Th> */}
                <Th>Actualización</Th>
                <Th isNumeric>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Tr key={i}>
                      <Td colSpan={6}>
                        <Skeleton height="24px" />
                      </Td>
                    </Tr>
                  ))
                : hasData
                ? filtered.map((i) => (
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    <Tr key={i._id} _hover={{ backgroundColor: hoverBg }}>
                      <Td>
                        <HStack spacing={3}>
                          <Avatar name={i.nombre} size="sm" />
                          <VStack spacing={0} align="start">
                            <Text fontWeight="semibold">{i.nombre}</Text>
                            {/* <Text fontSize="xs" color="gray.500">{i.id}</Text> */}
                          </VStack>
                        </HStack>
                      </Td>
                      <Td>{i.rut}</Td>
                      {/* <Td><Badge colorScheme={estadoColor(i.estado)}>{i.estado}</Badge></Td> */}
                      {/* <Td>{i.profesional}</Td> */}
                      <Td>{i.fechaActualizacion}</Td>
                      <Td isNumeric>
                        <ButtonGroup size="sm" variant="ghost">
                          <IconButton onClick={() => openDetails(i)} aria-label="Ver" icon={<ViewIcon />} />
                          <IconButton as={Link} to={`/fichas/${i.id}/editar`} aria-label="Editar" icon={<EditIcon />} />
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))
                : (
                  <Tr>
                    <Td colSpan={6}>
                      <EmptyState />
                    </Td>
                  </Tr>
                )}
            </Tbody>
          </Table>
        </TableContainer>
        <FichaDetailModal isOpen={isOpen} onClose={onClose} ficha={selected} />
      </Box>

      {/* Cards (móvil) */}
      <Stack display={{ base: "flex", md: "none" }} spacing={3}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} bg={cardBg} borderRadius="xl" p={4} boxShadow="sm">
                <Skeleton height="20px" mb={3} />
                <Skeleton height="16px" />
              </Box>
            ))
          : hasData
          ? filtered.map((i) => <FichaCard key={i._id} item={i} />)
          : <EmptyState />}
      </Stack>
    </Box>
</>
  );
}

function FichaCard({ item }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const cardBg = useColorModeValue("white", "gray.800");
  const openDetails = (item) => {
    setSelected(item);
    onOpen();
  };
  return (
    <Box bg={cardBg} borderRadius="xl" p={4} boxShadow="sm">
      <HStack align="start" spacing={3}>
        <Avatar name={item.nombre} />
        <VStack align="start" spacing={1} flex="1">
          <HStack justify="space-between" w="full">
            <Text fontWeight="semibold">{item.nombre}</Text>

          </HStack>
          <Text fontSize="sm" color="gray.500">{item.id} · {item.rut}</Text>
          <Text fontSize="sm" color="gray.500">
            {item.fechaActualizacion}
          </Text>
          <HStack pt={2}>
            <Button onClick={() => openDetails(item)} size="sm" leftIcon={<ViewIcon />}>
              Ver
            </Button>
            <Button as={Link} to={`/fichas/${item.id}/editar`} size="sm" variant="ghost" leftIcon={<EditIcon />}>
              Editar
            </Button>
          </HStack>
        </VStack>
      </HStack>
      <FichaDetailModal isOpen={isOpen} onClose={onClose} ficha={selected} />
    </Box>
  );
}

function EmptyState() {
  return (
    <VStack py={8} spacing={2}>
      <Heading size="sm">Sin resultados</Heading>
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Ajusta tu búsqueda o filtros, o crea una nueva ficha.
      </Text>
      <Button as={Link} to="/fichas/nueva" colorScheme="teal" size="sm">
        Crear ficha
      </Button>
    </VStack>
  );
}
