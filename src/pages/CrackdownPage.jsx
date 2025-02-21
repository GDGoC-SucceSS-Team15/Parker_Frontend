import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";
import CrackdownListItem from "../components/List/CrackdownListItem";
import { crackdownApi } from "../api/crackdown"
import useCurrentLocation from "../hooks/useCurrentLocation";

function CrackdownPage() {
  const [Crackdowns, setCrackdowns] = useState([]); // 주차장 데이터 저장
  const { currentLocation, isLoading } = useCurrentLocation(); // 현재 위치 반환 커스텀훅

  useEffect(() => {
      const getCrackdown = async () => {
        // 근처 주정차 단속구역 조회
        const crackdownData = await crackdownApi.getNearby(currentLocation);
        // 근처 주정차 단속구역 저장
        setCrackdowns(crackdownData);
      };
  
      getCrackdown();
    }, [currentLocation]);

  return (
    <Wrapper>
      <Header title="불법 주정차 단속 구역" profileImg={defaultImg} />
      <ContentDiv>
        <SubTitle>현재 위치에서 가까운 순</SubTitle>
        {Crackdowns?.map((item) => (
          <CrackdownListItem
            key={item.id}
            sidoName={item.sidoName}
            sigunguName={item.sigunguName}
            roadName={item.roadName}
            detailedLocation={item.detailedLocation}
            managementPhoneNumber={item.managementPhoneNumber}
            weekdayTime={item.weekdayTime}
            saturdayTime={item.saturdayTime}
            holidayTime={item.holidayTime}
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
