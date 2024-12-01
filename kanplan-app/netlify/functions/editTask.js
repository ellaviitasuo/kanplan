const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

exports.handler = async (event, context) => {

    const { boardId, taskId } = event.queryStringParameters;
    try {
        const user = context.clientContext.user;
        console.log("Edit task", taskId);
        console.log("User id: ", user.sub);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({message: "Unauthorized"}),
            };
        }
        const {title, description} = JSON.parse(event.body);
        if (!boardId || !taskId || !title ||!description ) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Missing parameters to run editTask"}),
            };
        }
        const client = new MongoClient(process.env.MONGODB_URI);
        const clientPromise = client.connect();
        const database = (await clientPromise).db(process.env.MONOGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const filter = {boardId: boardId, owner: user.sub, "tasks.id": taskId};
        const update = {$set: { "tasks.$.title": title, "tasks.$.description": description}};
        const result = await collection.updateOne(filter, update);
        console.log(JSON.stringify(result));
        await client.close();

        if (result.modifiedCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Task was not updated!"}),
            };
        }
        return {
            statusCode: 201,
            body: JSON.stringify({message: "Updated task"}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to update task", details: error.message}),
        };
    };
};