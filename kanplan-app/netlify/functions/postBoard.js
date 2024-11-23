exports.handler = async (event, context) => {
    console.log("Post board");
    try {
        const board = JSON.parse(event.body);
        console.log(board)
        return {
            statusCode: 201,
            body: JSON.stringify({message: "Added board"}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to add board", details: error.message}),
        };
    };
};