import { useState } from "react";

export const StateVariables = () => {
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
  const [importedTasks, setImportedTasks] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  return {
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
  };
};
