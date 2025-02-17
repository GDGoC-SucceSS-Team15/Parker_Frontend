import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import ParkInfoListItem from "../components/List/ParkInfoListItem";
import CustomModal from "../components/Modals/CustomModal";
import ParkInfoContent from "../components/Modals/ParkInfoContent";
import { parkingApi } from "../api/parkingSpace";

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
      const parkingData = await parkingApi.getNearby(currentLocation);
      setParkingSpaces(parkingData);
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
    //주자장 세부 정보 조회
    const parkingIdData = await parkingApi.getNearbyId(id);
    // 주차장 세부 정보 저장
    setParkingSpacebyId(parkingIdData);

    setModalOpen(true);
  };

  return (
    <Wrapper>
      <Header title="가까운 주차 공간" profileImg={defaultImg} />
      <ContentDiv>
        <SubTitle>현재 위치에서 가까운 순</SubTitle>
        {isLoading && <div>로딩 중...</div>}
        {parkingSpaces?.map((item) => (
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
