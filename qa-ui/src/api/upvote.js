
const postUpvoteQuestion = async (data) => {
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
    postUpvoteQuestion
}