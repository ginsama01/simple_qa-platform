import { sql } from "../database/database.js";

const findAllCourses = async () => {
    return await sql`SELECT * FROM courses;`
}

export {
    findAllCourses
}