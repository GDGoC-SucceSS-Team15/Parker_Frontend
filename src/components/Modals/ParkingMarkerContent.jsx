import React, { useState } from "react";
import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { PiClock } from "react-icons/pi";
import { BiDollarCircle } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";
import { bookmarkApi } from "../../api/bookmark";
import { FaStar } from "react-icons/fa";
import useCheckClosed from "../../hooks/useCheckClosed";

const ParkingMarkerContent = ({
  parkingId,
  bookmarked,
  parkingName,
  distance,
  weekdayTime,
  saturdayTime,
  holidayTime,
  baseParkingTime,
  baseParkingFee,
  onClose,
}) => {
  const [bmState, setBmState] = useState(bookmarked);
  const handleBookmark = async (id) => {
    bookmarkApi.toggleBookmark(id);
    setBmState(!bmState);
  };
  return (
    <Container>
      <Header>
        <BackBtn onClick={onClose}>
          <IoArrowBack size={25} />
        </BackBtn>
        <Title>{parkingName}</Title>
        <StarBtn onClick={() => handleBookmark(parkingId)}>
          {bmState ? <FaStar size={22} /> : <FaRegStar size={22} />}
        </StarBtn>
      </Header>

      <InfoRow>
        <LuMapPin size={18} />
        <InfoText>{distance}</InfoText>
      </InfoRow>

      <InfoRow>
        <PiClock size={18} />
        <InfoText>
          평일 운영 시간 <br />
          토요일 운영 시간 <br />
          공휴일 운영 시간
        </InfoText>
        <InfoText style={{ marginLeft: 'auto' }}>
          {useCheckClosed(weekdayTime)} <br />
          {useCheckClosed(saturdayTime)}
          <br />
          {useCheckClosed(holidayTime)} 
        </InfoText>
      </InfoRow>

      <InfoRow>
        <BiDollarCircle size={18} />
        <InfoText>
          (매 {baseParkingTime}분당) {baseParkingFee}원
        </InfoText>
      </InfoRow>

      <ReviewButton>리뷰</ReviewButton>
    </Container>
  );
};

export default ParkingMarkerContent;

const Container = styled.div`
  background: white;
  width: 100%;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  word-break: break-word;
  white-space: normal;
  max-width: 80%;
  margin: 0 auto 5px auto;
  display: block;
  //text-wrap: balance;
`;

const StarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
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

const ReviewButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 25px;
  background: black;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;
