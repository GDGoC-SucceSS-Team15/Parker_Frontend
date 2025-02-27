import api from "./api";

// 즐겨찾기 api
export const bookmarkApi = {
  toggleBookmark: async (id) => {
    try {
      const res = await api.post(`/api/bookmark/parking-space/${id}`);

      console.log("즐겨찾기 토글 성공", res);
      return true;
    } catch (err) {
      console.log("즐겨찾기 토글 실패", err);
      return false;
    }
  },
  getBookmark: async (sort) => {
    try {
      const res = await api.get("/api/bookmark/parking-space-list", {
        params: { sort: sort },
      });

      console.log("즐겨찾기 조회 성공", res);
      const bmData = res.data;
      return bmData;
    } catch (err) {
      console.log("즐겨찾기 조회 실패", err);
    }
  },
};
