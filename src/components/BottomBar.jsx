import { useNavigate } from "react-router-dom";
import Parker_Logo from "./../assets/LogoImage.svg"
import MyPage from "./../assets/Bottom_Button/BT_MyPage.svg"
import SavedParkingSpaces from "./../assets/Bottom_Button/BT_SavedParkingSpaces.svg"
import ParkingSpaces from "./../assets/Bottom_Button/BT_ParkingSpaces.svg"
import ParkInfo from "./../assets/Bottom_Button/BT_ParkInfo.svg"
import { styled } from "styled-components";


const BottomBar = () => { 
  const navigate = useNavigate();

  return (
    <BottombarDiv>
      <LeftGroup>
        <button onClick={() => navigate("/mypage")} >
          <img src={MyPage} alt="MyPage" />
        </button>
        <button className="saved-parking-spaces">
          <img src={SavedParkingSpaces} alt="SavedParkingSpaces" />
        </button>
      </LeftGroup>
      <MainButton onClick={() => navigate("/MainPage")} >
        <img src={Parker_Logo} alt="Parker_Logo" />
      </MainButton>
      <RightGroup>
        <button onClick={() => navigate("/parking-spaces")} >
          <img src={ParkingSpaces} alt="ParkingSpaces" />
        </button>
        <button onClick={() => navigate("/parkinginfo")} >
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
  justify-content: space-between;
  padding: 18px 2px;
  margin: 15px 0;
  background-color: #ffffff;
  border-radius: 35px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  width: 85%;
  max-width: 600px;
  height: 20px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
`;

const LeftGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-left: 2%;
  margin-right: 10px;

  button {
    background-color: #ffffff;
    margin: 0 5%;
    border: none;
    padding: 5%;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;


    img {
      width: 27px;
    }
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding-right: 2%;
  margin-left: 10%;

  button {
    background-color: #ffffff;
    margin: 0 5%;
    border: none;
    padding: 5%;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;

    img {
      width: 27px;
    }
  }
`;

const MainButton = styled.button`
  position: absolute;
  background-color: #ffffff;
  border: none;
  width: 85px;  
  height: 85px;
  top: -33px; 
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  z-index: 15;

  img {
    width: 60%;
  }
`;