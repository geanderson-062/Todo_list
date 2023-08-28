import { useState } from "react";
import "../styles/main.css";
import "../App";

export default function Search() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [nametask, setNametask] = useState([]);
  const [newNametask, setNewNametask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const addNametask = () => {
    if (newNametask.trim() !== "") {
      setNametask([...nametask, newNametask]);
      setNewNametask("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    const updatedNametask = nametask.filter((_, i) => i !== index);
    setNametask(updatedNametask);
  };
  return (
    <div className="container">
      <div className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: 50 }}>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ marginLeft: "20%", marginRight: "20%" }}
        >
          Nova tarefa
        </button>
      </div>

      <br />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Tasklist
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
                <input
                  type="text"
                  value={newNametask}
                  onChange={(e) => setNewNametask(e.target.value)}
                  className="form-control"
                  placeholder="Digite o nome da tarefa"
                />
                <br />
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="form-control"
                  placeholder="Digite uma tarefa"
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    addTask();
                    addNametask();
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-info"
                  viewBox="0 0 16 16"
                >
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="TaskBoard">
        {tasks.map((task, index) => (
          <>
            <div className="card text-center">
              <div className="card-header">{nametask[index]}</div>
              <div className="card-body">
                <p className="card-text">{task}</p>
                <button
                  href="#"
                  className="btn btn-danger"
                  onClick={() => {
                    removeTask(index);
                    removeNametask(index);
                  }}
                >
                  Deletar
                </button>
              </div>
              <div className="card-footer text-body-secondary">2 days ago</div>
            </div>

            <br />
          </>
        ))}
      </div>
    </div>
  );
}
