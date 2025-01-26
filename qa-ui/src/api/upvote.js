
const getQuestionUpvote = async (courseId, uuid) => {
    const response = await fetch("/api/upvote/question/" + courseId + "?uuid=" + uuid);
    return await response.json();
}

const getAnswerUpvote = async (questionId, uuid) => {
    const response = await fetch("/api/upvote/answer/" + questionId + "?uuid=" + uuid);
    return await response.json();
}

const postUpvote = async (data) => {
    const response  = await fetch("/api/upvote", {
        method: "POST",
        body: JSON.stringify(data)
    });
    const status = response.status;
    const message = await response.json();
    message.status = status;
    return message;
}

export {
    postUpvote,
    getQuestionUpvote,
    getAnswerUpvote
}