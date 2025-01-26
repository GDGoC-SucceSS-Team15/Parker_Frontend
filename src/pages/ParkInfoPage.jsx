import React from "react";
import styled from "styled-components";
import defaultImg from "../assets/defaultImg.png";
import Header from "../components/Headers/Header";

function ParkInfoPage() {
  return (
    <Wrapper>
      <Header title="가까운 주차 공간" profileImg={defaultImg} />
    </Wrapper>
  );
}

export default ParkInfoPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
