const { MongoClient } = require('mongodb');

if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}
exports.handler = async (event, context) => {
    
    const { boardId, taskId } = event.queryStringParameters;
    try {
        const user = context.clientContext.user;
        console.log("User id: ", user.sub);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({message: "Unauthorized"}),
            };
        }
        if (!boardId || !taskId) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Missing parameters to run deleteTask"}),
            };
        }
        console.log("Delete task by id", taskId);
        const client = new MongoClient(process.env.MONGODB_URI);
        const clientPromise = client.connect();
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const filter = {boardId: boardId, owner: user.sub};
        const update = {$pull: { tasks: {id: taskId} } };
        const result = await collection.updateOne(filter, update);
        await client.close();
        if (result.modifiedCount === 1) {
            return {
                statusCode: 200,
                body: JSON.stringify({message: "Deleted task"}),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Task was not found or user was not able to delete it."}),
            };
        }  
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to delete task", details: error.message}),
        };
    };
};