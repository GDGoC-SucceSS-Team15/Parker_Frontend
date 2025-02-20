import React from "react";
import styled from "styled-components";
import { IoWarningOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";

const CrackdownListItem = ({
  km,
  min,
  sidoName,
  sigunguName,
  roadName,
  detailedLocation,
  managementPhoneNumber,
  weekdayTime,
  saturdayTime,
  holidayTime,
}) => {
  return (
    <ItemWrapper >
      <Location>
        <div className="Left">
          <div>
            <IoWarningOutline color="#F50000" size={30} />
          </div>
        </div>
        <div className="Right">
          <div className="title">{sidoName} {sigunguName} {roadName} {detailedLocation}</div>
        </div>
      </Location>
      <Line />
      <InfoRow>
        <FiClock size={18} />
        <InfoText>
          평일 단속 시간 <br />
          토요일 단속 시간 <br />
          공휴일 단속 시간 
        </InfoText>
        <InfoText style={{ marginLeft: 'auto' }}>
          {weekdayTime} <br />
          {saturdayTime} <br />
          {holidayTime}
        </InfoText>
      </InfoRow>
      <InfoRow>
        <BsTelephone size={18}/>
        <InfoText>문의 전화</InfoText>
        <InfoText style={{ marginLeft: 'auto' }}>
          {managementPhoneNumber}
        </InfoText>
      </InfoRow>
    </ItemWrapper>
  );
};

export default CrackdownListItem;

const ItemWrapper = styled.div`
  border-radius: 6px;
  box-shadow: 0px 8px 20px 0px rgba(122, 122, 123, 0.32);
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #eaeaea;
    box-shadow: 0px 8px 20px 0px rgba(47, 47, 48, 0.32);
  }
`;
const Location = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .Left {
    width: fit-content;
    font-size: 10px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    div {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .Right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .location {
      font-weight: bold;
      font-size: 12px;
      color: #757f8c;
      text-align: right;
    }
  }
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #a6aab4;
  margin: 15px 0;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin: 6px 0;
`;

const InfoText = styled.span`
  font-size: 14px;
`;
