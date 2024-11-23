exports.handler = async (event) => {

    const { boardId } = event.queryStringParameters;
    try {
        console.log("Add task to board", boardId)
        const task = JSON.parse(event.body);
        console.log(task)
        return {
            statusCode: 201,
            body: JSON.stringify({message: "Added task to board"}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to add task to board", details: error.message}),
        };
    };
};