import axios from "axios";

const AI_BASE_URL = process.env.REACT_APP_AI_API_ROOT;

// ai api
export const aiApi = {
  postImg: async (image) => {
    try {
      const res = await axios.post(
        `${AI_BASE_URL}/predict`,
        {
          file: image,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("이미지 post 성공", res);
      const predictData = res.data;
      return predictData;
    } catch (err) {
      console.log("이미지 post 실패", err);
    }
  },
  getResult: async (id) => {
    try {
      const res = await axios.get(`${AI_BASE_URL}/result/${id}`);

      console.log("결과 반환 성공", res);
      const resultData = res.data;
      return resultData;
    } catch (err) {
      console.log("결과 반환 실패", err);
    }
  },
};
