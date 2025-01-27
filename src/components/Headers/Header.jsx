import React from "react";
import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = ({ title, profileImg }) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <div className="header-div">
        <BackBtn onClick={() => navigate(-1)}>
          <IoArrowBack size={35} color="#000000" />
        </BackBtn>
        <Title>{title}</Title>
        <Profile onClick={() => navigate("/mypage")}>
          <img src={profileImg} alt="profileImg" />
        </Profile>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: calc(100% - 60px);
  position: sticky;
  top: 0;
  background-color: white;
  .header-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
  }
`;

const BackBtn = styled.div`
  cursor: pointer;
  width: fit-content;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Profile = styled.div`
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
    border: 3px solid #ececfb;
    border-radius: 50%;
    object-fit: cover;
  }
`;
