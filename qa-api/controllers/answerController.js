import * as answerService from "../services/answerService.js"
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheAnswerService = cacheMethodCalls(
    answerService,
    []
);

const handleGetAnswers = async (request) => {
    try {
        const url = new URL(request.url);
        const questionId = url.searchParams.get("questionId");
        const answers = await cacheAnswerService.findAllAnswers(questionId);
        return Response.json(answers, {status: 200});
    } catch (err) {
        return Response.json({message: err}, {status: 400});
    }
}

const handlePostAnswer = async (request) => {
    try {
        const body = await request.json();
        const answers = await cacheAnswerService.findAllAnswers(questionId);
        if (answers.length >= 20) {
            return Response.json({message: "Limit 20 answers per question"}, {status: 400});
        }
        const answer = await cacheAnswerService.createAnswer(body.questionId, body.content, body.uuid);
        return Response.json(answer, {status: 201});
    } catch (err) {
        return Response.json(err, {status: 400});
    }
}

export {
    handleGetAnswers,
    handlePostAnswer
}