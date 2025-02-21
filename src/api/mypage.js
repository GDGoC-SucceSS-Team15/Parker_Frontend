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

  updateProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await api.post("/api/my-page/user-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
      throw error;
    }
  },
};

export default mypageApi;
