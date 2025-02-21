import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import defaultImg from "./../assets/defaultImg.png"
import Parker_Logo from "./../assets/LogoImage.svg"
import MyPage from "./../assets/MenuButton/Menu_MyPage.svg"
import Crackdown from "./../assets/MenuButton/Menu_Crackdown.svg"
import SavedParkingSpaces from "./../assets/MenuButton/Menu_SavedParkingSpaces.svg"
import Parking_Info from "./../assets/MenuButton/Menu_ParkInfo.svg"
import profileImg from "../assets/profile.svg";
import { CiSettings } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import mypageApi from "../api/mypage";

const Menu = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    nickname: "",
    profileImageUrl: profileImg,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await mypageApi.getUserInfo();
        if (response.isSuccess) {
          setUserInfo(response.result);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return(
    <MenuDiv>
      <LogoDiv>
        <img src={Parker_Logo} alt="parkerLogo" />
      </LogoDiv>

      <ProfileDiv onClick={() => navigate("/mypage")}>
        <img 
          src={userInfo.profileImageUrl || profileImg}
          alt="profile"
        />
        <Nickname onClick={() => navigate("/nickname-edit")}>
          <span style={{ fontWeight: "bold" }}>
            {userInfo.nickname || userInfo.name || "김고수"}
          </span>
          <span style={{ fontSize: "0.8em", color: "gray" }}> 님</span>
        </Nickname>
      </ProfileDiv>

      <PageDiv>
        <button onClick={() => navigate("/mypage")}>
          <img src={MyPage} alt="myPage" />마이페이지
        </button>
        <button onClick={() => navigate("/crackdown")}>
          <img src={Crackdown} alt="crackdown" />주정차 금지구역
        </button>
        <button onClick={() => navigate("/bookmark")}>
          <img src={SavedParkingSpaces} alt="SavedParkingSpaces" />즐겨찾는 주차공간
        </button>
        <button onClick={() => navigate("/parkinginfo")}>
          <img src={Parking_Info} alt="parkingInfo" />주차 정보 페이지
        </button>
      </PageDiv>

      <EtcDiv>
        <button>
          <CiSettings color="#3a3a3a" size={25} style={{ marginRight: "8px" }} />설정
        </button>
        <button>
          <IoInformationCircleOutline color="#3a3a3a" size={24} style={{ marginRight: "8px" }} />더보기
        </button>
        <button onClick={() => navigate("/signin")}>
          <IoReturnDownBackOutline color="#3a3a3a" size={21} style={{ marginRight: "8px" }} />로그아웃
        </button>
        <button>
          <IoShareSocialOutline color="#3a3a3a" size={21} style={{ marginRight: "8px" }} />공유
        </button>
      </EtcDiv>
    </MenuDiv>
  )
}

export default Menu;

const MenuDiv = styled.div`
  width: 65%;
  min-height: 100vh;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin: 0;
  z-index: 999;
  overflow: auto;
`;

const LogoDiv = styled.div`
  padding: 30px;
  display: flex;
  justify-content: flex-start;

  img {
    width: 20%;
  }
`;

const ProfileDiv = styled.div`
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10%;

  img {
    width: 50px;
    border-radius: 50%;
    margin-bottom: 13px;
  }
`;

const Nickname = styled.div`
  font-size: 19px;
  cursor: pointer;
  font-weight: normal;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  } 
`

const PageDiv = styled.div`
  border-bottom: 2px solid #ddd;
  padding: 10px 30px;
  padding-bottom: 20px;

  button {
    border: none;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px -3px;
    padding: 10px;
    background-color: #ffffff;
    font-weight: bold;
    color: #9c2d2d;
    cursor: pointer;
    transition: transform 0.2s;

    img {
      width: 20px;
      margin-right: 10px;
    }

    &:hover {
      transform: translateX(10px);
    }
  }
`;

const EtcDiv = styled.div`
  padding: 10px 30px;

  button {
    border: none;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px -7px;
    padding: 7px;
    background-color: #ffffff;
    font-weight: bold;
    color: #3a3a3a;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }
  }
`;

