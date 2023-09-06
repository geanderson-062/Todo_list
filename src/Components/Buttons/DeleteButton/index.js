import React from "react";
import Icondelete from "../../Icons/Icon_delete";

const Tarefa = ({ index, confirmarRemocaoTarefa }) => {
  return (
    <>
      <button
        href="#"
        style={{ marginRight: 5 }}
        className="btn btn-danger"
        onClick={() => confirmarRemocaoTarefa(index)}
        title="Excluir Tarefa"
      >
        <Icondelete />
      </button>
    </>
  );
};

export default Tarefa;
