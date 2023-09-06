import React from "react";

const Tarefa = ({ index, dataStart }) => {
  return (
    <label class="form-label">
      Data de Início digitada antes:{" "}
      <b className="text-danger">{dataStart[index]}</b>
    </label>
  );
};

export default Tarefa;
