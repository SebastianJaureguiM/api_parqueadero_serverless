const {v4} = require('uuid')
const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const data = JSON.parse(event.body)
    const createdAt = new Date()
    const id = v4()
    
    const newUser = {
        id,
        ...data,
        createdAt
    }
    
    await dynamodb.put({
        TableName: "users_parking",
        Item: newUser,
    }).promise();
    
    return {
        statusCode:200,
        body: JSON.stringify(newUser)
    }
}