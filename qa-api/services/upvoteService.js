import { sql } from "../database/database.js";

const createQuestionUpvote = async (question_id, user_uuid) => {
    return await sql`INSERT INTO upvotes (question_id, user_uuid)
    VALUES (${question_id}, ${user_uuid}) RETURNING *;`;
}

const createAnswerUpvote = async (answer_id, user_uuid) => {
    return await sql`INSERT INTO upvotes (answer_id, user_uuid)
    VALUES (${answer_id}, ${user_uuid}) RETURNING *;`;
}

const findQuestionUpvote = async (question_id, user_uuid) => {
    return await sql`SELECT * FROM upvotes WHERE question_id=${question_id} AND user_uuid=${user_uuid}`;
}

const findAnswerUpvote = async (answer_id, user_uuid) => {
    return await sql`SELECT * FROM upvotes WHERE answer_id=${question_id} AND user_uuid=${user_uuid}`;
}

export {
    createQuestionUpvote,
    createAnswerUpvote,
    findQuestionUpvote,
    findAnswerUpvote
}