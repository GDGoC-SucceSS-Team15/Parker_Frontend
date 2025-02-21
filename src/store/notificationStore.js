import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: null, // 알림 메시지 상태
  showNotification: (message) => set({ notification: message }),
  hideNotification: () => set({ notification: null }),
}));

export default useNotificationStore;
