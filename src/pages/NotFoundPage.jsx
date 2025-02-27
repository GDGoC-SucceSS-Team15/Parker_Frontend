import React from "react";
import styled from "styled-components";
import { MdError } from "react-icons/md";

const NotFoundPage = () => {
  return (
    <Wrapper>
      <MdError color="#161616" size={80} />
      <span>해당 페이지를 찾을 수 없습니다.</span>
    </Wrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-size: 15px;
    font-weight: 600;
    margin-top: 20px;
  }
`;
