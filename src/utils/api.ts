import axios from "axios";
import type { Task } from "../types/Task";

// Замените на URL вашего API на Render
const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

const axiosAuth = axios.create({
  baseURL: API_URL,
});

// Interceptor обновляет токен при каждом запросе
axiosAuth.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Auth
export const registerUser = async (email: string, password: string) => {
  // Проверяем, существует ли уже пользователь с таким email
  const existingUsers = await axios.get(`${API_URL}/users`, {
    params: { email },
  });

  if (existingUsers.data.length > 0) {
    throw new Error("User with this email already exists");
  }

  const res = await axios.post(`${API_URL}/users`, { email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.get(`${API_URL}/users`, {
    params: { email, password },
  });
  if (res.data.length > 0) {
    const user = res.data[0];
    const token = btoa(`${user.email}:${user.password}`);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};

// Tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const userId = localStorage.getItem("userId");
  const res = await axiosAuth.get<Task[]>("/tasks", {
    params: { userId },
  });
  return res.data;
};

export const addTask = async (task: Task): Promise<Task> => {
  const userId = localStorage.getItem("userId");
  const res = await axiosAuth.post<Task>("/tasks", { ...task, userId });
  return res.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await axiosAuth.put<Task>(`/tasks/${task.id}`, task);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosAuth.delete(`/tasks/${id}`);
};
