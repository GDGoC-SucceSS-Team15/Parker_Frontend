import api from "./api";

// 마이페이지 api
const mypageApi = {
  getUserInfo: async () => {
    try {
      const response = await api.get("/api/my-page/user-info");
      return response.data;
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
      throw error;
    }
  },
};
export default mypageApi;
