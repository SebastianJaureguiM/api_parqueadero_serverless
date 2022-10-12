const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const s3 = new AWS.S3()
    
    const bucketParams = {
        Bucket: 'bucket-prueba-parking',
    }

    const result = await s3.listObjects(bucketParams).promise()

    return {
        statusCode:200,
        body:JSON.stringify(result)
    }
    
}