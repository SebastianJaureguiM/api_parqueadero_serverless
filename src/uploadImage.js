const AWS = require('aws-sdk')
const parser = require('lambda-multipart-parser')

module.exports.main = async (event) => {
    try {
        const data = await parser.parse(event)
        /*
        const s3 = new AWS.S3()
        const { content, filename } = data.files[0]
        const params = {
            Bucket: "bucket-prueba-parking",
            Body: content,
            Key: filename
        };
        
        const res = await s3.upload(params).promise()
        const url = res.Location
        */
        const userId = "26a6286d-56a1-40d7-8222-5be3bc40b63f"
        const url = "https://bucket-prueba-parking.s3.us-east-2.amazonaws.com/tik-tok.png"

        const sqs = new AWS.SQS()

        const list = await sqs.listQueues({}).promise()

        /*
        const urlQueue = await sqs.getQueueUrl({
            QueueName:"NewSQSQueue"
        }).promise()
        */

        /*
        const res = await sqs.sendMessage({
            MessageAttributes:{
                "IdUser":{
                    DataType:"String",
                    StringValue: userId
                },
                "UrlImagesS3":{
                    DataType:"String",
                    StringValue:url
                }
            },
            MessageBody:"Informacion con la Url de la imagen subida del usuario y el Id de la DB dynamo",
            MessageDeduplicationId: "",
            MessageGroupId: "",
            QueueUrl: "NewSQSQueue"
        }).promise()
        */
        return {
            statusCode:200,
            body: JSON.stringify({data,list})
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode:500,
            body: JSON.stringify({error})
        }
    }
}