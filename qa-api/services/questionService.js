import { sql } from "../database/database.js";

const findAllQuestions = async (course_id) => {
    return await sql`SELECT * FROM questions WHERE course_id=${course_id};`
}

const createQuestion = async (course_id, content, user_uuid) => {
    return await sql`INSERT INTO questions (course_id, content, user_uuid)
    VALUES (${course_id}, ${content}, ${user_uuid}) RETURNING *;`;
}

const updateUpvoteQuestion = async (id) => {
    return await sql`UPDATE questions SET last_upvote = NOW() WHERE id=${id};`
}

export {
    findAllQuestions,
    createQuestion,
    updateUpvoteQuestion
}