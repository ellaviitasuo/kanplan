exports.handler = async (event, context) => {
    console.log("Hello function");
    return { 
        statusCode: 200,
        body: JSON.stringify({message: "hello, world"}),
    };
};