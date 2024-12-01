const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

exports.handler = async (event, context) => {
    console.log("Post board");
    try {
        const user = context.clientContext.user;
        console.log("User id: ", user.sub);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({message: "Unauthorized"}),
            };
        }
        const board = JSON.parse(event.body);
        console.log(board)

        const client = new MongoClient(process.env.MONGODB_URI);
        const clientPromise = client.connect();
        const database = (await clientPromise).db(process.env.MONOGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const results = await collection.insertOne(board);
        console.log(JSON.stringify(results));
        await client.close();
        return {
            statusCode: 201,
            body: JSON.stringify({message: "Added board", newBoard: results}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to add board", details: error.message}),
        };
    };
};