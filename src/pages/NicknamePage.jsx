import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import profileImg from "../assets/profile.svg";

function ProfileEditPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(profileImg);
  const [nickname, setNickname] = useState("김고수");

  const handleBack = () => {
    navigate(-1);
  };

  const handleNicknameChange = async (newNickname) => {
    try {
      const response = await fetch("https://BE/api/update-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: newNickname }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("닉네임이 변경되었습니다.");
        setNickname(data.nickname);
      } else {
        alert(data.message || "닉네임 변경 실패");
      }
    } catch (error) {
      console.error("닉네임 변경 오류:", error);
      alert("닉네임 변경 오류");
    }
  };

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
      <HeaderWrapper>
        <BackButton onClick={handleBack}>
          <AiOutlineArrowLeft size={25} />
        </BackButton>
        <Title>프로필 수정</Title>
      </HeaderWrapper>
      <ProfileContainer>
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
        <NicknameWrapper>
          <Label>닉네임</Label>
          <NicknameInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <SubmitButton onClick={() => handleNicknameChange(nickname)}>
            변경
          </SubmitButton>{" "}
        </NicknameWrapper>
      </ProfileContainer>
    </Wrapper>
  );
}

export default ProfileEditPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;
  padding: 10px;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  width: 100%;
  max-width: 600px;
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
`;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  gap: 10px;
  align-self: center;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const NicknameInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border: 0.5px solid black;
  border-radius: 7px;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 450px;
  margin-top: 20px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #333;
  }
`;
