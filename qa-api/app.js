import { serve } from "./deps.js";
import { processSocket } from "./utils/webSocket.js"
import controllers from "./controllers/controllers.js";


const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses" }),
    fn: controllers.handleGetCourses,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/courses/:id" }),
    fn: controllers.handleGetCourse,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/questions" }),
    fn: controllers.handleGetQuestions,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/questions/:id" }),
    fn: controllers.handleGetQuestion,
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
    method: "GET",
    pattern: new URLPattern({ pathname: "/upvote/question/:id" }),
    fn: controllers.handleGetQuestionUpvote,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/upvote/answer/:id" }),
    fn: controllers.handleGetAnswerUpvote,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/upvote" }),
    fn: controllers.handleUpvote,
  },
];

const handleRequest = async (request) => {
  if (request.headers.get("upgrade") === "websocket") {   
    console.log("abc");
    const { socket, response } = Deno.upgradeWebSocket(request);

    processSocket(socket);

    return response;
  }

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
