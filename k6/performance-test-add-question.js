import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
};

export default function () {
  const payload = JSON.stringify({
    courseId: 1,
    content: "What is cat",
    uuid: "abc",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post("http://localhost:7800/api/questions", payload, params);
  http.get("http://localhost:7800/api/questions?courseId=1");
}
