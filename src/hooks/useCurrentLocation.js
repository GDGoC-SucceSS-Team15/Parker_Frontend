import { useState, useEffect } from "react";

const useCurrentLocation = (
  defaultLocation = { latitude: 37.5665, longitude: 126.978 }
) => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setIsLoading(false);
      },
      (err) => {
        console.error("위치 정보를 가져오는 데 실패함", err);
        setError("위치 정보를 가져올 수 없습니다.");
        setIsLoading(false);
      }
    );
  }, []);

  return { currentLocation, isLoading, error };
};

export default useCurrentLocation;
