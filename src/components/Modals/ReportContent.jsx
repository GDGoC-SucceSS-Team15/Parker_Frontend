import React, { useState } from "react";
import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";

const ReportContent = ({ currentLocation }) => {
  const [fileName, setFileName] = useState("파일 업로드");
  const [file, setFile] = useState();
  const [location, setLocation] = useState(currentLocation); // 모달 내 지도에서 보여줄 위치 텍스트
  const [inputLocation, setinputLocation] = useState(""); // 주소 직접

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("파일 업로드");
    }
  };

  const handleSearch = () => {
    alert(`검색: ${inputLocation}`);
    setLocation(inputLocation);
  };

  const handlePost = () => {
    alert("등록 완료");
    console.log("파일", file);
  };
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <ReportWrapper>
        <h2>불법 주정차 위치 신고</h2>
        <div className="question">해당 위치로 등록하시겠습니까?</div>
        <CurrentLoc>{/* 현재 위치 지도 */}</CurrentLoc>
        <div className="currentLocation">{location}</div>
        <InputDiv>
          <input
            type="text"
            placeholder="주소 직접 입력"
            value={inputLocation}
            onChange={(e) => setinputLocation(e.target.value)}
          />
          <SearchBtn onClick={handleSearch}>검색</SearchBtn>
        </InputDiv>
        <InputDiv>
          <label htmlFor="file" className="file-label">
            {fileName}
          </label>
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <BsPaperclip size={20} />
        </InputDiv>
        <ConfirmBtn onClick={handlePost}>등록</ConfirmBtn>
      </ReportWrapper>
    </div>
  );
};

export default ReportContent;

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .question {
    font-size: 13px;
    font-weight: 700;
  }
  .currentLocation {
    color: #9c2d2d;
    font-size: 13px;
    margin-bottom: 15px;
  }
`;
const CurrentLoc = styled.div`
  width: 159px;
  height: 156px;
  border-radius: 14px;
  background-color: gray;
  margin: 10px;
`;
const InputDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  width: 90%;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
  color: #636363;
  height: 25px;
  align-items: center;
  margin: 5px;

  input {
    outline: none;
    border: none;
    width: 100%;
    ::placeholder {
      color: #636363;
    }
  }

  label {
    max-width: 90%;
    white-space: nowrap; // 줄바꿈 방지
    overflow: hidden; // 넘치는 텍스트 숨기기
    text-overflow: ellipsis; // 말줄임표 적용
    display: inline-block;
    cursor: pointer;
  }
`;

const ConfirmBtn = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 13px 0;
  background-color: black;
  color: white;
  font-size: 16px;
  border-radius: 30px;
  margin-top: 30px;
  font-weight: 700;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  border: none;
  outline: none;
  height: 100%;
  background-color: #b4b4b4;
  color: white;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 10px;
  cursor: pointer;
  white-space: nowrap;
`;
