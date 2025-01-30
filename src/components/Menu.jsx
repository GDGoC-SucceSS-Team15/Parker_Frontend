import { styled } from "styled-components";
import Parker_Logo from "./../assets/LogoImage.svg"
import My_Page from "./../assets/MenuButton/Menu_MyPage.svg"
import SavedParkingSpaces from "./../assets/MenuButton/Menu_SavedParkingSpaces.svg"
import ParkingSpaces from "./../assets/MenuButton/Menu_ParkingSpaces.svg"
import Parking_Info from "./../assets/MenuButton/Menu_ParkInfo.svg"
import Setting from "./../assets/MenuButton/Menu_Setting.png"
import More from "./../assets/MenuButton/Menu_More.png"
import Log_Out from "./../assets/MenuButton/Menu_Logout.png"
import Sharing from "./../assets/MenuButton/Menu_Sharing.png"
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return(
    <MenuDiv>
      <LogoDiv>
        <img src={Parker_Logo} alt="parkerLogo" />
      </LogoDiv>

      <ProfileDiv>
        <img src={My_Page} alt="profileImage"/>
        <div>이름</div> 
      </ProfileDiv>

      <PageDiv>
        <button onClick={() => navigate("/mypage")}>
          <img src={My_Page} alt="myPage" />마이페이지
        </button>
        <button>
          <img src={SavedParkingSpaces} alt="SavedParkingSpaces" />즐겨찾는 주차공간
        </button>
        <button onClick={() => navigate("/parking-spaces")}>
          <img src={ParkingSpaces} alt="ParkingSpaces" />등록한 주차공간
        </button>
        <button onClick={() => navigate("/parkinginfo")}>
          <img src={Parking_Info} alt="parkingInfo" />주차 정보 페이지
        </button>
      </PageDiv>

      <EtcDiv>
        <button>
          <img src={Setting} alt="Settings" />설정
        </button>
        <button>
          <img src={More} alt="moreOptions" />더보기
        </button>
        <button onClick={() => navigate("/signin")}>
          <img src={Log_Out} alt="logOut" />로그아웃
        </button>
        <button>
          <img src={Sharing} alt="Sharing" />공유
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
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin: 0;
  z-index: 30;
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
    width: 60px;
    border-radius: 50%;
    margin-bottom: 13px;
  }

  div {
    font-size: 1.2rem;
  }
`;

const PageDiv = styled.div`
  border-bottom: 2px solid #ddd;
  padding: 20px 30px;
  padding-bottom: 30px;

  button {
    border: none;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px 0;
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
  padding: 20px 30px;

  button {
    border: none;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 10px 0;
    padding: 10px;
    background-color: #ffffff;
    font-weight: bold;
    color: #3a3a3a;
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

