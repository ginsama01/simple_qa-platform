import * as questionService from "../services/questionService.js"
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheQuestionService = cacheMethodCalls(
    questionService,
    []
);

const handleGetQuestions = async (request) => {
    try {
        const url = new URL(request.url);
        const courseId = url.searchParams.get("courseId");
        const questions = await cacheQuestionService.findAllQuestions(courseId);
        return Response.json(questions, {status: 200});
    } catch (err) {
        return Response.json({message: err}, {status: 400});
    }
}

const handlePostQuestion = async (request) => {
    try {
        const body = await request.json();
        const questions = await cacheQuestionService.findAllQuestions(courseId);
        if (questions.length >= 20) {
            return Response.json({message: "Limit 20 questions per course"}, {status: 400});
        }
        const question = await cacheQuestionService.createQuestion(body.courseId, body.content, body.uuid);
        return Response.json(question, {status: 201});
    } catch (err) {
        return Response.json(err, {status: 400});
    }
}

export {
    handleGetQuestions,
    handlePostQuestion
}