import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import FichaClinica from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <FichaClinica />
  </ChakraProvider>
);
