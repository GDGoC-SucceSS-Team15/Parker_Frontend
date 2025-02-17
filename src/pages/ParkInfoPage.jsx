import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import ParkInfoListItem from "../components/List/ParkInfoListItem";
import CustomModal from "../components/Modals/CustomModal";
import ParkInfoContent from "../components/Modals/ParkInfoContent";
import { parkingApi } from "../api/parkingSpace";
import { useDayType } from "../hooks/useDayType";
import useCurrentLocation from "../hooks/useCurrentLocation";

function ParkInfoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState([]); // 주차장 데이터 저장
  const [parkingSpacebyId, setParkingSpacebyId] = useState(); // 주차장 세부 정보 저장
  const daytype = useDayType(); // 오늘 날짜 daytype 반환 커스텀훅

  const { currentLocation, isLoading } = useCurrentLocation(); // 현재 위치 반환 커스텀훅

  useEffect(() => {
    const getParkingSpace = async () => {
      // 근처 주차장 조회
      const parkingData = await parkingApi.getNearby(currentLocation);
      // 근처 주차장 정보 저장
      setParkingSpaces(parkingData);
    };

    getParkingSpace();
  }, [currentLocation]);

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
