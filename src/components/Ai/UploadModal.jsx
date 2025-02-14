import React from "react";
import styled from "styled-components";
import { IoWarningOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";

const UploadModal = () => {
  return (
    <Wrapper>
      <div className="icon">
        <IoWarningOutline size={50} color="#FF4D00" />
      </div>
      <Text>
        <div className="title">
          주정차 <span>상습 단속</span> 구역 여부
        </div>
        <div className="sub">
          현재 위치가 상습 단속 구역인지 AI가 알려드립니다!
        </div>
        <div className="warn">
          * 차선이 보이게 찍어주세요. <br />* 주변 사물이 전체적으로 보이게
          찍어주세요.
        </div>
        <Input>
          <input id="ai-image" type="file" />
          <label for="ai-image">
            <div className="icon">
              <CiImageOn size={50} color="#B7B7B7" />
            </div>
          </label>
        </Input>
        <ConfirmBtn>확인하기</ConfirmBtn>
      </Text>
    </Wrapper>
  );
};

export default UploadModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .icon {
    margin: auto;
  }
`;

const Text = styled.div`
  margin: auto;
  text-align: center;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0;
  }
  span {
    color: #ff0000;
  }
  .sub {
    font-size: 11px;
    font-weight: 600;
  }
  .warn {
    text-align: start;
    font-size: 12px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const Input = styled.div`
  width: 100%;
  input {
    display: none;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 260px;
    background-color: #f1f1f1;
    border: 1px solid #cdcdcd;
    cursor: pointer;
  }
`;

const ConfirmBtn = styled.button`
  border: none;
  outline: none;
  background-color: black;
  color: white;
  border-radius: 30px;
  padding: 15px;
  text-align: center;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
`;
