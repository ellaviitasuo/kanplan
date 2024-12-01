const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

exports.handler = async (event, context) => {
    const { boardId } = event.queryStringParameters;
    console.log(`Get board with id ${boardId}`);
    try {
        const user = context.clientContext.user;
        console.log("User id: ", user.sub);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({message: "Unauthorized"}),
            };
        }
        const client = new MongoClient(process.env.MONGODB_URI);
        const clientPromise = client.connect();
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const query = {owner: user.sub, boardId: boardId};
        const result = await collection.findOne(query);
        await client.close();
        console.log(JSON.stringify(result));
        return {
            statusCode: 200,
            body: JSON.stringify({message:"Returned board", board: result}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch board", details: error.message}),
        };
    };
};