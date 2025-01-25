import { sql } from "../database/database.js";

const findAllQuestions = async (course_id) => {
    return await sql`SELECT * FROM questions WHERE course_id=${course_id};`
}

const findOneQuestion = async (id) => {
    return await sql`SELECT * FROM questions WHERE id=${id}`;
}

const findLastTimeCreateQuestion = async (user_uuid) => {
    return await sql`SELECT MAX(create_time) FROM questions WHERE user_uuid=${user_uuid};`
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
    findOneQuestion,
    createQuestion,
    updateUpvoteQuestion,
    findLastTimeCreateQuestion
}