import api from "./api";

// 카카오맵 API 로드 후, reverseGeocode를 사용하여 주소 정보 가져오기
const getRegionFromLocation = async (latitude, longitude) => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.coord2Address(longitude, latitude, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0].address;
        let sidoName = address.region_1depth_name;  // 시도
        const sigunguName = address.region_2depth_name;  // 시군구
        
        // 시도 이름 변환 
        const sidoMapping = {
          "서울": "서울특별시",
          "부산": "부산광역시",
          "대구": "대구광역시",
          "인천": "인천광역시",
          "광주": "광주광역시",
          "대전": "대전광역시",
          "울산": "울산광역시",
          "세종": "세종특별자치시",
          "경기": "경기도",
          "강원": "강원특별자치도",
          "충북": "충청북도",
          "충남": "충청남도",
          "전북": "전라북도",
          "전남": "전라남도",
          "경북": "경상북도",
          "경남": "경상남도",
          "제주": "제주특별자치도"
        };

        // 변환된 값이 존재하면 변경
        if (sidoMapping[sidoName]) {
          sidoName = sidoMapping[sidoName];
        }

        resolve({ sidoName, sigunguName });
      } else {
        reject('주소를 찾을 수 없습니다.');
      }
    });
  });
};

// 사용자의 현재 위치 근처 주정차 금지구역 리스트 조회
export const crackdownApi = {
  getNearby: async (currentLocation) => {
    try {
      if (!currentLocation) {
        return; // 위치 정보가 없으면 API 요청하지 않음
      }

      // 현재 위치에서 시도와 시군구 정보 가져오기
      const { sidoName, sigunguName } = await getRegionFromLocation(currentLocation.latitude, currentLocation.longitude);
      console.log("현재 위치 시도: ",sidoName);
      console.log("현재 위치 시군구: ",sigunguName);

      const res = await api.get("/api/parking-violation/nearby", {
        params: {
          sidoName,
          sigunguName,
        },
      });

      console.log("근처 주정차 금지구역 정보 조회 성공", res.data);
      const crackdownData = res.data.result;
      return crackdownData;
    } catch (err) {
      console.error("근처 주정차 금지구역 정보 조회 실패", err);
    }
  },
};
