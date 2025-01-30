import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
};

export default function () {
  const payload = JSON.stringify({
    questionId: 1,
    code: "Cat is not dog",
    uuid: "abc",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post("http://localhost:7800/api/answers", payload, params);
  http.get("http://localhost:7800/api/answers?questionId=1");
}
