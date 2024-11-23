exports.handler = async (event, context) => {
    console.log("Get boards");
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({message: "Fetched boards"}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch boards", details: error.message}),
        };
    };
};