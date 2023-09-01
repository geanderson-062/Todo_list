import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export default function Search() {
  const confirmarRemocaoTarefa = (index) => {
    Swal.fire({
      title: "Confirmação",
      text: "Tem certeza de que deseja excluir esta tarefa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#0D6EFD",
      cancelButtonColor: "#DC3545",
    }).then((result) => {
      if (result.isConfirmed) {
        removerTarefa(index);
        Swal.fire("Excluído!", "A tarefa foi excluída com sucesso.", "success");
      }
    });
  };

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const [nomeTarefa, setNomeTarefa] = useState([]);
  const [novaNomeTarefa, setNovaNomeTarefa] = useState("");

  const [data, setData] = useState([]);
  const [novaData, setNovaData] = useState("");

  const [indiceEdicaoTarefa, setIndiceEdicaoTarefa] = useState(null);

  const adicionarTarefa = () => {
    if (
      novaTarefa.trim() !== "" &&
      novaNomeTarefa.trim() !== "" &&
      novaData.trim() !== ""
    ) {
      setTarefas([...tarefas, novaTarefa]);
      setNomeTarefa([...nomeTarefa, novaNomeTarefa]);
      setData([...data, novaData]);
      setNovaTarefa("");
      setNovaNomeTarefa("");
      setNovaData("");
    } else {
      Swal.fire({
        title: "Erro!",
        text: "Preencha todos os campos antes de adicionar a tarefa.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#0D6EFD",
      });
    }
  };

  const editarTarefa = (index) => {
    setIndiceEdicaoTarefa(index);
    setNovaTarefa(tarefas[index]);
    setNovaNomeTarefa(nomeTarefa[index]);
    setNovaData(data[index]);
  };

  const salvarTarefaEditada = () => {
    if (
      novaTarefa.trim() !== "" &&
      novaNomeTarefa.trim() !== "" &&
      novaData.trim() !== ""
    ) {
      const tarefasAtualizadas = [...tarefas];
      tarefasAtualizadas[indiceEdicaoTarefa] = novaTarefa;

      const nomesTarefaAtualizados = [...nomeTarefa];
      nomesTarefaAtualizados[indiceEdicaoTarefa] = novaNomeTarefa;

      const datasAtualizadas = [...data];
      datasAtualizadas[indiceEdicaoTarefa] = novaData;

      setTarefas(tarefasAtualizadas);
      setNomeTarefa(nomesTarefaAtualizados);
      setData(datasAtualizadas);

      setNovaTarefa("");
      setNovaNomeTarefa("");
      setNovaData("");
      setIndiceEdicaoTarefa(null);
    } else {
      Swal.fire({
        title: "Erro!",
        text: "Preencha todos os campos antes de salvar a tarefa editada.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#0D6EFD",
      });
    }
  };

  const adicionarData = () => {
    if (novaData.trim() !== "") {
      setData([...data, novaData]);
      setNovaData("");
    }
  };

  const adicionarNomeTarefa = () => {
    if (novaNomeTarefa.trim() !== "") {
      setNomeTarefa([...nomeTarefa, novaNomeTarefa]);
      setNovaNomeTarefa("");
    }
  };

  const removerTarefa = (index) => {
    const tarefasAtualizadas = tarefas.filter((_, i) => i !== index);
    setTarefas(tarefasAtualizadas);
    const nomesTarefaAtualizados = nomeTarefa.filter((_, i) => i !== index);
    setNomeTarefa(nomesTarefaAtualizados);
    const datasAtualizadas = data.filter((_, i) => i !== index);
    setData(datasAtualizadas);
  };

  const alertaInformacao = () => {
    Swal.fire({
      title: "Sistema de Lista de Tarefas Simples",
      text: "Imagine um aplicativo que ajuda você a lembrar o que precisa fazer. Você escreve o que quer fazer e adiciona na lista. Se esquecer de escrever, ele avisa. As coisas que escreve aparecem na lista. Se terminar uma tarefa, pode tirar da lista. É como um lembrete para suas tarefas.",
      icon: "info",
      confirmButtonText: "Ok",
      confirmButtonColor: "#0D6EFD",
    });
  };

  useEffect(() => {
    ScrollReveal().reveal(".scroll-reveal", {
      duration: 1000,
      distance: "20px",
      easing: "ease-in-out",
      origin: "bottom",
      delay: 100,
    });
  }, []);

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
      {/* Modal de Nova tarefa */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Nova tarefa
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
                  value={novaNomeTarefa}
                  onChange={(e) => setNovaNomeTarefa(e.target.value)}
                  className="form-control"
                  placeholder="Digite o nome da tarefa"
                />
                <br />
                <input
                  type="text"
                  value={novaTarefa}
                  onChange={(e) => setNovaTarefa(e.target.value)}
                  className="form-control"
                  placeholder="Digite uma descrição"
                />
                <br />
                <input
                  type="text"
                  value={novaData}
                  onChange={(e) => setNovaData(e.target.value)}
                  className="form-control"
                  placeholder="Digite a data de conclusão"
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    adicionarTarefa();
                    adicionarNomeTarefa();
                    adicionarData();
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={alertaInformacao}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-info"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897+.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tarefas */}
      <div>
        {tarefas.length === 0 ? (
          <p className="fs-1 text-center scroll-reveal">
            Nenhuma tarefa em andamento.
          </p>
        ) : (
          tarefas.map((tarefa, index) => (
            <div key={index}>
              <br />
              <table className="table table-secondary table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tarefa</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Data</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-dark">
                    <th scope="row">{nomeTarefa[index]}</th>
                    <td>{tarefa}</td>
                    <td>{data[index]}</td>
                    <td>
                      <button
                        href="#"
                        className="btn btn-danger"
                        onClick={() => {
                          confirmarRemocaoTarefa(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>

                      <button
                        href="#"
                        style={{ marginLeft: 5 }}
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={`#editModal${index}`}
                        onClick={() => editarTarefa(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Modal de Edição */}
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
                      <h1
                        className="modal-title fs-5"
                        id={`editModalLabel${index}`}
                      >
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
                        <input
                          type="text"
                          value={novaNomeTarefa}
                          onChange={(e) => setNovaNomeTarefa(e.target.value)}
                          className="form-control"
                          placeholder="Digite o nome da tarefa"
                        />
                        <br />
                        <input
                          type="text"
                          value={novaTarefa}
                          onChange={(e) => setNovaTarefa(e.target.value)}
                          className="form-control"
                          placeholder="Digite uma descrição"
                        />
                        <br />
                        <input
                          type="text"
                          value={novaData}
                          onChange={(e) => setNovaData(e.target.value)}
                          className="form-control"
                          placeholder="Digite a data de conclusão"
                        />
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
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => salvarTarefaEditada(index)}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
