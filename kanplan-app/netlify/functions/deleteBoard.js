exports.handler = async (event) => {
    
    const { boardId } = event.queryStringParameters;
    try {
        console.log("Delete board by id", boardId)
        return {
            statusCode: 200,
            body: JSON.stringify({message: "Deleted board"}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to delete board", details: error.message}),
        };
    };
};