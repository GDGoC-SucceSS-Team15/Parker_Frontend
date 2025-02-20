import api from "./api";

// 불법 주정차 신고 api
export const reportApi = {
  postReport: async (address, image) => {
    try {
      if (!address || !image) {
        return;
      }

      const res = await api.post(
        "/api/report",
        {
          address: address,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 업로드시 필수
          },
        }
      );

      console.log("불법 주정차 신고 성공", res);
    } catch (err) {
      console.error("불법 주정차 신고 실패", err);
    }
  },
  // 내 신고 목록 조회
  getMyReport: async () => {
    try {
      const res = await api.get(`/api/report/my`);

      console.log("내 신고 목록 조회 성공", res);
      const myReportData = res.data.result;
      return myReportData;
    } catch (err) {
      console.error("내 신고 목록 조회 실패", err);
    }
  },
  // 신고 철회
  delMyReport: async (reportId) => {
    try {
      const res = await api.delete(`/api/report/delete/${reportId}`);

      console.log("신고 철회 성공", res);
    } catch (err) {
      console.error("신고 철회 실패", err);
    }
  },
};
