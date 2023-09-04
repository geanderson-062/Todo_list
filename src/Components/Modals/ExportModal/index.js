import React from "react";
import Icontxt from "../../Icons/Icon_txt";
import Iconcsv from "../../Icons/Icon_csv";
import Iconjson from "../../Icons/Icon_json";
import Titlemodalfileexport from "../../Titles/Title_modal_file_export";
import Iconexport from "../../Icons/Icon_export";

const ExportModal = ({
  exportarListaTarefasTXT,
  exportarListaTarefasCSV,
  exportarListaTarefasJSON,
}) => {
  return (
    /*Modal para exportar arquivos  */
    <>
      <button
        type="button"
        className="btn btn-success btn-main_custom-size mb-2 d-md-block scroll-reveal"
        data-bs-toggle="modal"
        data-bs-target="#Exportar"
      >
        Exportar Tarefas
        <Iconexport />
      </button>
      <div
        className="modal fade"
        id="Exportar"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <Titlemodalfileexport />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className="d-grid gap-2 col-6 mx-auto"
                style={{ marginTop: 50 }}
              >
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={exportarListaTarefasTXT}
                >
                  Exportar Txt
                  <Icontxt />
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={exportarListaTarefasCSV}
                >
                  Exportar CSV
                  <Iconcsv />
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={exportarListaTarefasJSON}
                >
                  Exportar JSON
                  <Iconjson />
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportModal;
