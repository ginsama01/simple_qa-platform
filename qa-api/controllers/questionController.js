import * as questionService from "../services/questionService.js";
import * as answerService from "../services/answerService.js";
import * as courseService from "../services/courseService.js";
import { cacheMethodCalls } from "../utils/cacheUtil.js";
import { sendPingUpdateQuestion } from "../utils/webSocket.js";

const cacheQuestionService = cacheMethodCalls(
    questionService,
    ["createQuestion", "updateUpvoteQuestion"]
);

const cacheAnswerService = cacheMethodCalls(
    answerService,
    ["createAnswer", "updateUpvoteAnswer"]
);

const cacheCourseService = cacheMethodCalls(
    courseService,
    []
);

const handleGetQuestions = async (request) => {
    try {
        const url = new URL(request.url);
        const courseId = url.searchParams.get("courseId");
        const questions = await cacheQuestionService.findAllQuestions(courseId);
        questions.sort((a, b) => new Date(b.last_upvote) - new Date(a.last_upvote));
        return Response.json(questions, {status: 200});
    } catch (err) {
        return Response.json({message: err}, {status: 400});
    }
}

const handleGetQuestion = async (request, urlPatternResult) => {
    const id = urlPatternResult.pathname.groups.id;
    try {
        const questions = await cacheQuestionService.findOneQuestion(id);
        const courses = await cacheCourseService.findOneCourse(questions[0].course_id);
        let question = questions[0];
        question.course = courses[0];
        return Response.json(question, {status: 200});
    } catch (err) {
        return Response.json({ message: "Not found" }, { status: 404 });
    }
}

const createRandomAnswers = async (content, id) => {
    try {
        for (let i = 0; i < 3; ++i) {
            const response = await fetch("http://llm-api:7000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({question: content}),
            });
            const answer = await response.json();
            await cacheAnswerService.createAnswer(id, answer[0].generated_text, "Anonymous");
            sendPingUpdateQuestion("Update answer");
        }
    } catch (err) {
        console.log(err.message);
    }
}

const handlePostQuestion = async (request) => {
    try {
        const body = await request.json();
        const checkCreateQuestion = await cacheQuestionService.findLastTimeCreateQuestion(body.uuid);
        const checkCreateAnswer = await cacheAnswerService.findLastTimeCreateAnswer(body.uuid);
        if (checkCreateQuestion[0].max) {
            const timeDiff = new Date() - new Date(checkCreateQuestion[0].max);
            if (timeDiff < 60000) {
                return Response.json({message: "Please wait a while before posting new question!"}, {status: 400});
            } 
        }
        if (checkCreateAnswer[0].max) {
            const timeDiff = new Date() - new Date(checkCreateAnswer[0].max);
            if (timeDiff < 60000) {
                return Response.json({message: "Please wait a while before posting new question!"}, {status: 400});
            } 
        }
        const question = await cacheQuestionService.createQuestion(body.courseId, body.content, body.uuid);
        createRandomAnswers(body.content, question[0].id);
        sendPingUpdateQuestion("Update question");
        return Response.json({message: "Create question successfully!"}, {status: 201});
    } catch (err) {
        return Response.json(err.message, {status: 400});
    }
}

export {
    handleGetQuestions,
    handleGetQuestion,
    handlePostQuestion
}