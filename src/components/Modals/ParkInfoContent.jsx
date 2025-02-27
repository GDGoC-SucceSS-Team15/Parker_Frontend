import React from "react";
import styled from "styled-components";

const ParkInfoContent = ({ parkingModalData }) => {
  const formattedTitle =
    parkingModalData.parkingName.slice(-3) === "주차장"
      ? parkingModalData.parkingName
      : `${parkingModalData.parkingName} 주차장`;
  return (
    <ContentWrapper>
      <div className="parking_name">{formattedTitle} </div>
      <Line />
      <div className="title">주차장 구분 / 유형 / 구획수</div>
      <div className="info">
        주차장 구분 : {parkingModalData.parkingUsage} <br />
        주차장 유형 : {parkingModalData.parkingType} <br />
        주차장 구획수 : {parkingModalData.totalParkingSpaces}
      </div>
      <div className="title">운영요일</div>
      <div className="info">{parkingModalData.operatingDays}</div>
      <div className="title">운영시간</div>
      <div className="info">
        평일:{" "}
        {parkingModalData.weekdayTime === "00:00 ~ 00:00"
          ? "휴무"
          : parkingModalData.weekdayTime}
        <br />
        토요일:{" "}
        {parkingModalData.saturdayTime === "00:00 ~ 00:00"
          ? "휴무"
          : parkingModalData.saturdayTime}{" "}
        <br />
        공휴일:{" "}
        {parkingModalData.holidayTime === "00:00 ~ 00:00"
          ? "휴무"
          : parkingModalData.saturdayTime}
      </div>
      <div className="title">주차 기본 시간 / 기본 요금 / 추가 요금</div>
      <div className="info">
        기본 시간: {parkingModalData.baseParkingTime}분 <br />
        기본 요금: {parkingModalData.baseParkingFee}원 <br />
        추가 요금: {parkingModalData.additionalUnitFee}원
      </div>
      <div className="title">관리기관명 / 전화번호</div>
      <div className="info">
        관리기관명: {parkingModalData.managingAgency} <br />
        전화번호: {parkingModalData.phoneNumber}
      </div>
    </ContentWrapper>
  );
};

export default ParkInfoContent;

const ContentWrapper = styled.div`
  .parking_name {
    font-size: 15px;
    font-weight: bold;
  }
  .title {
    font-size: 12px;
    font-weight: 700;
  }
  .info {
    font-size: 10px;
    color: #757f8c;
    font-weight: 700;
    padding-left: 15px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;
const Line = styled.hr`
  border: none;
  border-top: 1px solid #a6aab4;
  margin: 15px 0;
`;
