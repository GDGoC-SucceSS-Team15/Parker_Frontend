import api from "./api";

// 프로필수정 api
const profileEditApi = {
  updateNickname: async (nickname) => {
    try {
      const response = await api.post("/api/my-page/user-info", { nickname });
      return response.data;
    } catch (error) {
      console.error("닉네임 변경 오류:", error);
      throw error;
    }
  },

  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await api.post("/api/my-page/user-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("프로필 이미지 업로드 오류:", error);
      throw error;
    }
  },
};

export default profileEditApi;
