const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

exports.handler = async (event, context) => {
    console.log("Get boards");
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
        const results = await collection.find({ owner: user.sub}).toArray();
        console.log(JSON.stringify(results));
        await client.close();
        return {
            statusCode: 200,
            body: JSON.stringify({message:"Returned boards", boards: results}),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch boards", details: error.message}),
        };
    };
};