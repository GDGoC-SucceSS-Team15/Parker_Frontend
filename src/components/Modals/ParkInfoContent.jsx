import React from "react";
import styled from "styled-components";

const ParkInfoContent = ({ parkingModalData }) => {
  return (
    <ContentWrapper>
      <div className="parking_name">{parkingModalData.parkingName}</div>
      <Line />
      <div className="title">주차장 구분 / 유형 / 구획수</div>
      <div className="info">
        주차장 구분 : {parkingModalData.division} <br />
        주차장 유형 : {parkingModalData.type} <br />
        주차장 구획수 : {parkingModalData.compartment}
      </div>
      <div className="title">운영요일</div>
      <div className="info">{parkingModalData.opDays}</div>
      <div className="title">운영시간</div>
      <div className="info">
        평일 {parkingModalData.weekday_start_time} ~{" "}
        {parkingModalData.weekday_end_time} <br />
        토요일 {parkingModalData.saturday_start_time} ~{" "}
        {parkingModalData.saturday_end_time} <br />
        공휴일 {parkingModalData.holiday_start_time} ~{" "}
        {parkingModalData.holiday_end_time}
      </div>
      <div className="title">주차 기본 시간 / 기본 요금 / 추가 요금</div>
      <div className="info">
        기본 시간 {parkingModalData.base_parking_time} <br />
        기본 요금 {parkingModalData.base_parking_fee} <br />
        추가 요금 {parkingModalData.additional_unit_time} 당{" "}
        {parkingModalData.additional_unit_fee}
      </div>
      <div className="title">관리기관명 / 전화번호</div>
      <div className="info">
        관리기관명 {parkingModalData.management_agency} <br />
        전화번호 {parkingModalData.tel_number}
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
