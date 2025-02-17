import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import ParkInfoListItem from "../components/List/ParkInfoListItem";
import CustomModal from "../components/Modals/CustomModal";
import ParkInfoContent from "../components/Modals/ParkInfoContent";
import api from "../api/api";

// const parkingModalData = {
//   id: 1,
//   title: "역삼문화공원 제 1호 공영주차장",
//   division: "공영",
//   type: "노외",
//   compartment: "247",
//   opDays: "평일+토요일+공휴일",
//   weekday_start_time: "0:00",
//   weekday_end_time: "23:59",
//   saturday_start_time: "0:00",
//   saturday_end_time: "23:59",
//   holiday_start_time: "0:00",
//   holiday_end_time: "23:59",
//   base_parking_time: "5분",
//   base_parking_fee: "400원",
//   additional_unit_time: "5분",
//   additional_unit_fee: "400원",
//   management_agency: "강남구도시관리공단",
//   tel_number: "1544-3113",
// };

function ParkInfoPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [parkingSpaces, setParkingSpaces] = useState([]); // 주차장 데이터 저장

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const getParkingSpace = async () => {
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

        console.log(res.data);
        setParkingSpaces(res.data.result.parkingSpaceNearbyResponseList); // 주차장 데이터 저장
      } catch (err) {
        console.error("Error get parkingspace", err);
      }
    };

    getParkingSpace();
  }, [currentLocation]);

  // 내 위치 가져오기
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude }); // 현재 위치 설정
          setIsLoading(false); // 로딩 완료
        },
        () => {
          // 위치 정보가 없으면 기본값 (서울)
          setCurrentLocation({ latitude: 37.5665, longitude: 126.978 });
          setIsLoading(false);
        }
      );
    } else {
      // Geolocation 미지원 시 기본값 설정
      setCurrentLocation({ latitude: 37.5665, longitude: 126.978 });
      setIsLoading(false);
    }
  };

  const isHoliday = (date = new Date()) => {
    const holidays = [
      "01-01", // 신정
      "03-01", // 삼일절
      "05-05", // 어린이날
      "06-06", // 현충일
      "08-15", // 광복절
      "10-03", // 개천절
      "10-09", // 한글날
      "12-25", // 크리스마스
    ];

    // 음력 기반 공휴일 (설날, 추석)은 API 필요..
    const monthDay = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    if (holidays.includes(monthDay)) return "holidayTime";

    const day = date.getDay();
    if (day === 6) return "saturdayTime";
    if (day === 0) return "holidayTime"; // 일요일도 공휴일로 간주

    return "weekdayTime";
  };

  const daytype = isHoliday();

  const [parkingSpacebyId, setParkingSpacebyId] = useState();

  const handleModalOpen = async (id) => {
    try {
      const res = await api.get(`/api/parker/parking-space/nearby/${id}`);

      console.log("주차장 세부 정보 조회 성공", res);
      setParkingSpacebyId(res.data.result);
    } catch (error) {
      console.error("주차장 세부 정보 조회 실패", error);
    }
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <Header title="가까운 주차 공간" profileImg={defaultImg} />
      <ContentDiv>
        <SubTitle>현재 위치에서 가까운 순</SubTitle>
        {isLoading && <div>로딩 중...</div>}
        {parkingSpaces.map((item) => (
          <ParkInfoListItem
            key={item.id}
            title={item.parkingName}
            location={item.address}
            km={item.distance}
            time={item[daytype] === "00:00 ~ 00:00" ? "휴무" : item[daytype]}
            unit_time={item.baseParkingTime}
            unit_fee={item.baseParkingFee}
            onClick={() => handleModalOpen(item.id)}
          />
        ))}
      </ContentDiv>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <ParkInfoContent parkingModalData={parkingSpacebyId} />
      </CustomModal>
    </Wrapper>
  );
}

export default ParkInfoPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ContentDiv = styled.div`
  padding: 0 30px;
  overflow-y: auto;
  flex: 1;
  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubTitle = styled.div`
  color: #757f8c;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`;
