import React from "react";
import Icondelete from "../../Icons/Icon_delete";

const DeleteAllButton = ({ showDeleteAllButton, excluirTodasAsTarefas }) => {
  return (
    <>
      {showDeleteAllButton && (
        <button
          type="button"
          className="btn btn-danger btn-main_custom-size scroll-reveal"
          onClick={excluirTodasAsTarefas}
        >
          Excluir Todas as Tarefas
          <Icondelete />
        </button>
      )}
    </>
  );
};

export default DeleteAllButton;
