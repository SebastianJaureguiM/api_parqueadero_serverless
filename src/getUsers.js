const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const result = await dynamodb.scan({
        TableName: "users_parking"
    }).promise()
    
    const data = result.Items
    
    return {
        statusCode:200,
        body:JSON.stringify(data)
    }
}