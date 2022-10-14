const {v4} = require('uuid')
const AWS = require('aws-sdk')
const parser = require('lambda-multipart-parser')

module.exports.main = async (event) => {
    try {
        const data = await parser.parse(event)
        const s3 = new AWS.S3()
        const { content, filename } = data.files[0]
        const params = {
            Bucket: "bucket-prueba-parking",
            Body: content,
            Key: filename
        };
        
        const res = await s3.upload(params).promise();
        
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const id = v4()
        const createdAt = new Date()
        const {nombre,clave,rol} = data
        const newUser = {
            id,
            nombre,
            clave,
            rol,
            pathImage: res.Location,
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