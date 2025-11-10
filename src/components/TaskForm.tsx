import { useState } from "react";
import type { Task } from "../types/Task";

interface Props {
  onAdd: (task: Task) => void;
  darkMode: boolean;
}

export function TaskForm({ onAdd, darkMode }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      tags,
      createdAt: Date.now(),
    };

    onAdd(newTask);
    setTitle("");
    setPriority("medium");
    setTags([]);
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-2 mb-4"
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
        className={`border rounded-lg p-2 flex-1 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "low" | "medium" | "high")
        }
        className={`border rounded-lg p-2 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Теги */}
      <div className="flex gap-2">
        {["Work", "Personal"].map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-2 py-1  border transition-colors duration-300 ${
              tags.includes(tag)
                ? "bg-blue-500 text-white border-blue-500"
                : darkMode
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        type="submit"
        className={`rounded-lg px-4 py-2 transition-colors duration-300 ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Add
      </button>
    </form>
  );
}
