import * as courseService from "../services/courseService.js"
import { cacheMethodCalls } from "../utils/cacheUtil.js";

const cacheCourseService = cacheMethodCalls(
    courseService,
    []
);

const handleGetCourses = async (request) => {
    try {
        const courses = await cacheCourseService.findAllCourses();
        return Response.json(courses, {status: 200});
    } catch (err) {
        return Response.json({message: err}, {status: 400});
    }
}

export {
    handleGetCourses
}