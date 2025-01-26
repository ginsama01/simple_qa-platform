const getAllAnswers = async (questionId) => {
    const response = await fetch("/api/answers?questionId=" + questionId);
    return await response.json();
}


const postAnswer = async (data) => {
    const response  = await fetch("/api/answers", {
        method: "POST",
        body: JSON.stringify(data)
    });
    const status = response.status;
    const message = await response.json();
    message.status = status;
    return message;
}

export {
    getAllAnswers,
    postAnswer
}