import React, { useState } from "react";
import styled from "styled-components";
import warning from "../../assets/warning.svg";
import uploadImg from "../../assets/uploadImg.svg";
import imageIcon from "../../assets/image.svg";
import { aiApi } from "../../api/ai";

const UploadModal = ({ setModal, setResult }) => {
  const [err, setErr] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imgFile, setImgFile] = useState();

  const handlePostImage = async () => {
    try {
      const predictData = await aiApi.postImg(imgFile);

      const resultData = await aiApi.getResult(predictData.class_id);
      console.log(resultData);
      setResult(resultData);

      setModal(true);
    } catch {
      setErr(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Wrapper>
        <div className="icon">
          {err ? (
            <img src={uploadImg} alt="uploadImg" />
          ) : (
            <img src={warning} alt="warning" />
          )}
        </div>
        <Text>
          {err ? (
            <div className="title">
              가이드에 맞게 촬영된 <br />
              이미지를 업로드해주세요
            </div>
          ) : (
            <>
              <div className="title">
                주정차 <span>상습 단속</span> 구역 여부
              </div>
              <div className="sub">
                현재 위치가 상습 단속 구역인지 AI가 알려드립니다!
              </div>
            </>
          )}
          <div className="warn" style={{ color: err ? "#FF0000" : "black" }}>
            * 차선이 보이게 찍어주세요. <br />* 주변 사물이 전체적으로 보이게
            찍어주세요.
          </div>
          <Input>
            <input
              id="ai-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="ai-image">
              {preview ? (
                <PreviewImage src={preview} alt="preview" />
              ) : (
                <div className="icon">
                  <img src={imageIcon} alt="imageIcon" />
                </div>
              )}
            </label>
          </Input>
        </Text>
        <ConfirmBtn onClick={handlePostImage}>확인하기</ConfirmBtn>
      </Wrapper>
    </>
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
    justify-content: center;
    width: 100%;
    height: 260px;
    background-color: #f1f1f1;
    border: 1px solid #cdcdcd;
    cursor: pointer;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  cursor: pointer;
`;
