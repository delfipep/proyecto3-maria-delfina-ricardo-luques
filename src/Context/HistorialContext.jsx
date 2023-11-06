import React, { createContext, useReducer, useContext, useEffect } from "react";

// Creamos un contexto para el historial
const HistorialContext = createContext();

// Definimos un reducer para manejar las acciones del historial
const historialReducer = (state, action) => {
  switch (action.type) {
    case "AGREGAR_AL_HISTORIAL":
      return [...state, action.payload];
    case "ELIMINAR_DEL_HISTORIAL":
      return state.filter((item, index) => index !== action.payload);
    default:
      return state;
  }
};

// Proveedor del contexto
export const HistorialProvider = ({ children }) => {
  const [historial, dispatch] = useReducer(historialReducer, [], () => {
    // Recuperar el historial del almacenamiento local si existe
    const localHistorial = localStorage.getItem("historial");
    return localHistorial ? JSON.parse(localHistorial) : [];
  });

  // Guardar el historial en el almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(historial));
  }, [historial]);

  return (
    <HistorialContext.Provider value={{ historial, dispatch }}>
      {children}
    </HistorialContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useHistorial = () => {
  return useContext(HistorialContext);
};

export default HistorialContext; // Exporta el contexto
