import React, { useState } from "react";
import { styled } from "styled-components";
import { SlEnvolope } from "react-icons/sl";
import { IoLockClosedOutline } from "react-icons/io5";
import logotxt from "../assets/logotxt.svg";
import SquareButton from "../components/Buttons/SquareButton";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/user";
import useNotificationStore from "../store/notificationStore.js";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { showNotification } = useNotificationStore();

  const handleLogin = async () => {
    try {
      const reqOk = await userApi.signIn(email, pw);
      if (reqOk) {
        showNotification("✅ 로그인 성공");
        navigate("/map");
      } else {
        showNotification("⚠️ 로그인 실패");
      }
    } catch (err) {
      console.log("로그인 실패", err);
      showNotification("⚠️ 로그인 실패");
    }
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Wrapper>
      <div style={{ width: "80%" }}>
        <LogoDiv>
          <img src={logotxt} alt="parkerlogo" />
        </LogoDiv>
        <LoginDiv>
          <FormDiv>
            <div className="form-flex">
              <SlEnvolope color="#808080" size={20} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
              />
            </div>
          </FormDiv>
          <FormDiv>
            <div className="form-flex">
              <IoLockClosedOutline color="#808080" size={20} />
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호"
                onKeyDown={(e) => activeEnter(e)}
              />
            </div>
          </FormDiv>
        </LoginDiv>
        <SquareButton buttonTxt={"로그인"} onClick={handleLogin} />
        <SignupBtn onClick={() => navigate("/signup")}>회원가입하기</SignupBtn>
      </div>
    </Wrapper>
  );
}

export default SignInPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 80%;
  }
`;
const LoginDiv = styled.div`
  margin-top: 45px;
  margin-bottom: 27px;
  gap: 10px;
  width: 100%;
`;
const FormDiv = styled.div`
  width: 100%;
  border: 1px solid #808080;
  border-radius: 7px;
  margin-bottom: 10px;
  .form-flex {
    display: flex;
    padding: 15px;
    gap: 7px;
    font-size: 20px;
    input {
      width: 100%;
      border: none;
      outline: none;
      &::placeholder {
        color: #808080;
      }
    }
  }
`;
const SignupBtn = styled.button`
  outline: none;
  border: none;
  color: #757f8c;
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
