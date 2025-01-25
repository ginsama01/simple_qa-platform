
const getAllCourses = async () => {
    const response = await fetch("/api/courses");
    return await response.json();
}

const getOneCourse = async (courseId) => {
    const response = await fetch("/api/courses/" + courseId);
    return await response.json();
}

export {
    getAllCourses,
    getOneCourse
}

