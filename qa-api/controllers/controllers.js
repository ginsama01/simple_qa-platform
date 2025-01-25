import * as answerController from "./answerController.js";
import * as courseController from "./courseController.js";
import * as questionController from "./questionController.js";
import * as upvoteController from "./upvoteController.js";

export default {
    handleGetCourses: courseController.handleGetCourses,
    handleGetCourse: courseController.handleGetCourse,
    handleGetQuestions: questionController.handleGetQuestions,
    handleGetQuestion: questionController.handleGetQuestion,
    handlePostQuestion: questionController.handlePostQuestion,
    handleGetAnswers: answerController.handleGetAnswers,
    handlePostAnswer: answerController.handlePostAnswer,
    handleUpvote: upvoteController.handleUpvote
}