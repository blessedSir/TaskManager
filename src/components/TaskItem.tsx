import { useState } from "react";
import type { Task } from "../types/Task";
import { motion } from "framer-motion";

interface Props {
  task: Task;
  darkMode: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

export function TaskItem({
  task,
  darkMode,
  onToggle,
  onDelete,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [tags, setTags] = useState<string[]>(task.tags || []);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    onUpdate({ ...task, title, priority, tags });
    setIsEditing(false);
  };

  const priorityColor =
    task.priority === "high"
      ? "border-red-500"
      : task.priority === "medium"
      ? "border-yellow-500"
      : "border-green-500";

  if (isEditing) {
    return (
      <div
        className={`flex flex-col gap-2 border-l-4 ${priorityColor} rounded-lg p-3 shadow transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border rounded-lg p-1 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 text-gray-100 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className={`border rounded-lg p-1 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 text-gray-100 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex gap-2">
          {["Work", "Personal"].map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2 py-1 border transition-colors duration-300 ${
                tags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : darkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-500 text-white rounded-lg"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-2 py-1 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex justify-between items-center border-l-4 ${priorityColor} rounded-lg p-3 shadow transition-colors duration-300
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="accent-blue-600"
        />
        <div className="flex flex-col">
          <span
            className={`capitalize transition-colors duration-300 ${
              task.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : ""
            }`}
          >
            {task.title}
          </span>
          {/* Теги */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex gap-1 mt-1">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
                    darkMode
                      ? tag === "Work"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                      : tag === "Work"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="px-2 py-1 bg-yellow-400 text-white rounded-lg"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task.id)}
        className={`font-bold transition-colors duration-300 ${
          darkMode
            ? "text-red-400 hover:text-red-600"
            : "text-red-500 hover:text-red-700"
        }`}
      >
        ✕
      </button>
    </motion.div>
  );
}
