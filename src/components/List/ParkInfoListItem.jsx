import React from "react";
import styled from "styled-components";
import { LuSquareParking } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { AiOutlineDollar } from "react-icons/ai";

const ParkInfoListItem = ({
  km,
  min,
  title,
  location,
  start_time,
  end_time,
  unit_fee,
  unit_time,
  onClick,
}) => {
  return (
    <ItemWrapper onClick={onClick}>
      <Location>
        <div className="Left">
          <div>
            <LuSquareParking color="#015900" size={30} />
          </div>
          <div>
            {km}km / {min}분
          </div>
        </div>
        <div className="Right">
          <div className="title">{title}</div>
          <div className="location">{location}</div>
        </div>
      </Location>
      <Line />
      <TimeFee>
        <div className="time">
          <FiClock />
          <div>
            운영시간 : {start_time} ~ {end_time}
          </div>
        </div>
        <div className="fee">
          <AiOutlineDollar />
          <div>
            주차요금 매 {unit_time}분당 {unit_fee}원
          </div>
        </div>
      </TimeFee>
    </ItemWrapper>
  );
};

export default ParkInfoListItem;

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
      text-align: right;
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

const TimeFee = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 700;
  .time {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .fee {
    display: flex;
    gap: 3px;
    align-items: center;
  }
`;
