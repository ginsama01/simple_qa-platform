import { sql } from "../database/database.js";

const createQuestionUpvote = async (question_id, user_uuid) => {
    return await sql`INSERT INTO upvotes (question_id, user_uuid)
    VALUES (${question_id}, ${user_uuid}) RETURNING *;`;
}

const createAnswerUpvote = async (answer_id, user_uuid) => {
    return await sql`INSERT INTO upvotes (answer_id, user_uuid)
    VALUES (${answer_id}, ${user_uuid}) RETURNING *;`;
}

const findQuestionUpvote = async (course_id, user_uuid) => {
    return await sql`SELECT * FROM upvotes WHERE user_uuid=${user_uuid} AND question_id IN 
    (SELECT id FROM questions WHERE course_id = ${course_id});`;
}

const findAnswerUpvote = async (question_id, user_uuid) => {
    return await sql`SELECT * FROM upvotes WHERE user_uuid=${user_uuid} AND answer_id IN
    (SELECT id FROM answers WHERE question_id = ${question_id});`;
}

export {
    createQuestionUpvote,
    createAnswerUpvote,
    findQuestionUpvote,
    findAnswerUpvote
}