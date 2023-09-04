import React from "react";

//table component
import Tableheaddate from "../../Tables/Table_head_date/index";
import Tableheaddescription from "../../Tables/Table_head_description";
import Icondelete from "../../Icons/Icon_delete";

const TaskModal = ({
  index,
  nomeTarefa,
  tarefa,
  dataStart,
  dataConclusion,
  showTaskModal,
  confirmarRemocaoTarefa,
}) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-tast-custom-size btn-primary mb-0"
        data-bs-toggle="modal"
        data-bs-target={`#TaskModal${index}`}
      >
        <b>
          {index + 1}° Tarefa: {nomeTarefa[index]}
        </b>
      </button>
      <div
        className={`modal fade ${showTaskModal === index ? "show" : ""}`}
        style={{
          display: showTaskModal === index ? "block" : "none",
        }}
        id={`TaskModal${index}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`staticBackdropLabel${index}`}
        aria-hidden={showTaskModal !== index}
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
              >
                Ok
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
    </>
  );
};

export default TaskModal;
