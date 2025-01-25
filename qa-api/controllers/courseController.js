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

const handleGetCourse = async (request, urlPatternResult) => {
    const id = urlPatternResult.pathname.groups.id;
    try {
        const course = await cacheCourseService.findOneCourse(id);
        return Response.json(course, {status: 200});
    } catch (err) {
        return Response.json({ message: "Not found" }, { status: 404 });
    }
}

export {
    handleGetCourses,
    handleGetCourse
}