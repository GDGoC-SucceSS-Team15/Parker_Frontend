import React, { useState } from "react";
import { styled } from "styled-components";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaSortAmountDown } from "react-icons/fa";
import profileImg from "../assets/profile.svg";

function BookmarkPage() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("latest");
  const [parkingSpaces, setParkingSpaces] = useState([
    {
      id: 1,
      name: "주차장 이름",
      address: "주소",
      call: "02-3220-1224",
      size: "72",
      paid: true,
      type: "주차장 종류",
    },
    {
      id: 2,
      name: "초안산근린공원주차장(구)",
      address: "도봉구 창동 24-0",
      call: "02-3220-1224",
      size: "72",
      paid: true,
      type: "노외 주차장",
    },
    {
      id: 3,
      name: "주차장 이름",
      address: "주소",
      call: "02-3220-1224",
      size: "72",
      paid: true,
      type: "공영 주차장",
    },
    {
      id: 4,
      name: "주차장 이름",
      address: "주소",
      call: "02-3220-1224",
      size: "72",
      paid: true,
      type: "주차장 종류",
    },
  ]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const removeParking = (id) => {
    setParkingSpaces((prevSpaces) =>
      prevSpaces.filter((space) => space.id !== id)
    );
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "latest" ? "oldest" : "latest"));
  };

  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <BackButton onClick={handleBack}>
            <AiOutlineArrowLeft size={25} />
          </BackButton>
          <h2>즐겨찾는 주차 공간</h2>
          <ProfileImage src={profileImg} alt="profile" />
        </HeaderWrapper>
        <SortButton onClick={toggleSortOrder}>
          <FaSortAmountDown size={16} />
          {sortOrder === "latest" ? "최신순" : "오래된순"}
        </SortButton>
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
                <DetailWrapper>
                  <Label>전화번호:</Label>
                  <Value>{space.call}</Value>
                </DetailWrapper>
                <DetailWrapper>
                  <Label>총 주차면:</Label>
                  <Value>{space.size}</Value>
                </DetailWrapper>
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
      </Content>
    </Wrapper>
  );
}

export default BookmarkPage;

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

const SortButton = styled.button`
  display: flex;
  margin-left: auto;
  align-items: center;
  background: #fff;
  border: 0.5px solid #ddd;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  position: fi;
  gap: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ParkingList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  white-space: nowrap;
  gap: 20px;
  padding-bottom: 10px;
  &::-webkit-scrollnar {
    display: none;
  }
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

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 3px;
`;

const Label = styled.div`
  color: #777;
`;

const Value = styled.div`
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
