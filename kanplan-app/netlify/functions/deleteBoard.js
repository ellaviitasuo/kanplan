const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

exports.handler = async (event, context) => {
    
    const { boardId } = event.queryStringParameters;
    try {
        const user = context.clientContext.user;
        console.log("User id: ", user.sub);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({message: "Unauthorized"}),
            };
        }
        console.log("Delete board by id", boardId)
        const client = new MongoClient(process.env.MONGODB_URI);
        const clientPromise = client.connect();
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const query = { owner: user.sub, boardId: boardId };
        const result = await collection.deleteOne(query);
        await client.close();
        if (result.deletedCount === 1) {
            return {
                statusCode: 200,
                body: JSON.stringify({message: "Deleted board"}),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Board was not found or user was not able to delete it."}),
            };
        }  
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to delete board", details: error.message}),
        };
    };
};