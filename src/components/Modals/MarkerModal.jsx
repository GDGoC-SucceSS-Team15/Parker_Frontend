import React from "react";
import Modal from "react-modal";
import "../../styles/CustomModal.css";
import styled from "styled-components";

const customStyles = {
  overlay: {
    backgroundColor: " rgba(217, 217, 217, 0)",
    maxWidth: "600px",
    width: "100%",
    height: "100vh",
    zIndex: "998",
    position: "fixed",
    top: "0",
    left: "0",
    display: "flex",
    margin: "0 auto",
    pointerEvents: "none",
    alignItems: "center",
  },
  content: {
    width: "80%",
    minHeight: "fit-content",
    position: "absolute",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.108)",
    backgroundColor: "#ffffff",
    border: "none",
    justifyContent: "center",
    overflow: "auto",
    zIndex: "999",
    pointerEvents: "auto",
  },
};

const MarkerModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <ModalContent>
        <Content>{children}</Content>
      </ModalContent>
    </Modal>
  );
};

export default MarkerModal;

const ModalContent = styled.div`
  position: relative;
`;
const Content = styled.div`
  padding: 10px;
`;
