import React from "react";
import Modal from "react-modal";
import "../../styles/CustomModal.css";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

const customStyles = {
  overlay: {
    backgroundColor: " rgba(217, 217, 217, 0.7)",
    maxWidth: "600px",
    width: "100%",
    height: "100vh",
    zIndex: "998",
    position: "absolute",
    top: "0",
    left: "0",
    cursor: "pointer",
    margin: "0 auto",
  },
  content: {
    width: "300px",
    minHeight: "fit-content",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.108)",
    backgroundColor: "#ffffff",
    border: "none",
    justifyContent: "center",
    overflow: "auto",
    zIndex: "999",
  },
};

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <ModalContent>
        <BackBtn onClick={onRequestClose}>
          <IoIosClose size={30} color="#7A7A7A" />
        </BackBtn>
        <Content>{children}</Content>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

const ModalContent = styled.div`
  position: relative;
`;
const BackBtn = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  display: block;
  float: right;
  z-index: 1000;
`;
const Content = styled.div`
  padding: 10px;
`;
