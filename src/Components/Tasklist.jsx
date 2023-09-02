/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ScrollReveal from "scrollreveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        Swal.fire({
          title: "Excluído!",
          text: "A tarefa foi excluída com sucesso.",
          icon: "success",
          confirmButtonColor: "#0D6EFD",
        });
      }
    });
  };

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [nomeTarefa, setNomeTarefa] = useState([]);
  const [novaNomeTarefa, setNovaNomeTarefa] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novaDataConclusion, setNovaDataConclusion] = useState("");
  const [dataStart, setDataStart] = useState([]);
  const [dataConclusion, setDataConclusion] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedConclusionDate, setSelectedConclusionDate] = useState(null);
  const [indiceEdicaoTarefa, setIndiceEdicaoTarefa] = useState(null);
  const [showDeleteAllButton, setShowDeleteAllButton] = useState(false);
  const [showExportButton, setShowExportButton] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const adicionarTarefa = () => {
    if (
      novaTarefa.trim() !== "" &&
      novaNomeTarefa.trim() !== "" &&
      selectedStartDate !== null &&
      selectedConclusionDate !== null
    ) {
      setTarefas([...tarefas, novaTarefa]);
      setNomeTarefa([...nomeTarefa, novaNomeTarefa]);
      setDataStart([
        ...dataStart,
        selectedStartDate.toISOString().split("T")[0],
      ]);
      setDataConclusion([
        ...dataStart,
        selectedConclusionDate.toISOString().split("T")[0],
      ]);
      setNovaTarefa("");
      setNovaNomeTarefa("");
      setSelectedStartDate(null);
      setSelectedConclusionDate(null);
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
    setNovaData(dataStart[index]);
    setNovaDataConclusion(dataConclusion[index]);
  };

  const salvarTarefaEditada = () => {
    if (
      novaTarefa.trim() !== "" &&
      novaNomeTarefa.trim() !== "" &&
      selectedStartDate !== null &&
      selectedConclusionDate !== null
    ) {
      const tarefasAtualizadas = [...tarefas];
      tarefasAtualizadas[indiceEdicaoTarefa] = novaTarefa;

      const nomesTarefaAtualizados = [...nomeTarefa];
      nomesTarefaAtualizados[indiceEdicaoTarefa] = novaNomeTarefa;

      const datasAtualizadas = [...dataStart];
      datasAtualizadas[indiceEdicaoTarefa] = selectedStartDate
        .toISOString()
        .split("T")[0];
      const datasConclusionAtualizadas = [...dataConclusion];
      datasConclusionAtualizadas[indiceEdicaoTarefa] = selectedConclusionDate
        .toISOString()
        .split("T")[0];

      setTarefas(tarefasAtualizadas);
      setNomeTarefa(nomesTarefaAtualizados);
      setDataStart(datasAtualizadas);
      setDataConclusion(datasConclusionAtualizadas);

      setNovaTarefa("");
      setNovaNomeTarefa("");
      setSelectedStartDate(null);
      setSelectedConclusionDate(null);
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

  const abrirModalTarefa = () => {
    setShowTaskModal(true);
  };

  const handleDateStartChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleDateConclusionChange = (date) => {
    setSelectedConclusionDate(date);
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
    const datasAtualizadas = dataStart.filter((_, i) => i !== index);
    setDataStart(datasAtualizadas);
    const datasConclusionAtualizadas = dataConclusion.filter(
      (_, i) => i !== index
    );
    setDataConclusion(datasConclusionAtualizadas);
  };

  const excluirTodasAsTarefas = () => {
    Swal.fire({
      title: "Confirmação",
      text: "Tem certeza de que deseja excluir todas as tarefas?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#DC3545",
      confirmButtonColor: "#0D6EFD",
    }).then((result) => {
      if (result.isConfirmed) {
        // Limpar todas as tarefas
        setTarefas([]);
        setNomeTarefa([]);
        setDataStart([]);
        setDataConclusion([]);
        // Fechar o modal se estiver aberto
        setShowImportModal(false);
        Swal.fire({
          confirmButtonColor: "#0D6EFD",
          title: "Excluídas!",
          text: "Todas as tarefas foram excluídas com sucesso.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    // Verifique se há mais de uma tarefa para mostrar o botão "Excluir Todas as Tarefas"
    setShowDeleteAllButton(tarefas.length > 1);
  }, [tarefas]);

  useEffect(() => {
    // Verifique se há mais de 0 tarefa para mostrar o botão "Excluir Todas as Tarefas"
    setShowExportButton(tarefas.length > 0);
  }, [tarefas]);

  useEffect(() => {
    ScrollReveal().reveal(".scroll-reveal", {
      duration: 1000,
      distance: "20px",
      easing: "ease-in-out",
      origin: "bottom",
      delay: 100,
    });
  }, []);

  // Função para exportar a lista de tarefas em um arquivo de texto
  const exportarListaTarefas = () => {
    if (tarefas.length === 0) {
      Swal.fire({
        title: "Lista Vazia",
        text: "A lista de tarefas está vazia. Não há nada para exportar.",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#0D6EFD",
      });
      return;
    }

    const conteudo = tarefas
      .map((tarefa, index) => {
        return `${nomeTarefa[index]} - ${tarefa} - ${dataStart[index]} - ${dataConclusion[index]}\n`;
      })
      .join("");

    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_de_tarefas.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [importedTasks, setImportedTasks] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  const importarTarefas = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setImportedTasks(content);
          setShowImportModal(true);
        };
        reader.readAsText(file);
      }
    });

    input.click();
  };

  const adicionarTarefasImportadas = () => {
    if (importedTasks.trim() !== "") {
      const lines = importedTasks.split("\n");
      const importedTasksArray = lines.map((line) => {
        const [nome, descricao, dataStart, dataConclusion] = line.split(" - ");
        if (nome && descricao && dataStart && dataConclusion) {
          return { nome, descricao, dataStart, dataConclusion };
        } else {
          return null;
        }
      });

      const validImportedTasksArray = importedTasksArray.filter(
        (task) => task !== null
      );

      const updatedTasks = [
        ...tarefas,
        ...validImportedTasksArray.map((task) => task.descricao),
      ];
      const updatedNames = [
        ...nomeTarefa,
        ...validImportedTasksArray.map((task) => task.nome),
      ];
      const updatedDates = [
        ...dataStart,
        ...validImportedTasksArray.map((task) => task.dataStart),
      ];
      const updatedDatesConclusion = [
        ...dataConclusion,
        ...validImportedTasksArray.map((task) => task.dataConclusion),
      ];

      setTarefas(updatedTasks);
      setNomeTarefa(updatedNames);
      setDataStart(updatedDates);
      setDataConclusion(updatedDatesConclusion);

      setImportedTasks("");
    }
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            style={{ marginLeft: 5 }}
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={importarTarefas}
          style={{ marginLeft: "20%", marginRight: "20%" }}
        >
          Importar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            style={{ marginLeft: 5 }}
            fill="currentColor"
            class="bi bi-cloud-arrow-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
          </svg>
        </button>
        {showExportButton && (
          <button
            type="button"
            className="btn btn-success"
            onClick={exportarListaTarefas}
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            Exportar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              style={{ marginLeft: 5 }}
              fill="currentColor"
              class="bi bi-filetype-txt"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14 4.5V14a2 2 0 0 1-2 2h-2v-1h2a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.928 15.849v-3.337h1.136v-.662H0v.662h1.134v3.337h.794Zm4.689-3.999h-.894L4.9 13.289h-.035l-.832-1.439h-.932l1.228 1.983-1.24 2.016h.862l.853-1.415h.035l.85 1.415h.907l-1.253-1.992 1.274-2.007Zm1.93.662v3.337h-.794v-3.337H6.619v-.662h3.064v.662H8.546Z"
              />
            </svg>
          </button>
        )}
        {showDeleteAllButton && (
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "20%", marginRight: "20%" }}
            onClick={excluirTodasAsTarefas}
          >
            Excluir Todas as Tarefas
          </button>
        )}
      </div>

      <br />
      {/* Modal para visualizar e adicionar tarefas importadas */}
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
              <h4 className="modal-title" id="importModalLabel">
                Tarefas Importadas
              </h4>
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
                  adicionarTarefasImportadas();
                  setShowImportModal(false);
                }}
              >
                Adicionar Tarefas Importadas
              </button>
            </div>
          </div>
        </div>
      </div>
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
              <table className="table table-secondary table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tarefas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-dark">
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target={`#TaskModal${index}`}
                        onClick={() => abrirModalTarefa()}
                      >
                        {nomeTarefa[index]}
                      </button>
                      <button
                        href="#"
                        style={{ marginLeft: 5, marginRight: 5 }}
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={`#editModal${index}`}
                        onClick={() => editarTarefa(index)}
                        title="Editar Tarefa"
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
                      <button
                        href="#"
                        style={{ marginRight: 5 }}
                        className="btn btn-danger"
                        onClick={() => confirmarRemocaoTarefa(index)}
                        title="Excluir Tarefa"
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
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Modal da tarefa */}
              <div
                className={`modal fade ${
                  showTaskModal === index ? "show" : ""
                }`}
                style={{ display: showTaskModal === index ? "block" : "none" }}
                id={`TaskModal${index}`} // Use o índice para tornar o ID único
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby={`staticBackdropLabel${index}`} // Use o índice para tornar o ID único
                aria-hidden={showTaskModal !== index}
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        {nomeTarefa[index]}
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <table className="table table-secondary table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-dark">
                            <td>{tarefa}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table table-secondary table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Data de inicio</th>
                            <th scope="col">Data de Conclusão</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-dark">
                            <td>{dataStart[index]}</td>
                            <td>{dataConclusion[index]}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Ok
                      </button>
                      <button
                        href="#"
                        style={{ marginRight: 5 }}
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={`#editModal${index}`}
                        onClick={() => editarTarefa(index)}
                        title="Editar Tarefa"
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
                      <button
                        href="#"
                        style={{ marginRight: 5 }}
                        className="btn btn-danger"
                        onClick={() => confirmarRemocaoTarefa(index)}
                        title="Excluir Tarefa"
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
                    </div>
                  </div>
                </div>
              </div>

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
                          placeholderText="Data de inicio"
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
