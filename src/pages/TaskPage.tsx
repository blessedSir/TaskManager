import { useEffect, useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import type { Task } from "../types/Task";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { fetchTasks, addTask, updateTask, deleteTask } from "../utils/api";

interface TaskPageProps {
  onLogout: () => void;
}

export const TaskPage = ({ onLogout }: TaskPageProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Инициализируем сразу из localStorage
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // === Загрузка фильтров и темы
  useEffect(() => {
    const savedFilters = localStorage.getItem("taskFilters");
    if (savedFilters) {
      const { priority, status } = JSON.parse(savedFilters);
      setFilterPriority(priority);
      setFilterStatus(status);
    }

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
  }, []);

  // === Загрузка задач
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(() => toast.error("Failed to load tasks"));
  }, []);

  // === Сохранение фильтров и темы
  useEffect(() => {
    localStorage.setItem(
      "taskFilters",
      JSON.stringify({ priority: filterPriority, status: filterStatus })
    );
  }, [filterPriority, filterStatus]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // === CRUD
  const handleAdd = async (task: Task) => {
    try {
      const newTask = await addTask(task);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added!");
    } catch {
      toast.error("Failed to add task");
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      const updated = await updateTask({ ...task, completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.info("Task deleted!");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleUpdate = async (task: Task) => {
    try {
      const updated = await updateTask(task);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      toast.success("Task updated!");
    } catch {
      toast.error("Failed to update task");
    }
  };

  // === Фильтры
  const priorityOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
  const filteredTasks = tasks
    .filter((task) => {
      const matchPriority =
        filterPriority === "all" || task.priority === filterPriority;
      const matchStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "active"
          ? !task.completed
          : task.completed;
      const matchTag = filterTag === "all" || task.tags?.includes(filterTag);
      return matchPriority && matchStatus && matchTag;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // === Прогресс
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = total - completedCount;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
          Task Manager
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 border rounded-lg transition-colors duration-300 flex items-center justify-center ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-900 hover:text-yellow-300 hover:bg-gray-400"
            }`}
          >
            <FontAwesomeIcon
              className="text-current"
              icon={darkMode ? faSun : faMoon}
            />
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <TaskForm darkMode={darkMode} onAdd={handleAdd} />

        {/* Прогресс */}
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Active: {activeCount} / {total}
            </span>
            <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
              {progress}% done
            </span>
          </div>
          <div
            className={`w-full h-2 rounded-full overflow-hidden ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                progress === 100 ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className={`border rounded-lg p-2 ${
              darkMode
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`border rounded-lg p-2 ${
              darkMode
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className={`border rounded-lg p-2 ${
              darkMode
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option value="all">All tags</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        {/* Список задач */}
        <div className="flex flex-col gap-3">
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tasks match your filters
            </p>
          )}
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                darkMode={darkMode}
                task={task}
                onToggle={() => handleToggle(task)}
                onDelete={() => handleDelete(task.id)}
                onUpdate={handleUpdate}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};
