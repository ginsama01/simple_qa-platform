import { sql } from "../database/database.js";

const findAllCourses = async () => {
    return await sql`SELECT * FROM courses;`
}

const findOneCourse = async (id) => {
    return await sql`SELECT * from courses WHERE id=${id};`
}

export {
    findAllCourses,
    findOneCourse
}