import api from "./api";

// 유저 api
export const userApi = {
  signUp: async (formData) => {
    try {
      const res = await api.post("/api/user/signup", {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        name: formData.name,
      });

      console.log("회원가입 성공", res);
      return true;
    } catch (err) {
      console.log("회원가입 실패", err);
      return false;
    }
  },

  signIn: async (email, password) => {
    try {
      const res = await api.post("/api/user/login", {
        email: email,
        password: password,
      });

      console.log("로그인 성공", res);
      localStorage.setItem("accessToken", res.data.result.accessToken);
      return true;
    } catch (err) {
      console.log("로그인 실패", err);
      return false;
    }
  },

  logOut: async () => {
    try {
      const res = await api.post("/api/user/logout", {});

      console.log("로그아웃 성공", res);
      localStorage.removeItem("accessToken");
      return true;
    } catch (err) {
      console.log("로그아웃 실패", err);
      return false;
    }
  },

  delUser: async () => {
    try {
      const res = await api.post("/api/user/delete-user", {});

      console.log("회원 탈퇴 성공", res);
      localStorage.removeItem("accessToken");
      return true;
    } catch (err) {
      console.log("회원 탈퇴 실패", err);
      return false;
    }
  },
};
