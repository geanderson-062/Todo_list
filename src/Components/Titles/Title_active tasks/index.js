import React from "react";

const Title_active_tasks = ({ showTaskCont, contarTarefas }) => {
  return (
    <>
      {showTaskCont && (
        <h4 className="fs-4 text-center" style={{ marginTop: 20 }}>
          Total de Tarefas ativas: {contarTarefas()}
        </h4>
      )}
    </>
  );
};

export default Title_active_tasks;
