import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import profileImg from "../assets/profile.svg";

function ProfileEditPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("김고수");

  const handleBack = () => {
    navigate(-1);
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
        <ProfileImage src={profileImg} alt="Profile" />

        <NicknameWrapper>
          <Label>닉네임</Label>
          <NicknameInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
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
  margin-bottom: 40px;
`;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  gap: 10px;
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
  border: 1px solid #ddd;
  border-radius: 7px;
  outline: none;

  &:focus {
    border-color: #888;
  }
`;
