import * as upvoteService from "../services/upvoteService.js";
import * as questionService from "../services/questionService.js";
import * as answerService from "../services/answerService.js";
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheUpvoteService = cacheMethodCalls(
    upvoteService,
    ["createQuestionUpvote", "createAnswerUpvote"]
);

const cacheQuestionService = cacheMethodCalls(
    questionService,
    ["updateUpvoteQuestion"]
);

const cacheAnswerService = cacheMethodCalls(
    answerService,
    ["updateUpvoteAnswer"]
);

const handleUpvote = async (request) => {
    try {
        const body = await request.json();
        if (body.questionId) {
            const checkUpvote = await cacheUpvoteService.findQuestionUpvote(body.courseId, body.uuid);
            if (checkUpvote.length != 0) {
                return Response.json({message: "You only can upvote only one question in this course"}, {status: 400});
            } else {
                await cacheUpvoteService.createQuestionUpvote(body.questionId, body.uuid);
                await cacheQuestionService.updateUpvoteQuestion(body.questionId);
                return Response.json({message: "Upvote successfully"}, {status: 201});
            }
        } else {
            const checkUpvote = cacheUpvoteService.findAnswerUpvote(body.questionId, body.uuid);
            if (checkUpvote.length != 0) {
                return Response.json({message: "You only can upvote only one answer in this question"}, {status: 400});
            } else {
                await cacheUpvoteService.createAnswerUpvote(body.answerId, body.uuid);
                await cacheAnswerService.updateUpvoteAnswer(body.answerId);
                return Response.json({message: "Upvote successfully"}, {status: 201});
            }
        }
    } catch (err) {
        return Response.json(err.message, {status: 400});
    }
}

export {
    handleUpvote
}
