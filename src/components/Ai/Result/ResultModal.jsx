import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const RESULT_DATA = {
  fireZone: {
    background: "#FF7373",
    text: '"소화전 구역,\n불법주정차 신고 대상입니다."',
    fine: "과태료 8~9만원",
    icon: "https://cdn-icons-png.flaticon.com/128/3477/3477085.png",
  },
  intersection: {
    background: "#FF7373",
    text: '"교차로 모퉁이,\n불법주정차 신고 대상입니다."',
    fine: "과태료 4~5만원",
    icon: "https://cdn-icons-png.flaticon.com/128/3477/3477085.png",
  },
  busStop: {
    background: "#FF7373",
    text: '"버스 정류장 인근,\n불법주정차 신고 대상입니다."',
    fine: "과태료 4~5만원",
    icon: "https://cdn-icons-png.flaticon.com/128/3477/3477085.png",
  },
  schoolZone: {
    background: "#FF7373",
    text: '"어린이 보호구역,\n불법주정차 신고 대상입니다."',
    fine: "과태료 12만원",
    icon: "https://cdn-icons-png.flaticon.com/128/3477/3477085.png",
  },
  yellowDoubleLine: {
    background: "#FF7373",
    text: '"황색 복선 구역,\n불법주정차 신고 대상입니다."',
    fine: "과태료 4~5만원",
    icon: "https://cdn-icons-png.flaticon.com/128/3477/3477085.png",
  },
  yellowLine: {
    background: "#FFECA1",
    text: '"황색 실선 구역,\n시간·요일에 따라 탄력적 주정차 가능."',
    fine: "주차 가능 여부는 현장 확인 필요",
    icon: "https://cdn-icons-png.flaticon.com/128/4285/4285398.png",
  },
  yellowDottedLine: {
    background: "#FFECA1",
    text: '"흰색 점선 구역,\n5분 이내 정차만 가능."',
    icon: "https://cdn-icons-png.flaticon.com/128/4285/4285398.png",
  },
  whiteLine: {
    background: "#C0FEC5",
    text: '"흰색 실선 구역,\n주정차 가능합니다."',
    icon: "https://cdn-icons-png.flaticon.com/128/5201/5201653.png",
  },
};

const ResultModal = ({ isOpen, onRequestClose, type = "fireZone" }) => {
  const data = RESULT_DATA[type] || RESULT_DATA.fireZone;

  return (
    isOpen && (
      <ModalOverlay onClick={onRequestClose}>
        <ModalContent
          background={data.background}
          onClick={(e) => e.stopPropagation()}
        >
          <BackBtn onClick={onRequestClose}>
            <IoIosArrowBack size={30} color="#7A7A7A" />
          </BackBtn>
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
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default ResultModal;

const ModalOverlay = styled.div`
  background-color: rgba(217, 217, 217, 0.7);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  min-height: 550px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  text-align: center;
  color: black;
  position: relative;
  padding: 15px;
`;

const BackBtn = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const FineIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const Text = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
  .title {
    font-size: 25px;
    font-weight: bold;
    white-space: pre-line;
  }
  .fine {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
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
  width: 80%;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #333;
  }
`;
