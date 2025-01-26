
const getAllQuestions = async (courseId) => {
    const response = await fetch("/api/questions?courseId=" + courseId);
    return await response.json();
}

const getOneQuestion = async (questionId) => {
    const response = await fetch("/api/questions/" + questionId);
    return await response.json();
}

const postQuestion = async (data) => {
    const response  = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify(data)
    });
    const status = response.status;
    const message = await response.json();
    message.status = status;
    return message;
}

export {
    getAllQuestions,
    getOneQuestion,
    postQuestion
}

