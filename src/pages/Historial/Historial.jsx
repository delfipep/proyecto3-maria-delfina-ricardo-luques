import React, { useState } from "react";
import Header from "../../components/Header/Header";
import style from "./Historial.module.css";
import HistorialItem from "../../components/HistorialItem/HistorialItem";
import { useHistorial } from "../../Context/HistorialContext";

const Historial = () => {
  const { historial, dispatch } = useHistorial();
  const [historialList, setHistorialList] = useState(historial);

  const handleDeleteHistorial = (index) => {
    // Elimina el elemento del contexto
    dispatch({ type: "ELIMINAR_DEL_HISTORIAL", payload: index });

    // Guarda el historial actualizado en el almacenamiento local
    const updatedHistorial = historial.filter((item, i) => i !== index);
    localStorage.setItem("historial", JSON.stringify(updatedHistorial));

    // Actualiza la lista local
    setHistorialList(updatedHistorial);
  };

  return (
    <div className={style.mainContainer}>
      <Header />
      <h1>Historial de combates</h1>

      <div className={style.historyContainer}>
        {historialList.map((item, index) => (
          <div key={index}>
            <HistorialItem item={item} />
            <button
              onClick={() => handleDeleteHistorial(index)}
              className={style.deleteButton}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Historial;
