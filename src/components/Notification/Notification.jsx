import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import useNotificationStore from "../../store/useNotification.js";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  background-color: #000000ad;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  height: 40px;
  z-index: 99999;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 15px;

  ${({ isVisible, isFadingOut }) =>
    css`
      animation: ${isFadingOut ? fadeOut : fadeIn} 1s forwards;
    `}
`;

const Notification = () => {
  const { notification, hideNotification } = useNotificationStore();
  const [isFadingOut, setIsFadingOut] = useState(false); // 사라지는 상태

  useEffect(() => {
    if (notification) {
      // 1초 후 알림 사라짐 시작
      const timer = setTimeout(() => {
        setIsFadingOut(true); // 사라지는 애니메이션 시작
        setTimeout(() => {
          hideNotification(); // 애니메이션 끝난 후 알림 숨기기
          setIsFadingOut(false); // 상태 초기화
        }, 1000); // 애니메이션 지속 시간 (0.5초 후에 숨김 처리)
      }, 2500); // 알림 유지 시간

      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [notification, hideNotification]);

  return (
    notification && (
      <NotificationWrapper isVisible={!!notification} isFadingOut={isFadingOut}>
        {notification || "알림"}
      </NotificationWrapper>
    )
  );
};

export default Notification;
