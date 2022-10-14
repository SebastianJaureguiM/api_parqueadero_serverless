const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient()

        const {id} = event.pathParameters
        const {clave} = JSON.parse(event.body)
        
        await dynamodb.update({
            TableName: "users_parking",
            Key: {id},
            UpdateExpression: 'set clave = :clave',
            ExpressionAttributeValues: {
                ':clave' : clave
            },
            ReturnValues:'ALL_NEW'
        }).promise()
        
        return {
            statusCode:200,
            body: JSON.stringify({
                message:'Update Sucess',
                id,
                clave
            })
        }
    } catch (error) {
        return {
            statusCode:500,
            body: JSON.stringify({error})
        }
    }
 
}