import React from "react";
import ModalTask from "../../Modals/TaskModals";
import ModalEdit from "../../Modals/EditModal";
import DeleteButton from "../DeleteButton";

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
  return (
    <>
      <div key={index}>
        <div className="row">
          <div className="col-12 col-md-6 mx-auto mt-3">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center">
                <ModalTask
                  index={index}
                  nomeTarefa={nomeTarefa}
                  tarefa={tarefa}
                  dataStart={dataStart}
                  dataConclusion={dataConclusion}
                  abrirModalTarefa={abrirModalTarefa}
                />
                <ModalEdit
                  index={index}
                  dataStart={dataStart}
                  dataConclusion={dataConclusion}
                  novaNomeTarefa={novaNomeTarefa}
                  novaTarefa={novaTarefa}
                  selectedStartDate={selectedStartDate}
                  selectedConclusionDate={selectedConclusionDate}
                  setNovaNomeTarefa={setNovaNomeTarefa}
                  setNovaTarefa={setNovaTarefa}
                  handleDateStartChange={handleDateStartChange}
                  handleDateConclusionChange={handleDateConclusionChange}
                  salvarTarefaEditada={salvarTarefaEditada}
                  editarTarefa={editarTarefa}
                />
                <DeleteButton
                  index={index}
                  confirmarRemocaoTarefa={confirmarRemocaoTarefa}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tarefa;
