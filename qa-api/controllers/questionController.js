import * as questionService from "../services/questionService.js";
import * as answerService from "../services/answerService.js";
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheQuestionService = cacheMethodCalls(
    questionService,
    ["createQuestion", "updateUpvoteQuestion"]
);

const cacheAnswerService = cacheMethodCalls(
    answerService,
    ["createAnswer", "updateUpvoteAnswer"]
);

const handleGetQuestions = async (request) => {
    try {
        const url = new URL(request.url);
        const courseId = url.searchParams.get("courseId");
        console.log(courseId);
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
        const question = await cacheQuestionService.findOneQuestion(id);
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
            console.log(answer[0]);
            // await cacheAnswerService.createAnswer(id, answer[0].generated_text, "Anonymous");
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
        createRandomAnswers(body.content, question.id);
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