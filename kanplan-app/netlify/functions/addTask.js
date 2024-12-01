const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

exports.handler = async (event, context) => {

    const { boardId } = event.queryStringParameters;
    try {
        const user = context.clientContext.user;
        console.log("Add task to board", boardId);
        console.log("User id: ", user.sub);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({message: "Unauthorized"}),
            };
        }
        const task = JSON.parse(event.body);
        console.log(task);
        const client = new MongoClient(process.env.MONGODB_URI);
        const clientPromise = client.connect();
        const database = (await clientPromise).db(process.env.MONOGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const filter = {boardId: boardId, owner: user.sub};
        const update = {$push:{tasks: task}};
        const result = await collection.updateOne(filter, update);
        await client.close();
        console.log(JSON.stringify(result));

        if (result.modifiedCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Board was not found and task cannot be added!"}),
            };
        }
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