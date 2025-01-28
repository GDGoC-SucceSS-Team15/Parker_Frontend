import React, { useState } from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import ParkInfoListItem from "../components/List/ParkInfoListItem";
import CustomModal from "../components/Modals/CustomModal";
import ParkInfoContent from "../components/Modals/ParkInfoContent";

const parkingData = [
  {
    id: 1,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
  {
    id: 2,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
  {
    id: 3,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
  {
    id: 4,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
  {
    id: 5,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
  {
    id: 6,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
  {
    id: 7,
    title: "역삼문화공원 제1호 공영주차장",
    location: "서울특별시 강남구 역삼동 635-1",
    km: "2.1",
    min: "11",
    start_time: "0:00",
    end_time: "24:00",
    unit_time: "5",
    unit_fee: "300",
  },
];

const parkingModalData = {
  id: 1,
  title: "역삼문화공원 제 1호 공영주차장",
  division: "공영",
  type: "노외",
  compartment: "247",
  opDays: "평일+토요일+공휴일",
  weekday_start_time: "0:00",
  weekday_end_time: "23:59",
  saturday_start_time: "0:00",
  saturday_end_time: "23:59",
  holiday_start_time: "0:00",
  holiday_end_time: "23:59",
  base_parking_time: "5분",
  base_parking_fee: "400원",
  additional_unit_time: "5분",
  additional_unit_fee: "400원",
  management_agency: "강남구도시관리공단",
  tel_number: "1544-3113",
};

function ParkInfoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Wrapper>
      <Header title="가까운 주차 공간" profileImg={defaultImg} />
      <ContentDiv>
        <SubTitle>현재 위치에서 가까운 순</SubTitle>
        {parkingData.map((item) => (
          <ParkInfoListItem
            key={item.id}
            title={item.title}
            location={item.location}
            km={item.km}
            min={item.min}
            start_time={item.start_time}
            end_time={item.end_time}
            unit_time={item.unit_time}
            unit_fee={item.unit_fee}
            onClick={() => setModalOpen(true)}
          />
        ))}
      </ContentDiv>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <ParkInfoContent parkingModalData={parkingModalData} />
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
`;

const SubTitle = styled.div`
  color: #757f8c;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`;
