import React from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import CrackdownListItem from "../components/List/CrackdownListItem";

const parkingData = [
  {
    id: 1,
    km: "2.1",
    min: "11",
    sidoName: "경기도",
    sigunguName: "가평군",
    roadName: "오리나무길",
    detailedLocation: "가평읍 홍농종묘앞",
    managementPhoneNumber: "031-580-2075",
    weekdayStartTime: "08:00",
    weekdayEndTime: "19:00",
    saturdayStartTime: "00:00",
    saturdayEndTime: "00:00",
    holidayStartTime: "00:00",
    holidayEndTime: "00:00"
  },
];

function CrackdownPage() {
  return (
    <Wrapper>
      <Header title="불법 주정차 단속 구역" profileImg={defaultImg} />
      <ContentDiv>
        <SubTitle>현재 위치에서 가까운 순</SubTitle>
        {parkingData.map((item) => (
          <CrackdownListItem
            key={item.id}
            sidoName={item.sidoName}
            sigunguName={item.sigunguName}
            roadName={item.roadName}
            detailedLocation={item.detailedLocation}
            managementPhoneNumber={item.managementPhoneNumber}
            weekdayStartTime={item.weekdayStartTime}
            weekdayEndTime={item.weekdayEndTime}
            saturdayStartTime={item.saturdayStartTime}
            saturdayEndTime={item.saturdayEndTime}
            holidayStartTime={item.holidayStartTime}
            holidayEndTime={item.holidayEndTime}
          />
        ))}
      </ContentDiv>
    </Wrapper>
  );
}

export default CrackdownPage;

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
