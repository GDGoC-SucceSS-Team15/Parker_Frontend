import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineSetting,
  AiOutlineCamera,
} from "react-icons/ai";
import profileImg from "../assets/profile.svg";
import logoImg from "../assets/logoimg.svg";

function MyPage() {
  const navigate = useNavigate();
  const [showAllBadges, setShowAllBadges] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profileImg);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const badges = [
    { id: 1, text: "단속 구역 정보 마스터" },
    { id: 2, text: "동네 탐험가" },
    { id: 3, text: "도로의 수호자" },
    { id: 4, text: "베테랑 운전자" },
    { id: 5, text: "주차밭의 파수꾼" },
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await fetch("https://BE/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setSelectedImage(data.imageUrl);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }
  };

  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <BackButton onClick={handleBack}>
            <AiOutlineArrowLeft size={25} />
          </BackButton>
        </HeaderWrapper>
        <ProfileDiv>
          <ProfileLabel>
            <ProfileImage src={selectedImage || profileImg} alt="profile" />
            <CameraIcon>
              <AiOutlineCamera size={23} />
              <ImgFileInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </CameraIcon>
          </ProfileLabel>
          <ProfileInfo>
            <Nickname onClick={() => navigate("/nickname-edit")}>
              <span style={{ fontWeight: "bold" }}>김고수</span>님
            </Nickname>
          </ProfileInfo>
        </ProfileDiv>
        <BadgeDiv>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            보유 중인 배지
          </span>
          <MoreButton onClick={() => setShowAllBadges(!showAllBadges)}>
            {showAllBadges ? "접기" : "더보기"}
          </MoreButton>
          <BadgeWrapper>
            {(showAllBadges ? badges : badges.slice(0, 2)).map((badge) => (
              <Badge key={badge.id}>
                <LogoImage src={logoImg} alt="badge logo" />
                {badge.text}
              </Badge>
            ))}
          </BadgeWrapper>
        </BadgeDiv>
        <ServiceDiv>
          <span style={{ fontWeight: "bold", fontSize: "22px" }}>서비스</span>
          <Service onClick={() => navigate("/nickname-edit")}>
            <AiOutlineSetting size={30} />
            개인 정보 수정
          </Service>
          <Service onClick={() => navigate("/parking-spaces")}>
            <AiOutlineSetting size={30} />
            개인 설정 관리
          </Service>
          <Service onClick={() => navigate("/bookmark")}>
            <AiOutlineSetting size={30} />
            활동 기록
          </Service>
        </ServiceDiv>
      </Content>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Content = styled.div`
  width: 85%;
  padding-top: 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const BackButton = styled.div`
  cursor: pointer;
  color: #000000;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #ccc;
`;

const ProfileLabel = styled.label`
  position: relative;
  cursor: pointer;
`;

const ImgFileInput = styled.input`
  display: none;
`;

const CameraIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
`;

const LogoImage = styled.img`
  width: 20px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Nickname = styled.h2`
  font-size: 25px;
  cursor: pointer;
  font-weight: normal;
  margin-left: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const MoreButton = styled.button`
  display: flex;
  justify-content: right;
  background: none;
  border: none;
  font-size: 18px;
  color: rgb(115, 115, 115);
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const BadgeDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ServiceDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
`;

const Service = styled.div`
  display: flex;
  padding: 10px 15px;
  cursor: pointer;
  text-align: left;
  font-size: 18px;
  align-items: center;
  gap: 15px;
`;
