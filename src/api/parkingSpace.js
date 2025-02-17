import api from "./api";

// 사용자의 현재 위치 근처 주차공간 리스트 조회
export const parkingApi = {
  getNearby: async (currentLocation) => {
    try {
      if (!currentLocation) {
        return; // 위치 정보가 없으면 API 요청하지 않음
      }

      const res = await api.get("/api/parker/parking-space/nearby", {
        params: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
      });

      console.log("근처 주차장 정보 조회 성공", res.data);
      const parkingData = res.data.result.parkingSpaceNearbyResponseList;
      return parkingData;
    } catch (err) {
      console.error("근처 주차장 정보 조회 실패", err);
    }
  },
  // 세부 정보 조회
  getNearbyId: async (id) => {
    try {
      const res = await api.get(`/api/parker/parking-space/nearby/${id}`);

      console.log("주차장 세부 정보 조회 성공", res);
      const parkingIdData = res.data.result;
      return parkingIdData;
    } catch (error) {
      console.error("주차장 세부 정보 조회 실패", error);
    }
  },
};
