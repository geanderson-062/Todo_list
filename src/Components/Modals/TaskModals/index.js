import React, { useState, useEffect } from "react";
import Tableheaddate from "../../Tables/Table_head_date/index";
import Tableheaddescription from "../../Tables/Table_head_description";
import "./style.css";

const Tarefa = ({
  index,
  nomeTarefa,
  tarefa,
  dataStart,
  dataConclusion,
  abrirModalTarefa,
}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [, setHasTasksToEdit] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0); // Estado para armazenar os dias restantes
  const [isExpired, setIsExpired] = useState(false); // Estado para verificar se a tarefa está expirada

  useEffect(() => {
    if (nomeTarefa && nomeTarefa.length > 0) {
      setHasTasksToEdit(true);
    } else {
      setHasTasksToEdit(false);
      setShowTaskModal(false);
    }
  }, [nomeTarefa]);

  useEffect(() => {
    // Calcular os dias restantes entre dataStart e dataConclusion
    if (dataStart[index] && dataConclusion[index]) {
      const startDate = new Date(dataStart[index]);
      const endDate = new Date(dataConclusion[index]);
      const currentDate = new Date();

      const timeDiff = endDate - currentDate;
      const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      setDaysRemaining(daysRemaining);

      // Verificar se a tarefa está expirada
      setIsExpired(currentDate > endDate);
    }
  }, [dataStart, dataConclusion, index]);

  return (
    <>
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
              {isExpired ? (
                <p className="text-danger text-center fs-5">Tarefa expirada!</p>
              ) : (
                <p className="text-center text-primary fs-5">
                  Dias restantes: {daysRemaining}
                </p>
              )}
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
    </>
  );
};

export default Tarefa;
