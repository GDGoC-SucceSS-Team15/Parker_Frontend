import React, { useCallback, useEffect, useState, memo } from "react";
import styled from "styled-components";
import PositionMaker from "./../assets/PositionMaker.png";
import MarkerModal from "./Modals/MarkerModal";
import ParkingMarkerContent from "./Modals/ParkingMarkerContent";
import ParkingMarker from "./../assets/ParkingMarker.svg";
//import NewParkingMarker from "../assets/NewParkingMarker.svg";
import CrackdownMarker from "./../assets/CrackdownMarker.svg";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import { mapApi } from "../api/map";
import "../styles/InfoWindow.css";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [selectedParking, setSelectedParking] = useState(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState([]); // 검색된 장소들
  const [parkingSpaces, setParkingSpaces] = useState([]); // 주차장 데이터 저장
  const [cctvLoc, setCctvLoc] = useState([]); // 단속카메라 데이터 저장
  const [showParking, setShowParking] = useState(true);
  const [showCrackdown, setShowCrackdown] = useState(true);
  const [toggle, setToggle] = useState("");
  const [parkingMarkers, setParkingMarkers] = useState([]);
  const [crackdownMarkers, setCrackdownMarkers] = useState([]);

  // 📍 내 위치 가져오기
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude }); // 현재 위치 설정
          setIsLoading(false); // 로딩 완료
        },
        () => {
          // 위치 정보가 없으면 기본값 (서울)
          setCurrentLocation({ latitude: 37.5665, longitude: 126.978 });
          setIsLoading(false);
        }
      );
    } else {
      // Geolocation 미지원 시 기본값 설정
      setCurrentLocation({ latitude: 37.5665, longitude: 126.978 });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // 주차장 & 단속카메라 위치 조회
  useEffect(() => {
    const getParkingSpace = async () => {
      // 전체 위치 조회
      const allData = await mapApi.getAll(currentLocation);
      if (!allData) {
        return;
      }

      console.log("단속 카메라 데이터:", allData.cameraLocations);
      setParkingSpaces(allData.parkingSpaces || []); // 주차장 위치
      setCctvLoc(allData.cameraLocations || []); // 단속카메라 위치
    };

    getParkingSpace();
  }, [currentLocation]);

  useEffect(() => {
    if (!currentLocation) return; // 위치 정보가 없으면 실행하지 않음

    // 🌍 카카오 지도 API 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude
          ), // 현재 위치
          level: 3, // 확대 레벨
          draggable: true, // 모바일에서 드래그 가능
        };

        const newMap = new window.kakao.maps.Map(container, options); // 지도 생성
        setMap(newMap);

        // 📍 현재 위치 마커
        const markerImage = new window.kakao.maps.MarkerImage(
          PositionMaker,
          new window.kakao.maps.Size(70, 70),
          { offset: new window.kakao.maps.Point(25, 50) } // 마커 이미지의 중심 좌표
        );

        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude
          ),
          map: newMap,
          image: markerImage,
        });

        setMap(newMap);
      });
    };
    return () => {
      document.head.removeChild(script); // 스크립트 정리
    };
  }, [currentLocation]);

  useEffect(() => {
    if (!map) return;
    updateParkingMarkers();
  }, [map, parkingSpaces, showParking]);

  useEffect(() => {
    if (!map) return;
    updateCrackdownMarkers();
  }, [map, parkingSpaces, showCrackdown]);

  let activeOverlay = null; // 전역 변수로 오버레이 관리

  // 🅿️ 주차장 마커 추가 & 제거
  const updateParkingMarkers = () => {
    // 기존 마커 삭제
    parkingMarkers.forEach((marker) => marker.setMap(null));
    setParkingMarkers([]);

    if (!showParking) return;
    console.log("주차장 마커 추가");

    const parkingMark = new window.kakao.maps.MarkerImage(
      ParkingMarker,
      new window.kakao.maps.Size(50, 50),
      { offset: new window.kakao.maps.Point(25, 50) }
    );

    const newMarkers = parkingSpaces?.map((parking) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          parking.latitude,
          parking.longitude
        ),
        map: map,
        image: parkingMark,
      });

      window.kakao.maps.event.addListener(marker, "click", async () => {
        // 기존에 열려 있던 오버레이 닫기
        if (activeOverlay) {
          activeOverlay.setMap(null);
        }

        // 지도 중심 이동
        map.setCenter(
          new window.kakao.maps.LatLng(parking.latitude, parking.longitude)
        );

        map.setLevel(3); // 확대 레벨을 3으로 설정

        const parkingIdData = await mapApi.getPakringById(
          parking.id,
          currentLocation
        );
        setSelectedParking(parkingIdData);

        // 커스텀 오버레이 생성
        const overlayContent = document.createElement("div");
        overlayContent.className = "custom-overlay";
        overlayContent.innerHTML = `
          <span class="icon">P</span>
          <span class="text">${parking.parkingName}</span>
      `;

        const overlay = await new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(
            parking.latitude,
            parking.longitude
          ),
          content: overlayContent,
          xAnchor: 0.5,
          yAnchor: 2.6,
          map: map,
        });

        activeOverlay = overlay; // 현재 열린 오버레이 업데이트
      });

      return marker;
    });

    setParkingMarkers(newMarkers);
  };

  // ⚠️ 단속 카메라 마커 추가 & 제거
  const updateCrackdownMarkers = () => {
    // 기존 마커 삭제
    crackdownMarkers.forEach((marker) => marker.setMap(null));
    setCrackdownMarkers([]);

    if (!showCrackdown) return;
    console.log("단속 카메라 마커 추가");

    const CrackdownMark = new window.kakao.maps.MarkerImage(
      CrackdownMarker,
      new window.kakao.maps.Size(50, 50),
      { offset: new window.kakao.maps.Point(25, 50) }
    );

    const newMarkers = cctvLoc?.map((crackdown) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          crackdown.latitude,
          crackdown.longitude
        ),
        map: map,
        image: CrackdownMark,
      });

      window.kakao.maps.event.addListener(marker, "click", async () => {
        // 기존에 열려 있던 오버레이 닫기
        if (activeOverlay) {
          activeOverlay.setMap(null);
        }

        // 지도 중심 이동
        map.setCenter(
          new window.kakao.maps.LatLng(crackdown.latitude, crackdown.longitude)
        );

        map.setLevel(3); // 확대 레벨을 3으로 설정

        // 커스텀 오버레이 생성
        const overlayContent = document.createElement("div");
        overlayContent.className = "custom-overlay";
        overlayContent.innerHTML = `
        <span class="icon">P</span>
          <span class="text">${crackdown.areaName}</span>
        `;
        // <span class="text>${crackdown.address}</span> -> 주소

        const overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(
            crackdown.latitude,
            crackdown.longitude
          ),
          content: overlayContent,
          xAnchor: 0.5,
          yAnchor: 2.6,
          map: map,
        });

        activeOverlay = overlay; // 현재 열린 오버레이 업데이트
      });

      return marker;
    });

    setCrackdownMarkers(newMarkers);
  };

  // 🅿️ & ⚠️ 필터링
  const handleToggle = (filterType) => {
    setToggle(filterType);
    console.log("토글 변경:", filterType);

    switch (filterType) {
      case "parking":
        setShowCrackdown((prev) => {
          console.log(prev ? "단속 카메라 숨김" : "단속 카메라 표시");
          return !prev;
        });
        break;

      case "crackdown":
        setShowParking((prev) => {
          console.log(prev ? "주차장 숨김" : "주차장 표시");
          return !prev;
        });
        break;

      default:
        break;
    }
  };

  const [isMarkerClicked, setIsMarkerClicked] = useState(false);

  const displayPlaces = useCallback(
    (places) => {
      if (!map) return; // map이 없을 경우 실행하지 않음

      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const searchMarker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        bounds.extend(markerPosition);

        // 검색 결과 마커 중 클릭
        window.kakao.maps.event.addListener(searchMarker, "click", async () => {
          setIsMarkerClicked(true);

          const newLocation = { latitude: place.y, longitude: place.x };
          setCurrentLocation(newLocation);

          // 지도 중심 이동 및 확대 레벨 3으로 고정
          map.setCenter(markerPosition);
          map.setLevel(3);

          // 마커를 지도 중앙에 위치
          map.setCenter(markerPosition);
        });
      });

      // 마커 클릭 시에는 setBounds 호출하지 않음
      if (!isMarkerClicked) {
        map.setBounds(bounds);
      }
    },
    [isMarkerClicked, map] // ✅ map이 변경될 때만 함수가 새로 생성됨
  );

  // 🔍 장소 검색 완료 시 호출되는 콜백 함수
  useEffect(() => {
    if (!map || !searchQuery) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayPlaces(data);
      } else {
        setPlaces([]);
        alert("검색 결과가 없습니다.");
      }
    });
  }, [searchQuery, map, displayPlaces]);

  if (isLoading) {
    return <LoadingContainer>현재 위치를 탐색 중...</LoadingContainer>;
  }

  return (
    <div>
      <MapContainer id="map" />
      <TopBar onSearch={setSearchQuery} onToggle={handleToggle} />
      {selectedParking && (
        <MarkerModal
          isOpen={!!selectedParking}
          onRequestClose={() => setSelectedParking(null)}
        >
          {selectedParking && (
            <ParkingMarkerContent
              key={selectedParking.id}
              parkingId={selectedParking.id}
              bookmarked={selectedParking.bookmarked}
              parkingName={selectedParking.parkingName}
              distance={selectedParking.distance}
              weekdayTime={selectedParking.weekdayTime}
              saturdayTime={selectedParking.saturdayTime}
              holidayTime={selectedParking.holidayTime}
              baseParkingTime={selectedParking.baseParkingTime}
              baseParkingFee={selectedParking.baseParkingFee}
              onClose={() => setSelectedParking(null)}
            />
          )}
        </MarkerModal>
      )}
      <BottomBar onGetLocation={getLocation} />
    </div>
  );
};

export default memo(Map);

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #555;
  background: #f9f9f9;
`;
