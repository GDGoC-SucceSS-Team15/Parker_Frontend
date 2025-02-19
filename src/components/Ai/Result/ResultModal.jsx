import React from "react";
import CustomModal from "../../Modals/CustomModal";
import styled from "styled-components";

const RESULT_DATA = {
  fireZone: {
    background: "#FF7373",
    text: "소화전 구역,\n불법주정차 신고 대상입니다.",
    fine: "과태료 8~9만원",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  intersection: {
    background: "#FF7373",
    text: "교차로 모퉁이,\n불법주정차 신고 대상입니다.",
    fine: "과태료 4~5만원",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  busStop: {
    background: "#FF7373",
    text: "버스 정류장 인근,\n불법주정차 신고 대상입니다.",
    fine: "과태료 4~5만원",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  schoolZone: {
    background: "#FF7373",
    text: "어린이 보호구역,\n불법주정차 신고 대상입니다.",
    fine: "과태료 12만원",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  yellowDoubleLine: {
    background: "#FF7373",
    text: "황색 복선 구역,\n불법주정차 신고 대상입니다.",
    fine: "과태료 4~5만원",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  yellowLine: {
    background: "#FFECA1",
    text: "황색 실선 구역,\n시간·요일에 따라 탄력적 주정차 가능.",
    fine: "주차 가능 여부는 현장 확인 필요",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  yellowDottedLine: {
    background: "#FFECA1",
    text: "흰색 점선 구역,\n5분 이내 정차만 가능.",
    fine: "과태료 3만원",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
  whiteLine: {
    background: "#C0FEC5",
    text: "흰색 실선 구역,\n주정차 가능합니다.",
    fine: "주차 가능",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
  },
};

const Result = ({ isOpen, onRequestClose, type = "fireZone" }) => {
  const data = RESULT_DATA[type] || RESULT_DATA.fireZone;

  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Overlay>
        <Wrapper background={data.background}>
          <Icon src={data.icon} alt="No Parking Icon" />
          <Text>
            <div className="title">{data.text}</div>
            <div className="fine">
              <FineIcon
                src="https://cdn-icons-png.flaticon.com/128/1828/1828970.png"
                alt="Fine Icon"
              />
              {data.fine}
            </div>
          </Text>
          <ConfirmBtn onClick={onRequestClose}>근처 주차장 찾기</ConfirmBtn>
        </Wrapper>
      </Overlay>
    </CustomModal>
  );
};

export default Result;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 350px;
  background-color: ${(props) => props.background};
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  color: white;
  position: relative;
`;

const Icon = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
`;

const FineIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const Text = styled.div`
  text-align: center;
  .title {
    font-size: 18px;
    font-weight: bold;
    white-space: pre-line;
    margin-bottom: 10px;
  }
  .fine {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ConfirmBtn = styled.button`
  border: none;
  outline: none;
  background-color: black;
  color: white;
  border-radius: 30px;
  padding: 15px;
  text-align: center;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #333;
  }
`;
