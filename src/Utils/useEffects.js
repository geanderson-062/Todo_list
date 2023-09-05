// useEffects.js
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export const useDeleteAllButtonEffect = (setShowDeleteAllButton, tarefas) => {
  useEffect(() => {
    // Verifique se há mais de uma tarefa para mostrar o botão "Excluir Todas as Tarefas"
    setShowDeleteAllButton(tarefas.length > 1);
  }, [setShowDeleteAllButton, tarefas]);
};

export const useExportButtonEffect = (setShowExportButton, tarefas) => {
  useEffect(() => {
    // Verifique se há mais de 0 tarefa para mostrar o botão "Exportar Tarefas"
    setShowExportButton(tarefas.length > 0);
  }, [setShowExportButton, tarefas]);
};

export const useTaskContEffect = (setShowTaskCont, tarefas) => {
  useEffect(() => {
    // Verifique se há mais de 0 tarefa para mostrar o conteúdo das tarefas
    setShowTaskCont(tarefas.length > 0);
  }, [setShowTaskCont, tarefas]);
};

export const useScrollRevealEffect = () => {
  useEffect(() => {
    ScrollReveal().reveal(".scroll-reveal", {
      duration: 1000,
      distance: "20px",
      easing: "ease-in-out",
      origin: "bottom",
      delay: 100,
    });
  }, []);
};
