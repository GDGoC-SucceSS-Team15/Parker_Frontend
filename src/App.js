import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ParkInfoPage from "./pages/ParkInfoPage";
import ReportPage from "./pages/ReportPage";
import NicknamePage from "./pages/NicknamePage";
import BookmarkPage from "./pages/BookmarkPage";
import TestPage from "./pages/TestPage";
import CrackdownPage from "./pages/CrackdownPage";
import NotFoundPage from "./pages/NotFoundPage";
import Notification from "./components/Notification/Notification";
import Loading from "./components/Loading/Loading";
import { useIsLoading } from "./store/loadingStore";

function App() {
  const { isLoading } = useIsLoading();
  return (
    <div className="mobile-container">
      <Notification />
      {isLoading && <Loading />}
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/map" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/parkinginfo" element={<ParkInfoPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/nickname-edit" element={<NicknamePage />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/crackdown" element={<CrackdownPage />} />
      </Routes>
    </div>
  );
}

export default App;
