const {v4} = require('uuid')
const AWS = require('aws-sdk')
const parser = require('lambda-multipart-parser')

module.exports.main = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const s3 = new AWS.S3()

    const data = await parser.parse(event)

    const { content, filename, contentType } = data.files[0]
    const params = {
        Bucket: "bucket-prueba-parking",
        Key: filename,
        Body: content,
        ContentDisposition: `attachment; filename="${filename}";`,
        ContentType: contentType,
        ACL: "public-read"
    };
    
    await s3.upload(params).promise()
    
    /*
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
    */
    return {
        statusCode:200,
        body: JSON.stringify({result})
    }
}