export function useDayType(date = new Date()) {
  const holidays = [
    "01-01", // 신정
    "03-01", // 삼일절
    "05-05", // 어린이날
    "06-06", // 현충일
    "08-15", // 광복절
    "10-03", // 개천절
    "10-09", // 한글날
    "12-25", // 크리스마스
  ];

  // 음력 기반 공휴일 (설날, 추석)은 API 필요..
  const monthDay = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

  if (holidays.includes(monthDay)) return "holidayTime";

  const day = date.getDay();
  if (day === 6) return "saturdayTime";
  if (day === 0) return "holidayTime"; // 일요일도 공휴일로 간주

  return "weekdayTime";
}
