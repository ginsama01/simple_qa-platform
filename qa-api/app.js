import { serve } from "./deps.js";
import controllers from "./controllers/controllers.js";

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses" }),
    fn: controllers.handleGetCourses,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/questions" }),
    fn: controllers.handleGetQuestions,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/questions" }),
    fn: controllers.handlePostQuestion,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/answers" }),
    fn: controllers.handleGetAnswers,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/answers" }),
    fn: controllers.handlePostAnswer,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/upvote" }),
    fn: controllers.handleUpvote,
  },
];

const handleRequest = async (request) => {
  // const data = await request.json();

  // const response = await fetch("http://llm-api:7000/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });

  // return response;
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    return new Response(e.stack, { status: 500 });
  }

};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
