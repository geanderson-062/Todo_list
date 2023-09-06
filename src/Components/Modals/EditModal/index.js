import React from "react";
import DatePicker from "react-datepicker"; // Certifique-se de importar o DatePicker corretamente
import Labelnametask from "../../Labels/Label_name_task_edit";
import Labeldescription from "../../Labels/Label_description_edit";
import Iconedit from "../../Icons/Icon_edit";
import LabelDataStart from "../../Labels/Label_edit_data_start";
import LabelDataConclusion from "../../Labels/Label_edit_data_conclusion";

const Tarefa = ({
  index,
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
  editarTarefa,
}) => {
  return (
    <>
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
    </>
  );
};

export default Tarefa;
