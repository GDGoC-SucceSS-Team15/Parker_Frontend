import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loadingCount: 0,
  startLoading: () =>
    set((state) => ({ loadingCount: state.loadingCount + 1 })),
  stopLoading: () =>
    set((state) => ({ loadingCount: Math.max(0, state.loadingCount - 1) })),
}));

export const useIsLoading = () => {
  const { loadingCount, startLoading, stopLoading } = useLoadingStore();
  return {
    isLoading: loadingCount > 0,
    startLoading,
    stopLoading,
  };
};

export const loadingStore = useLoadingStore; // 기본 스토어 export
