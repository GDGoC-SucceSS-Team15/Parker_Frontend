import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import MyParkingPage from "./pages/MyParkingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ParkInfoPage from "./pages/ParkInfoPage";

function App() {
  return (
    <div className="mobile-container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/parking-spaces" element={<MyParkingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/parkinginfo" element={<ParkInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
