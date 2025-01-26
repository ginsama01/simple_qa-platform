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
            const checkUpvote = await cacheUpvoteService.findAnswerUpvote(body.id, body.uuid);
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

const getQuestionUpvote = async (request, urlPatternResult) => {
    try {
        const id = urlPatternResult.pathname.groups.id;
        const url = new URL(request.url);
        const uuid = url.searchParams.get("uuid");
        console.log(id);
        console.log(uuid);
        const checkUpvote = await cacheUpvoteService.findQuestionUpvote(id, uuid);
        if (checkUpvote.length != 0) {
            return Response.json(checkUpvote[0], {status: 200});
        } else {
            return Response.json({message: "Not found"}, {status: 404});
        }
    } catch (err) {
        return Response.json(err.message, {status: 400});
    }

}

const getAnswerUpvote = async (request, urlPatternResult) => {
    try {
        const id = urlPatternResult.pathname.groups.id;
        const url = new URL(request.url);
        const uuid = url.searchParams.get("uuid");
        const checkUpvote = await cacheUpvoteService.findAnswerUpvote(id, uuid);
        if (checkUpvote.length != 0) {
            return Response.json(checkUpvote[0], {status: 200});
        } else {
            return Response.json({message: "Not found"}, {status: 404});
        }
    } catch (err) {
        return Response.json(err.message, {status: 400});
    }

}

export {
    handleUpvote,
    getQuestionUpvote,
    getAnswerUpvote
}
