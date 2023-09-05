import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//title compoenent
import Titlemodalnewtask from "../../Titles/Title_modal_new_task";
//label component
import Labelnametask from "../../Labels/Label_name_task";
import Labeldescription from "../../Labels/Label_description";
import Iconadd from "../../Icons/Icon_add";

const NewTaskModal = ({
  novaNomeTarefa,
  setNovaNomeTarefa,
  novaTarefa,
  setNovaTarefa,
  selectedStartDate,
  handleDateStartChange,
  selectedConclusionDate,
  handleDateConclusionChange,
  adicionarTarefa,
  adicionarNomeTarefa,
}) => {
  return (
    /* Modal de Nova tarefa  */
    <>
      <button
        type="button"
        className="btn btn-primary btn-main_custom-size mb-2 scroll-reveal"
        data-bs-toggle="modal"
        data-bs-target="#newtask"
      >
        Nova tarefa
        <Iconadd />
      </button>
      <div
        className="modal fade"
        id="newtask"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <Titlemodalnewtask />
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
                <DatePicker
                  selected={selectedStartDate}
                  onChange={handleDateStartChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data de inicio"
                  className="form-control"
                  isClearable
                />
                <br />
                <br />
                <DatePicker
                  selected={selectedConclusionDate}
                  onChange={handleDateConclusionChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data de conclusão"
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
                  adicionarTarefa();
                  adicionarNomeTarefa();
                }}
              >
                Adicionar
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

export default NewTaskModal;
