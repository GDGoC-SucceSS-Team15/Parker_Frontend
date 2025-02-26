import React, { useState } from "react";
import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsPersonVcard } from "react-icons/bs";
import { SlEnvolope } from "react-icons/sl";
import { PiPhone } from "react-icons/pi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import SquareButton from "../components/Buttons/SquareButton";
import { userApi } from "../api/user";
import useNotificationStore from "../store/notificationStore.js";

function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 현재 단계 상태
  const [validate, setValidate] = useState({
    name: true,
    email: true,
    phoneNumber: true,
    password: true,
    pwcheck: true,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    pwcheck: "",
  });

  const { showNotification } = useNotificationStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 유효성 검사
    let isValid = false;

    if (!value.trim()) {
      // 입력값이 비어 있으면 유효하지 않음
      isValid = false;
    } else if (name === "name") {
      isValid = value.trim().length > 0; // 이름: 공백 여부만 검사
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (name === "phoneNumber") {
      const phoneRegex = /^\d{10,11}$/; // 전화번호: 숫자 10~11자
      isValid = phoneRegex.test(value);
    } else if (name === "password") {
      const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      isValid = pwRegex.test(value);
    } else if (name === "pwcheck") {
      isValid = value === formData.password; // 비밀번호 확인: 비밀번호와 일치 여부
    }

    // validate 상태 업데이트
    setValidate((prev) => ({
      ...prev,
      [name]: !isValid, // true = 유효하지 않음
    }));
  };

  const handleSubmit = async () => {
    console.log("validate", validate);
    const isValid = Object.values(validate).every((value) => value === false);

    if (isValid) {
      console.log(formData);
      const reqOk = await userApi.signUp(formData);
      if (reqOk) {
        showNotification("✨ 회원가입 성공");
        setStep(5);
      } else {
        showNotification("⚠️ 회원가입에 실패했습니다.");
      }
    } else {
      showNotification(
        "⚠️ 올바르지 않은 형식이 포함되거나 작성하지 않은 필드가 있습니다."
      );
      console.log(formData);
    }
  };

  // 단계별 컴포넌트
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step>
            <BackBtn onClick={() => navigate(-1)}>
              <IoArrowBack size={35} color="#000000" />
            </BackBtn>
            <h2>이름을 입력해주세요</h2>
            <div className="title-div">
              <BsPersonVcard size={17} />
              <span>이름</span>
            </div>
            <div className="input-div">
              <input
                type="text"
                placeholder="예) 홍길동"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && setStep(2)}
              />
            </div>
            <SquareButton onClick={() => setStep(2)} buttonTxt={"다음"} />
          </Step>
        );
      case 2:
        return (
          <Step>
            <BackBtn onClick={() => setStep(1)}>
              <IoArrowBack size={35} color="#000000" />
            </BackBtn>
            <h2>이메일을 입력해주세요</h2>
            <div className="title-div">
              <SlEnvolope size={17} />
              <span>이메일</span>
            </div>
            <div className="input-div">
              <input
                type="email"
                placeholder="예) abc@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && setStep(3)}
              />
              {formData.email && validate.email && (
                <ErrMsg>이메일 형식이 올바르지 않습니다.</ErrMsg>
              )}
            </div>
            <SquareButton onClick={() => setStep(3)} buttonTxt={"다음"} />
          </Step>
        );
      case 3:
        return (
          <Step>
            <BackBtn onClick={() => setStep(2)}>
              <IoArrowBack size={35} color="#000000" />
            </BackBtn>
            <h2>전화번호를 입력해주세요</h2>
            <div className="title-div">
              <PiPhone size={17} />
              <span>전화번호</span>
            </div>
            <div className="input-div">
              <input
                type="tel"
                placeholder="예) 01012345678"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && setStep(4)}
              />
              {formData.phoneNumber && validate.phoneNumber && (
                <ErrMsg>전화번호는 숫자 10~11자로 입력해주세요.</ErrMsg>
              )}
            </div>
            <SquareButton onClick={() => setStep(4)} buttonTxt={"다음"} />
          </Step>
        );
      case 4:
        return (
          <Step>
            <BackBtn onClick={() => setStep(3)}>
              <IoArrowBack size={35} color="#000000" />
            </BackBtn>
            <h2>비밀번호를 입력해주세요</h2>
            <div className="title-div">
              <IoLockClosedOutline size={17} />
              <span>비밀번호</span>
            </div>
            <div className="input-div">
              <input
                type="password"
                placeholder="영문, 숫자 조합 8~16자"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formData.password && validate.password && (
                <ErrMsg>
                  비밀번호는 영문과 숫자를 조합하여 8~16자로 입력해야 합니다.
                </ErrMsg>
              )}
              <div className="title-div" style={{ marginTop: "15px" }}>
                <IoLockClosedOutline size={17} />
                <span>비밀번호 확인</span>
              </div>
              <input
                type="password"
                placeholder="비밀번호 확인"
                name="pwcheck"
                value={formData.pwcheck}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit}
              />
              {formData.pwcheck && validate.pwcheck && (
                <ErrMsg>입력한 비밀번호와 다릅니다.</ErrMsg>
              )}
            </div>
            <SquareButton onClick={handleSubmit} buttonTxt={"다음"} />
          </Step>
        );
      case 5:
        return (
          <Step
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "50px",
                }}
              >
                <FaCircleCheck size={100} />
              </div>
              <h2 style={{ marginBottom: "100px" }}>
                회원가입이 완료되었습니다.
              </h2>
              <SquareButton
                onClick={() => navigate("/")}
                buttonTxt={"로그인하러 가기"}
              />
            </div>
          </Step>
        );
      default:
        return null;
    }
  };
  return (
    <Wrapper>
      <div style={{ width: "80%" }}>
        <div>{renderStep()}</div>
      </div>
    </Wrapper>
  );
}

export default SignUpPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const BackBtn = styled.div`
  cursor: pointer;
  width: fit-content;
`;

const Step = styled.div`
  width: 100%;

  h2 {
    font-size: 26px;
    margin: 30px 0;
  }

  .title-div {
    display: flex;
    gap: 5px;
    font-size: 16px;
    color: #808080;
    margin-bottom: 5px;
  }

  input {
    width: calc(100% - 30px);
    padding: 15px;
    border: 1px solid #808080;
    border-radius: 5px;
    outline: none;

    &::placeholder {
      color: #808080;
    }
  }

  .input-div {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    font-size: 16px;
  }
`;

const ErrMsg = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
