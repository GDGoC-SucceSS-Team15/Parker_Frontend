import React, { useState } from "react";
import ResultModal from "../components/Ai/Result/ResultModal";

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("fireZone");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1> 단속 여부 결과 테스트 페이지</h1>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="fireZone">소화전</option>
        <option value="intersection">교차로</option>
        <option value="busStop">버스 정류장</option>
        <option value="schoolZone">어린이 보호 구역</option>
        <option value="yellowDoubleLine">황색 복선</option>
        <option value="yellowLine">황색 실선</option>
        <option value="yellowDottedLine">흰색 점선</option>
        <option value="whiteLine">흰색 실선</option>
      </select>
      <br />
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      <ResultModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        type={type}
      />
    </div>
  );
};

export default TestPage;
