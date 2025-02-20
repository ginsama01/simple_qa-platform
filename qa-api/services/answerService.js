import { sql } from "../database/database.js";

const findAllAnswers = async (question_id) => {
    return await sql`SELECT * FROM answers WHERE question_id=${question_id};`
}

const findLastTimeCreateAnswer = async (user_uuid) => {
    return await sql`SELECT MAX(create_time) FROM answers WHERE user_uuid=${user_uuid};`
}

const createAnswer = async (question_id, content, user_uuid) => {
    return await sql`INSERT INTO answers (question_id, content, user_uuid)
    VALUES (${question_id}, ${content}, ${user_uuid}) RETURNING *;`
}

const updateUpvoteAnswer = async (id) => {
    return await sql`UPDATE answers SET last_upvote = NOW() WHERE id=${id};`
}

export {
    findAllAnswers,
    createAnswer,
    updateUpvoteAnswer,
    findLastTimeCreateAnswer
}