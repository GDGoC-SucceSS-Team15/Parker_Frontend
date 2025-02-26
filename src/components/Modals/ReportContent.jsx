import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import PositionMaker from "../../assets/PositionMaker.png";
import { reportApi } from "../../api/report";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/notificationStore.js";

const ReportContent = () => {
  const [map, setMap] = useState(null);
  const [fileName, setFileName] = useState("파일 업로드");
  const [file, setFile] = useState();
  const [location, setLocation] = useState("현재 위치"); // 모달 내 지도에서 보여줄 위치 텍스트
  const [address, setAddress] = useState("");
  const [inputLocation, setinputLocation] = useState(""); // 주소 직접
  const [places, setPlaces] = useState([]); // 검색된 장소들
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { currentLocation, isLoading } = useCurrentLocation(); // 현재 위치 반환 커스텀훅
  const { showNotification } = useNotificationStore();

  useEffect(() => {
    if (!currentLocation) return; // 위치 정보가 없으면 실행하지 않음

    // 🌍 카카오 지도 API 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map-modal");
        const options = {
          center: new window.kakao.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude
          ), // 현재 위치
          level: 4, // 확대 레벨
        };

        const newMap = new window.kakao.maps.Map(container, options); // 지도 생성
        setMap(newMap);

        // 📍 현재 위치 마커
        const markerImage = new window.kakao.maps.MarkerImage(
          PositionMaker,
          new window.kakao.maps.Size(30, 30),
          { offset: new window.kakao.maps.Point(15, 15) } // 마커 이미지의 중심 좌표
        );

        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude
          ),
          map: newMap,
          image: markerImage,
        });
      });
    };
    return () => {
      document.head.removeChild(script); // 스크립트 정리
    };
  }, [currentLocation]);

  const displayPlaces = useCallback(
    (places) => {
      if (!map) return; // map이 없을 경우 실행하지 않음

      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map,
        });
        bounds.extend(markerPosition);

        window.kakao.maps.event.addListener(marker, "click", async () => {
          console.log("선택 주소", place.road_address_name);
          setLocation(place.place_name);
          setinputLocation(place.place_name);
          setAddress(place.address_name);
        });
      });

      map.setBounds(bounds);
    },
    [map] // ✅ map이 변경될 때만 함수가 새로 생성됨
  );

  // 장소 검색 완료 시 호출되는 콜백 함수
  useEffect(() => {
    if (!map || !searchQuery) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayPlaces(data);
      } else {
        setPlaces([]);
        showNotification("⚠️ 검색 결과가 없습니다.");
      }
    });
  }, [searchQuery, map, displayPlaces, showNotification]);

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
    setLocation(inputLocation);
    setSearchQuery(inputLocation);
    console.log(places);
  };

  const handlePost = async () => {
    console.log("파일", file);
    try {
      await reportApi.postReport(inputLocation, file);
      showNotification("✅ 신고가 정상적으로 처리되었습니다");
      navigate("/report");
    } catch (err) {
      showNotification("⚠️ 신고 접수 실패");
    }
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <ReportWrapper>
        <h2>불법 주정차 위치 신고</h2>
        <div className="question">해당 위치로 등록하시겠습니까?</div>
        <CurrentLoc>
          {isLoading && <div className="loading">로딩 중..</div>}
          <div id="map-modal" style={{ width: "100%", height: "100%" }}></div>
        </CurrentLoc>
        <div className="place-name">{location}</div>
        <div className="address-name">{address}</div>
        <InputDiv>
          <input
            type="text"
            placeholder="주소 직접 입력"
            value={inputLocation}
            onChange={(e) => setinputLocation(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
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
  .place-name {
    font-size: 15px;
    font-weight: 600;
  }
  .address-name {
    color: #9c2d2d;
    font-size: 13px;
    margin-bottom: 15px;
  }
`;
const CurrentLoc = styled.div`
  width: 159px;
  height: 156px;
  border-radius: 14px;
  margin: 10px;
  position: relative;

  .loading {
    width: 100%;
    height: 100%;
    background-color: #b7b7b7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #898989;
  }
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
