/* eslint-disable no-unused-vars */
//libs
import React from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
//styles
import "./style.css";
//vareaveis de estados
import { StateVariables } from "../../Utils/StateVariables";
//useEffects
import {
  useDeleteAllButtonEffect,
  useExportButtonEffect,
  useTaskContEffect,
  useScrollRevealEffect,
} from "../../Utils/useEffects";
//components
import Deleteallbutton from "../Buttons/Delete_all_buton";
import Titleinfotasks from "../Titles/Title_info_tasks";
//modals
import NewTaskModal from "../Modals/NewTaskModal";
import ImportModal from "../Modals/ImportModal";
import ExportModal from "../Modals/ExportModal";
import MainButtons from "../Buttons/TaskMainButtons";
import Titleactivetasks from "../Titles/Title_active tasks";

export default function Search() {
  //vareaveis de estado
  const {
    novaTarefa,
    setNovaTarefa,
    novaNomeTarefa,
    setNovaNomeTarefa,
    selectedStartDate,
    setSelectedStartDate,
    selectedConclusionDate,
    setSelectedConclusionDate,
    indiceEdicaoTarefa,
    setIndiceEdicaoTarefa,
    novaDataConclusion,
    novaData,
    setNovaDataConclusion,
    setNovaData,
    showTaskModal,
    setShowTaskModal,
    showExportButton,
    setShowExportButton,
    showDeleteAllButton,
    setShowDeleteAllButton,
    showTaskCont,
    setShowTaskCont,
    tarefas,
    setTarefas,
    nomeTarefa,
    setNomeTarefa,
    dataStart,
    setDataStart,
    dataConclusion,
    setDataConclusion,
    importedTasks,
    setImportedTasks,
    showImportModal,
    setShowImportModal,
  } = StateVariables();

  //useEffect
  useDeleteAllButtonEffect(setShowDeleteAllButton, tarefas);
  useExportButtonEffect(setShowExportButton, tarefas);
  useTaskContEffect(setShowTaskCont, tarefas);
  useScrollRevealEffect();

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

  const adicionarTarefa = () => {
    const MAX_CARACTERES_NOME_TAREFA = 18; // Defina o valor máximo de caracteres permitidos

    if (
      novaTarefa.trim() !== "" &&
      novaNomeTarefa.trim() !== "" &&
      selectedStartDate !== null &&
      selectedConclusionDate !== null
    ) {
      if (novaNomeTarefa.length <= MAX_CARACTERES_NOME_TAREFA) {
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
          text: `O nome da tarefa deve ter no máximo ${MAX_CARACTERES_NOME_TAREFA} caracteres.`,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#0D6EFD",
        });
      }
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
    const MAX_CARACTERES_NOME_TAREFA = 18; // Defina o valor máximo de caracteres permitidos

    if (
      novaTarefa.trim() !== "" &&
      novaNomeTarefa.trim() !== "" &&
      novaNomeTarefa.length <= MAX_CARACTERES_NOME_TAREFA && // Verifica o limite de caracteres
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
    } else if (novaNomeTarefa.length > MAX_CARACTERES_NOME_TAREFA) {
      Swal.fire({
        title: "Erro!",
        text: `O nome da tarefa deve ter no máximo ${MAX_CARACTERES_NOME_TAREFA} caracteres.`,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#0D6EFD",
      });
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
            if (file.name.endsWith(".txt")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const content = e.target.result;
                setImportedTasks(content);
                setShowImportModal(true);
              };
              reader.readAsText(file);
            } else {
              Swal.fire({
                title: "Erro",
                text: "Apenas arquivos em Txt são importados",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#0D6EFD",
              });
            }
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
      <div className="row">
        <div className="col-12 col-md-6 mx-auto mt-3">
          <div className="d-flex flex-column align-items-center">
            <NewTaskModal
              novaNomeTarefa={novaNomeTarefa}
              setNovaNomeTarefa={setNovaNomeTarefa}
              novaTarefa={novaTarefa}
              setNovaTarefa={setNovaTarefa}
              selectedStartDate={selectedStartDate}
              handleDateStartChange={handleDateStartChange}
              selectedConclusionDate={selectedConclusionDate}
              handleDateConclusionChange={handleDateConclusionChange}
              adicionarTarefa={adicionarTarefa}
              adicionarNomeTarefa={adicionarNomeTarefa}
            />
            <ImportModal
              showImportModal={showImportModal}
              setShowImportModal={setShowImportModal}
              importedTasks={importedTasks}
              setImportedTasks={setImportedTasks}
              importarTarefas={importarTarefas}
              adicionarTarefasImportadas={adicionarTarefasImportadas}
            />

            <ExportModal
              exportarListaTarefasTXT={exportarListaTarefasTXT}
              exportarListaTarefasCSV={exportarListaTarefasCSV}
              exportarListaTarefasJSON={exportarListaTarefasJSON}
              showExportButton={showExportButton}
            />

            <Deleteallbutton
              showDeleteAllButton={showDeleteAllButton}
              excluirTodasAsTarefas={excluirTodasAsTarefas}
            />
          </div>
        </div>
      </div>

      <Titleactivetasks
        showTaskCont={showTaskCont}
        contarTarefas={contarTarefas}
      />

      <br />

      {/* Tarefas */}
      <div>
        {tarefas.length === 0 ? (
          <Titleinfotasks />
        ) : (
          tarefas.map((tarefa, index) => (
            <MainButtons
              key={index}
              index={index}
              nomeTarefa={nomeTarefa}
              tarefa={tarefa}
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
              abrirModalTarefa={abrirModalTarefa}
              editarTarefa={editarTarefa}
              confirmarRemocaoTarefa={confirmarRemocaoTarefa}
            />
          ))
        )}
      </div>
    </div>
  );
}
