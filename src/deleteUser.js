const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const {id} = event.pathParameters

    await dynamodb.delete({
        TableName: "users_parking",
        Key: {id}
    }).promise()
    
    return {
        statusCode:200,
        body: JSON.stringify({
            message: `User ${id} delete`
        })
    }
}