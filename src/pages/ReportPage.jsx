import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Trash2 } from "lucide-react";
import defaultImg from "../assets/defaultImg.png";
import CustomModal from "../components/Modals/CustomModal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { reportApi } from "../api/report";
import Header from "../components/Headers/Header";
import useNotificationStore from "../store/notificationStore";

function ReportPage() {
  const [reports, setReports] = useState([]);

  const { showNotification } = useNotificationStore();

  const getReport = async () => {
    const reportData = await reportApi.getMyReport();
    setReports(reportData);
  };

  useEffect(() => {
    getReport();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeReport = async (id) => {
    try {
      const reqOk = await reportApi.delMyReport(id);
      if (reqOk) {
        setIsModalOpen(true);
        showNotification("🔄 신고가 철회되었습니다.");
      } else {
        showNotification("⚠️ 신고 철회 실패");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getReport();
  };

  return (
    <Wrapper>
      <Content>
        <Header title="신고 내역" profileImg={defaultImg} />
        <ReportList>
          {reports?.length === 0 && (
            <div className="nodata">신고 내역이 없습니다.</div>
          )}
          {reports?.map((report) => (
            <ReportItem key={report.id}>
              <ReportContent>
                <DateTimeWrapper>
                  <Date>{report.createdDate}</Date>
                  <Time>{report.createdTime}</Time>
                </DateTimeWrapper>
                <Divider />
                <Address>{report.address}</Address>
                <ApprovalStatus status={report.status}>
                  승인 여부 <span>{report.approvalStatus}</span>
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
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  overflow-y: auto;

  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  justify-content: center;

  .nodata {
    color: #898989;
    font-size: 13px;
    font-weight: 600;
  }
`;

const ReportItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 20px auto;
  position: relative;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 7px;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
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

// const Date = styled.span`
//   font-size: 14px;
//   color: #555;
// `;

// const Time = styled.span`
//   font-size: 14px;
//   color: #555;
// `;

// const Divider = styled.hr`
//   border: 0;
//   border-top: 1px solid #ddd;
//   margin: 10px 0;
// `;

// const Address = styled.p`
//   font-size: 14px;
//   color: #555;
// `;

// const ApprovalStatus = styled.div`
//   font-size: 14px;
//   color: ${(props) =>
//     props.status === "승인"
//       ? "#4CAF50"
//       : props.status === "미승인"
//       ? "#FF4D4D"
//       : "#FFC107"};
//   span {
//     font-weight: bold;
//   }`;

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
  text-align: right;
  width: 100%;

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
