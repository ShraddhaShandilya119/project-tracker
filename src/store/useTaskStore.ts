import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: Date;
}

interface Store {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: number, status: string) => void;
}

export const useTaskStore = create<Store>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status } : t
      ),
    })),
}));