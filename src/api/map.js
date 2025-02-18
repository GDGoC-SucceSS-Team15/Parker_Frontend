import api from "./api";

// 사용자의 현재 위치 근처 주차공간 & 단속카메라 위치 정보 조회 api
export const mapApi = {
  getAll: async (currentLocation) => {
    try {
      if (!currentLocation) {
        return; // 위치 정보가 없으면 API 요청하지 않음
      }

      const res = await api.get("/api/parker/v1/map-main", {
        params: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
      });

      console.log("주차장 & 단속카메라 위치 조회 성공", res);
      const allData = res.data.result;
      return allData;
    } catch (err) {
      console.error("주차장 & 단속카메라 위치 조회 실패", err);
    }
  },
  // 주차장 세부 정보 조회
  getPakringById: async (id, currentLocation) => {
    try {
      const res = await api.get(`/api/parker/parking-space/${id}`, {
        params: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
      });

      console.log("주차장 세부 정보 조회 성공", res);
      const parkingData = res.data.result;
      return parkingData;
    } catch (err) {
      console.log("주차장 세부 정보 조회 실패", err);
    }
  },
};
