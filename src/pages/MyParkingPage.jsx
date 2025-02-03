import React, { useState } from "react";
import { styled } from "styled-components";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import profileImg from "../assets/profile.svg";
import CustomModal from "../components/Modals/CustomModal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function MyParkingPage() {
  const navigate = useNavigate();
  const [parkingSpaces, setParkingSpaces] = useState([
    {
      id: 1,
      name: "주차장 1",
      address: "서울시 서초구 456",
      startTime: "11:00 am",
      endTime: "05:00 pm",
      paid: true,
      type: "실내주차장",
    },
    {
      id: 2,
      name: "주차장 2",
      address: "주소",
      startTime: "09:00 am",
      endTime: "06:00 pm",
      paid: false,
      type: "실외주차장",
    },
  ]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeParking = (id) => {
    setParkingSpaces((prevSpaces) =>
      prevSpaces.filter((space) => space.id !== id)
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <BackButton onClick={handleBack}>
            <AiOutlineArrowLeft size={25} />
          </BackButton>
          <h2>등록된 주차 공간</h2>
          <ProfileImage src={profileImg} alt="profile" />
        </HeaderWrapper>
        <ParkingList>
          {parkingSpaces.map((space) => (
            <ParkingItem key={space.id}>
              <ParkingContent>
                <ParkingNameWrapper>
                  <ParkingName>{space.name}</ParkingName>
                  <ParkingType>{space.type}</ParkingType>
                </ParkingNameWrapper>
                <Divider />
                <Address>{space.address}</Address>
                <TimeWrapper>
                  <TimeLabel>운영 시작 시간:</TimeLabel>
                  <TimeValue>{space.startTime}</TimeValue>
                </TimeWrapper>
                <TimeWrapper>
                  <TimeLabel>운영 종료 시간:</TimeLabel>
                  <TimeValue>{space.endTime}</TimeValue>
                </TimeWrapper>
                <Payments>
                  <PaymentsLabel>유무료 구분:</PaymentsLabel>
                  <PaymentStatus paid={space.paid}>
                    {space.paid ? "유료" : "무료"}
                  </PaymentStatus>
                </Payments>
              </ParkingContent>
              <DeleteButton onClick={() => removeParking(space.id)}>
                <Trash2 size={20} />
              </DeleteButton>
            </ParkingItem>
          ))}
        </ParkingList>

        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <ModalContainer>
            <IoMdCheckmarkCircleOutline size={60} color="#4CAF50" />
            <ModalTitle>삭제 완료</ModalTitle>
            <ModalText>저장 내역이 삭제되었습니다.</ModalText>
          </ModalContainer>
        </CustomModal>
      </Content>
    </Wrapper>
  );
}

export default MyParkingPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Content = styled.div`
  width: 85%;
  text-align: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

const BackButton = styled.div`
  cursor: pointer;
  color: #000000;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ParkingList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParkingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 93%;
  position: relative;
  padding: 15px;
  min-height: 110px;
  border: 1px solid #ddd;
  border-radius: 7px;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ParkingContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: -10px;
`;

const ParkingNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ParkingName = styled.h3`
  display: inline-block;
  font-size: 18px;
`;

const ParkingType = styled.span`
  font-size: 14px;
  color: #888;
  margin-left: 10px;
  background-color: #f1f1f1;
  padding: 2px 6px;
  border-radius: 5px;
  align-items: left;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-top: -10px;
`;

const Address = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
  font-size: 17px;
  margin-bottom: 0px;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 3px;
`;

const TimeLabel = styled.div`
  color: #777;
`;

const TimeValue = styled.div`
  color: #000;
`;

const Payments = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 3px;
  margin-bottom: -10px;
`;

const PaymentsLabel = styled.div`
  color: #777;
`;

const PaymentStatus = styled.p`
  font-weight: bold;
  color: ${(props) => (props.paid ? "red" : "green")};
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  background-color: #ff4d4d;
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.2);
`;

const ModalContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #666;
`;
