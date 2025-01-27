import React from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import ParkInfoListItem from "../components/List/ParkInfoListItem";

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

function ParkInfoPage() {
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
          />
        ))}
      </ContentDiv>
    </Wrapper>
  );
}

export default ParkInfoPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
