import { useNavigate } from "react-router-dom";
import Parker_Logo from "./../assets/LogoImage/Parker_Logo.png"
import MyPage from "./../assets/Bottom_Button/BT_MyPage.png"
import VisitParking from "./../assets/Bottom_Button/BT_VisitParking.png"
import ReportPark from "./../assets/Bottom_Button/BT_ReportPark.png"
import ParkInfo from "./../assets/Bottom_Button/BT_ParkIfo.png"
import { styled } from "styled-components";


const BottomBar = () => { 
  const navigate = useNavigate();

  return (
    <BottombarDiv>
      <LeftGroup>
        <button onClick={() => navigate("/MyPage")} >
          <img src={MyPage} alt="MyPage" />
        </button>
        <button className="visit_parking">
          <img src={VisitParking} alt="VisitParking" />
        </button>
      </LeftGroup>
      <MainButton onClick={() => navigate("/MainPage")} >
        <img src={Parker_Logo} alt="Parker_Logo" />
      </MainButton>
      <RightGroup>
        <button onClick={() => navigate("/MyParkingPage")} >
          <img src={ReportPark} alt="ReportPark" />
        </button>
        <button onClick={() => navigate("/ParkInfoPage")} >
          <img src={ParkInfo} alt="ParkInforch_Button" />
        </button>
      </RightGroup>
    </BottombarDiv>
  );
}

export default BottomBar;

const BottombarDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 2px;
  margin: 15px 0;
  background-color: #ffffff;
  border-radius: 35px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  width: 80%;
  max-width: 600px;
  height: 30px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
`;

const LeftGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;

  button {
    background-color: #ffffff;
    margin: 0 10px;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;

    img {
      width: 30px;
    }
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding-right: 10px;

  button {
    background-color: #ffffff;
    margin: 0 10px;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;

    img {
      width: 30px;
    }
  }
`;

const MainButton = styled.button`
  position: absolute;
  background-color: #ffffff;
  border: none;
  width: 100px;
  height: 100px;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;

  img {
    padding-left: 14px;
    width: 80%;
  }
`;