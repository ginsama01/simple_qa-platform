import * as answerService from "../services/answerService.js";
import * as questionService from "../services/questionService.js";
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheAnswerService = cacheMethodCalls(
    answerService,
    ["createAnswer", "updateUpvoteAnswer"]
);

const cacheQuestionService = cacheMethodCalls(
    questionService,
    ["createQuestion", "updateUpvoteQuestion"]
);

const handleGetAnswers = async (request) => {
    try {
        const url = new URL(request.url);
        const questionId = url.searchParams.get("questionId");
        const answers = await cacheAnswerService.findAllAnswers(questionId);
        answers.sort((a, b) => new Date(b.last_upvote) - new Date(a.last_upvote));
        return Response.json(answers, {status: 200});
    } catch (err) {
        return Response.json({message: err}, {status: 400});
    }
}

const handlePostAnswer = async (request) => {
    try {
        const body = await request.json();
        const checkCreateQuestion = await cacheQuestionService.findLastTimeCreateQuestion(body.uuid);
        const checkCreateAnswer = await cacheAnswerService.findLastTimeCreateAnswer(body.uuid);
        if (checkCreateQuestion[0].max) {
            const timeDiff = new Date() - new Date(checkCreateQuestion[0].max);
            if (timeDiff < 60000) {
                return Response.json({message: "Please wait a while before posting new answer!"}, {status: 400});
            } 
        }
        if (checkCreateAnswer[0].max) {
            const timeDiff = new Date() - new Date(checkCreateAnswer[0].max);
            if (timeDiff < 60000) {
                return Response.json({message: "Please wait a while before posting new answer!"}, {status: 400});
            } 
        }
        const answer = await cacheAnswerService.createAnswer(body.questionId, body.content, body.uuid);
        return Response.json({message: "Create answer successfully!"}, {status: 201});
    } catch (err) {
        return Response.json(err, {status: 400});
    }
}

export {
    handleGetAnswers,
    handlePostAnswer
}