import React, { useState } from "react";
import CustomModal from "../components/Modals/CustomModal";
import ReportContent from "../components/Modals/ReportContent";

function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setModalOpen(true)}>메인페이지</div>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <ReportContent currentLocation="서울 강남구 역삼로 133" />
      </CustomModal>
    </div>
  );
}

export default MainPage;
