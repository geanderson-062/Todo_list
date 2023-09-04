/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ScrollReveal from "scrollreveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//icon component
import Iconedit from "./Icon_edit";
import Icondelete from "./Icon_delete";
import Iconimport from "./Icon_import";
import Iconexport from "./Icon_export";
import Iconadd from "./Icon_add";
import Icontxt from "./Icon_txt";
import Iconcsv from "./Icon_csv";
import Iconjson from "./Icon_json";
//table component
import Tableheaddate from "./Table_head_date";
import Tableheaddescription from "./Table_head_description";

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
  const [showTaskCont, setShowTaskCont] = useState(false);

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
    // Verifique se há mais de 0 tarefa para mostrar o botão "Excluir Todas as Tarefas"
    setShowTaskCont(tarefas.length > 0);
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
  const exportarListaTarefasTXT = () => {
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

  const exportarListaTarefasCSV = () => {
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

    // Cabeçalho do CSV
    const csvHeader =
      "Nome da Tarefa,Descrição,Data de Início,Data de Conclusão\n";

    // Linhas do CSV
    const csvContent = tarefas
      .map((tarefa, index) => {
        return `${nomeTarefa[index]},${tarefa},${dataStart[index]},${dataConclusion[index]}\n`;
      })
      .join("");

    // Combinar cabeçalho e conteúdo em um único CSV
    const conteudo = csvHeader + csvContent;

    const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_de_tarefas.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportarListaTarefasJSON = () => {
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

    // Criar um objeto JSON com os dados das tarefas
    const tarefasJSON = tarefas.map((tarefa, index) => {
      return {
        NomeTarefa: nomeTarefa[index],
        Descricao: tarefa,
        DataInicio: dataStart[index],
        DataConclusao: dataConclusion[index],
      };
    });

    // Converter o objeto JSON em uma string JSON formatada
    const conteudo = JSON.stringify(tarefasJSON, null, 2);

    const blob = new Blob([conteudo], {
      type: "application/json;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_de_tarefas.json";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [importedTasks, setImportedTasks] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  const importarTarefas = () => {
    Swal.fire({
      title: "Atenção",
      text: "Apenas arquivos em Txt serão importados",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "#0D6EFD",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#DC3545",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
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

  const contarTarefas = () => {
    return tarefas.length;
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
          <Iconadd />
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={importarTarefas}
          style={{ marginLeft: "20%", marginRight: "20%" }}
        >
          Importar
          <Iconimport />
        </button>
        {showExportButton && (
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#Exportar"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            Exportar
            <Iconexport />
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
      {showTaskCont && (
        <h4 className="fs-4 text-center" style={{ marginTop: 20 }}>
          Total de Tarefas ativas: {contarTarefas()}
        </h4>
      )}

      <br />
      {/* Modal para exportar arquivos  */}
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Escolha o formarto do arquivo
              </h1>
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
                    <th scope="col">Tarefa #{index + 1}</th>
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
