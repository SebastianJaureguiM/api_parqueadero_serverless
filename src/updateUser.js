const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const {id} = event.pathParameters
    const {estado} = JSON.parse(event.body)
    
    await dynamodb.update({
        TableName: "users_parking",
        Key: {id},
        UpdateExpression: 'set estado = :estado',
        ExpressionAttributeValues: {
            ':estado' : estado
        },
        ReturnValues:'ALL_NEW'
    }).promise()
    
    return {
        statusCode:200,
        body: JSON.stringify({
            message:'Update Sucess',
            id,
            estado
        })
    }
}