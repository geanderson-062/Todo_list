import React from "react";
import Iconimport from "../../Icons/Icon_import";
import Titlemodalfileviewimport from "../../Titles/Title_modal_file_view_import";

const ImportModal = ({
  showImportModal,
  setShowImportModal,
  importedTasks,
  setImportedTasks,
  importarTarefas,
  adicionarTarefasImportadas,
}) => {
  return (
    /* Modal para visualizar e adicionar tarefas importadas */
    <>
      <button
        type="button"
        className="btn btn-success btn-main_custom-size mb-2 scroll-reveal"
        onClick={importarTarefas}
      >
        Importar Tarefas
        <Iconimport />
      </button>
      <div
        className={`modal fade ${showImportModal ? "show" : ""}`}
        style={{ display: showImportModal ? "block" : "none" }}
        id="importModal"
        tabIndex="-1"
        aria-labelledby="importModalLabel"
        aria-hidden={!showImportModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <Titlemodalfileviewimport />
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowImportModal(false)}
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                rows="5"
                className="form-control"
                value={importedTasks}
                onChange={(e) => setImportedTasks(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setShowImportModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => {
                  adicionarTarefasImportadas(); // Corrigido para chamar a função importarTarefas
                  setShowImportModal(false);
                }}
              >
                Adicionar Tarefas
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportModal;
