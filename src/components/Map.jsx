import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PositionMaker from "./../assets/PositionMaker.png"
import MarkerModal from "./Modals/MarkerModal"
import ParkingMarkerContent from "./Modals/ParkingMarkerContent";
import ParkingMarker from "./../assets/ParkingMarker.svg"
import BottomBar from "./BottomBar"

const parkingData = [
  {
    id: 1,
    parkingName: "역삼문화공원 제1호 공영주차장",
    address: "서울특별시 강남구 역삼동 635-1",
    latitude: 37.6300,
    longitude: 127.0270,
    distance: 500, // 임의로 추가
    estimatedTime: 5, // 임의로 추가
    weekdayStartTime: "11:00",
    weekdayEndTime: "21:00",
    saturdayStartTime: "11:00",
    saturdayEndTime: "21:00",
    holidayStartTime: "11:00",
    holidayEndTime: "21:00",
    baseParkingTime: 5,
    baseParkingFee: 500,
  },
  {
    id: 2,
    parkingName: "역삼문화공원 제2호 공영주차장",
    address: "서울특별시 강남구 역삼동 635-1",
    latitude: 37.6500,
    longitude: 127.0280,
    weekdayStartTime: "11:00",
    weekdayEndTime: "21:00",
    saturdayStartTime: "11:00",
    saturdayEndTime: "21:00",
    holidayStartTime: "11:00",
    holidayEndTime: "21:00",
    baseParkingTime: 5,
    baseParkingFee: 500,
  },
]

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    getLocation();
  },[]);

  // 내 위치 가져오기
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
          setCurrentLocation({ latitude: 37.5665, longitude: 126.9780 });
          setIsLoading(false);
        }
      );
    } else {
      // Geolocation 미지원 시 기본값 설정
      setCurrentLocation({ latitude: 37.5665, longitude: 126.9780 });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentLocation) return; // 위치 정보가 없으면 실행하지 않음

    // 카카오 지도 API 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=908628d6d7a926beea64a0e883c70910&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); 
        const options = {
          center: new window.kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude), // 현재 위치
          level: 3, // 확대 레벨
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성

        const markerImage = new window.kakao.maps.MarkerImage(
        PositionMaker,
        new window.kakao.maps.Size(70, 70), 
        { offset: new window.kakao.maps.Point(25, 50) } // 마커 이미지의 중심 좌표
        );

        // 현재 위치 마커
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude), map,
          image: markerImage,
        });

        
        // 주차장 마커
        const ParkingMark = new window.kakao.maps.MarkerImage(
          ParkingMarker,
          new window.kakao.maps.Size(50, 50), 
          { offset: new window.kakao.maps.Point(25, 50) } // 마커 이미지의 중심 좌표
          );
        
        parkingData.forEach((parking) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(parking.latitude, parking.longitude),
            map,
            image: ParkingMark,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            setSelectedParking(parking);
          });
        });
        

      });
    };

    return () => {
      document.head.removeChild(script); // 스크립트 정리
    };
  }, [currentLocation]);

  if (isLoading) {
    return <LoadingContainer>현재 위치를 탐색 중...</LoadingContainer>;
  }

  return (
    <div>
      <MapContainer id="map" />
      {selectedParking && (
        <MarkerModal
          isOpen={!!selectedParking}
          onRequestClose={() => setSelectedParking(null)}
        >
        {selectedParking && (
          <ParkingMarkerContent
            key={selectedParking.id}
            parkingName={selectedParking.parkingName}
            distance={selectedParking.distance}
            estimatedTime={selectedParking.estimatedTime}
            weekdayStartTime={selectedParking.weekdayStartTime}
            weekdayEndTime={selectedParking.weekdayEndTime}
            saturdayStartTime={selectedParking.saturdayStartTime}
            saturdayEndTime={selectedParking.saturdayEndTime}
            holidayStartTime={selectedParking.holidayStartTime}
            holidayEndTime={selectedParking.holidayEndTime}
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

export default Map;

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