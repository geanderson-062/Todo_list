import React from "react";

const Tarefa = ({ index, dataConclusion }) => {
  return (
    <label class="form-label">
      Data de conclusão digitada antes:{" "}
      <b className="text-danger">{dataConclusion[index]}</b>
    </label>
  );
};

export default Tarefa;
