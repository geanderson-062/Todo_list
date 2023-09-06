import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // Certifique-se de importar o DatePicker corretamente

import Tableheaddate from "../../Tables/Table_head_date/index";
import Tableheaddescription from "../../Tables/Table_head_description";
import Labelnametask from "../../Labels/Label_name_task_edit";
import Labeldescription from "../../Labels/Label_description_edit";
import Iconedit from "../../Icons/Icon_edit";
import Icondelete from "../../Icons/Icon_delete";
import LabelDataStart from "../../Labels/Label_edit_data_start";
import LabelDataConclusion from "../../Labels/Label_edit_data_conclusion";

const Tarefa = ({
  index,
  nomeTarefa,
  tarefa,
  dataStart,
  dataConclusion,
  novaNomeTarefa,
  novaTarefa,
  selectedStartDate,
  selectedConclusionDate,
  setNovaNomeTarefa,
  setNovaTarefa,
  handleDateStartChange,
  handleDateConclusionChange,
  salvarTarefaEditada,
  abrirModalTarefa,
  editarTarefa,
  confirmarRemocaoTarefa,
}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [hasTasksToEdit, setHasTasksToEdit] = useState(false);

  // Use useEffect para verificar se há tarefas sempre que a matriz de tarefas for alterada
  useEffect(() => {
    if (nomeTarefa && nomeTarefa.length > 0) {
      setHasTasksToEdit(true);
    } else {
      setHasTasksToEdit(false);
      // Se não houver tarefas, feche ambos os modais
      setShowTaskModal(false);
    }
  }, [nomeTarefa]);

  return (
    <>
      <div key={index}>
        <div className="row">
          <div className="col-12 col-md-6 mx-auto mt-3">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-tast-custom-size btn-primary mb-0"
                  data-bs-toggle="modal"
                  data-bs-target={`#TaskModal${index}`}
                  onClick={() => {
                    abrirModalTarefa();
                    setShowTaskModal(true);
                  }}
                >
                  <p>
                    {index + 1}° Tarefa: {nomeTarefa[index]}
                  </p>
                </button>
                <button
                  href="#"
                  style={{ marginRight: 5, marginLeft: 5 }}
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target={`#editModal${index}`}
                  onClick={() => editarTarefa(index)}
                  title="Editar Tarefa"
                >
                  <Iconedit />
                </button>
                <button
                  href="#"
                  style={{ marginRight: 5 }}
                  className="btn btn-danger"
                  onClick={() => confirmarRemocaoTarefa(index)}
                  title="Excluir Tarefa"
                >
                  <Icondelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal da tarefa */}
      {hasTasksToEdit && (
        <div
          className={`modal fade ${showTaskModal ? "show" : ""}`}
          style={{ display: showTaskModal ? "block" : "none" }}
          id={`TaskModal${index}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby={`staticBackdropLabel${index}`}
          aria-hidden={!showTaskModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {nomeTarefa[index]}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowTaskModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-secondary table-bordered table-hover">
                  <Tableheaddescription />
                  <tbody>
                    <tr className="bg-dark">
                      <td>{tarefa}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-secondary table-bordered table-hover">
                  <Tableheaddate />
                  <tbody>
                    <tr className="bg-dark">
                      <td>{dataStart[index]}</td>
                      <td>{dataConclusion[index]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowTaskModal(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {hasTasksToEdit && (
        <div
          className="modal fade"
          id={`editModal${index}`}
          tabIndex="-1"
          aria-labelledby={`editModalLabel${index}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`editModalLabel${index}`}>
                  Editar Tarefa
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input mb-3">
                  <Labelnametask />
                  <input
                    type="text"
                    value={novaNomeTarefa}
                    onChange={(e) => setNovaNomeTarefa(e.target.value)}
                    className="form-control"
                    placeholder="nome com no máximo 22 caracteres"
                  />
                  <br />
                  <Labeldescription />
                  <input
                    type="text"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    className="form-control"
                    placeholder="uma descrição clara de sua tarefa"
                  />
                  <br />
                  <LabelDataStart dataStart={dataStart} index={index} />
                  <br />
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={handleDateStartChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Nova data de inicio"
                    className="form-control"
                    isClearable
                  />
                  <br />
                  <br />
                  <LabelDataConclusion
                    dataConclusion={dataConclusion}
                    index={index}
                  />
                  <br />
                  <DatePicker
                    selected={selectedConclusionDate}
                    onChange={handleDateConclusionChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Nova data de conclusão"
                    className="form-control"
                    isClearable
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    salvarTarefaEditada();
                  }}
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tarefa;
