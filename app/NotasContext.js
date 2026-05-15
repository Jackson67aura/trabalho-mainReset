import { createContext, useState } from "react";

export const NotasContext = createContext();

export function NotasProvider({ children }) {
  const [notas, setNotas] = useState([]);

  function salvarNota(data, texto) {
    const novaNota = {
      id: Date.now().toString(),
      titulo: texto,
      data: data,
      concluido: false,
    };
    setNotas((prev) => [...prev, novaNota]);
  }

  function toggleConcluido(id) {
    const novaLista = notas.map((item) => {
      if (item.id === id) {
        return { ...item, concluido: !item.concluido };
      }
      return item;
    });
    setNotas(novaLista);
  }

  function removerNota(id) {
    const novaLista = notas.filter((item) => item.id !== id);
    setNotas(novaLista);
  }

  return (
    <NotasContext.Provider value={{ notas, salvarNota, removerNota, toggleConcluido }}>
      {children}
    </NotasContext.Provider>
  );
}