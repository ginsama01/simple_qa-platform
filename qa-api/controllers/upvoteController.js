import * as upvoteService from "../services/upvoteService.js";
import * as questionService from "../services/questionService.js";
import * as answerService from "../services/answerService.js";
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheUpvoteService = cacheMethodCalls(
    upvoteService,
    []
);

const cacheQuestionService = cacheMethodCalls(
    questionService,
    []
);

const cacheAnswerService = cacheMethodCalls(
    answerService,
    []
);

const handleUpvote = async (request) => {
    try {
        const body = await request.json();
        if (body.questionId) {
            const checkUpvote = cacheUpvoteService.findQuestionUpvote(body.questionId, body.uuid);
            if (checkUpvote.length != 0) {
                return Response.json({message: "You only can upvote this question one time"}, {status: 400});
            } else {
                await cacheUpvoteService.createQuestionUpvote(body.questionId, body.uuid);
                await cacheQuestionService.updateUpvoteQuestion(body.questionId);
                return Response.json({message: "Upvote successfully"}, {status: 201});
            }
        } else {
            const checkUpvote = cacheUpvoteService.findAnswerUpvote(body.answerId, body.uuid);
            if (checkUpvote.length != 0) {
                return Response.json({message: "You only can upvote this answer one time"}, {status: 400});
            } else {
                await cacheUpvoteService.createAnswerUpvote(body.answerId, body.uuid);
                await cacheAnswerService.updateUpvoteAnswer(body.answerId);
                return Response.json({message: "Upvote successfully"}, {status: 201});
            }
        }
    } catch (err) {
        return Response.json(err, {status: 400});
    }
}

export {
    handleUpvote
}
