const {v4} = require('uuid')
const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    try {
        const data = JSON.parse(event.body)
        const {nombre,clave,rol} = data
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const id = v4()
        const createdAt = new Date()
        const newUser = {
            id,
            nombre,
            clave,
            rol,
            pathImage: '',
            createdAt
        }
        
        await dynamodb.put({
            TableName: "users_parking",
            Item: newUser,
        }).promise();
        
        
        return {
            statusCode:200,
            body: JSON.stringify({newUser})
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode:500,
            body: JSON.stringify({error})
        }
    }
}