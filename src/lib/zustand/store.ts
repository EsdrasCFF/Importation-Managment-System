import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ImportProcessFilter {
  status?: string;
  currentPhase?: number;
  supplier?: string;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
}

interface GlobalStore {
  sidebarOpen: boolean;
  currentView: string;
  importFilters: ImportProcessFilter;

  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  setImportFilters: (filters: ImportProcessFilter) => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      currentView: "dashboard",
      importFilters: {},

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setCurrentView: (view) => set({ currentView: view }),
      setImportFilters: (filters) => set({ importFilters: filters }),
    }),
    {
      name: "global-store",
    },
  ),
);
