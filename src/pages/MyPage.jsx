import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import profileImg from "../assets/profile.svg";
import CustomModal from "../components/Modals/CustomModal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";

function ReportPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("https://BE/api/reports");
        setReports(response.data);
      } catch (error) {
        console.error("신고 내역 불러오기 실패:", error);
      }
    };

    fetchReports();
  }, []);

  const removeReport = async (id) => {
    try {
      await axios.delete(`https://BE/api/reports/${id}`);
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("신고 삭제 실패:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <BackButton onClick={handleBack}>
            <AiOutlineArrowLeft size={25} />
          </BackButton>
          <h2>신고 내역</h2>
          <ProfileImage src={profileImg} alt="profile" />
        </HeaderWrapper>
        <ReportList>
          {reports.map((report) => (
            <ReportItem key={report.id}>
              <ReportContent>
                <DateTimeWrapper>
                  <Date>{report.date}</Date>
                  <Time>{report.time}</Time>
                </DateTimeWrapper>
                <Divider />
                <Address>{report.address}</Address>
                <ApprovalStatus status={report.status}>
                  승인 여부 <span>{report.status}</span>
                </ApprovalStatus>
              </ReportContent>
              <DeleteButton onClick={() => removeReport(report.id)}>
                <Trash2 size={20} />
              </DeleteButton>
            </ReportItem>
          ))}
        </ReportList>

        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <ModalContainer>
            <IoMdCheckmarkCircleOutline size={60} color="#4CAF50" />
            <ModalTitle>신고 철회 완료</ModalTitle>
            <ModalText>신고하신 내역이 철회되었습니다.</ModalText>
          </ModalContainer>
        </CustomModal>
      </Content>
    </Wrapper>
  );
}

export default ReportPage;

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

const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const ReportItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 93%;
  position: relative;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 7px;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ReportContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
`;

const Date = styled.div`
  flex-grow: 1;
  text-align: left;
  font-size: 16px;
  padding: 5px;
`;

const Time = styled.div`
  flex-grow: 1;
  text-align: right;
  font-size: 16px;
  padding: 5px;
  color: rgb(100, 100, 100);
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
`;

const Address = styled.p`
  color: #000000;
  font-weight: bold;
  text-align: center;
  font-size: 17px;
`;

const ApprovalStatus = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: rgb(100, 100, 100);

  span {
    color: ${(props) =>
      props.status === "승인"
        ? "green"
        : props.status === "미승인"
        ? "red"
        : "orange"};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: -25px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const ModalText = styled.p`
  color: gray;
  font-size: 14px;
  margin-top: 5px;
`;
