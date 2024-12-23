"use client";

import React, { useState } from "react";
import { useTaskManager } from "../hooks/useTaskManager";
import { AddTaskForm } from "./AddTaskForm";
import { TaskColumn } from "./TaskColumn";
import { columns } from "@/data/columns";
import { EditTaskModal } from "./EditTaskModal"; // Importamos el modal
import { Task } from "../types/task";

const KanbanBoard: React.FC = () => {
  const { tasks, addTask, deleteTask, moveTask, updateTask } = useTaskManager();

  // Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Función para abrir el modal de edición
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Función para guardar los cambios en la tarea
  const handleSaveTask = (updatedTask: Task) => {
    updateTask(updatedTask); // Usamos el hook para actualizar la tarea
    setIsModalOpen(false); // Cerramos el modal
  };

  return (
    <div className="kanban-container flex flex-col space-y-4 p-4">
      {/* Formulario para añadir tareas */}
      <AddTaskForm onAddTask={addTask} />

      {/* Tablero Kanban */}
      <div className="kanban-board flex space-x-4 w-full">
        {columns.map((column) => (
          <TaskColumn
            key={column}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column)}
            onTaskDrop={(taskId) => moveTask(taskId, column)}
            onDeleteTask={deleteTask}
            onEditTask={handleEditTask} // Pasamos la función para editar
          />
        ))}
      </div>

      {/* Modal de edición */}
      <EditTaskModal
        task={taskToEdit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default KanbanBoard;
