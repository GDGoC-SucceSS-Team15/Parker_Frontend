import React from "react";
import styled from "styled-components";
import loadingGif from "../../assets/parker_loading.gif";

const Loading = () => {
  return (
    <Wrapper>
      <img src={loadingGif} alt="loading" />
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000086;

  img {
    width: 130px;
  }
`;
