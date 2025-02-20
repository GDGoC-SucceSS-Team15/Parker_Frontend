// 주차장 운영 여부를 확이하는 커스텀훅
// 00:00 ~ 00:00일 경우 "휴무" 텍스트 반환

const useCheckClosed = (time) => {
  if (time === "00:00 ~ 00:00") return "휴무";
  else return time;
};

export default useCheckClosed;
