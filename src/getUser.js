const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters

    const result = await dynamodb.get({
        TableName:"users_parking",
        Key: { id }
    }).promise()

    const data = result.Item

    return {
        statusCode:200,
        body:JSON.stringify(data)
    }
}