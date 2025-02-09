import React, { useState } from "react";
import { styled } from "styled-components";
import { SlEnvolope } from "react-icons/sl";
import { IoLockClosedOutline } from "react-icons/io5";
import logotxt from "../assets/logotxt.svg";
import SquareButton from "../components/Buttons/SquareButton";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/user/login", {
        email: email,
        password: pw,
      });

      console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
    } catch (err) {
      console.log("Error handle login", err);
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
  min-height: 100vh;
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
