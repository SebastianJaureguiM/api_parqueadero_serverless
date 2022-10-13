const AWS = require('aws-sdk')

module.exports.main = async (event) => {
    const s3 = new AWS.S3()
    const bucketParams = {
        Bucket: 'bucket-prueba-parking'
    }

    const result = await s3.listObjects(bucketParams).promise()
    const contents = result.Contents

    const listUrl = []
    contents.forEach(element => {
        if (element.Key.includes(".")) {
            const url = `https://${bucketParams.Bucket}.s3.us-east-2.amazonaws.com/${element.Key}`
            listUrl.push(url)
        }
    })

   /*
    const params = {Bucket: 'bucket-prueba-parking', Key: '8b167af653c2399dd93b952a48740620.jpg'}
    const url = s3.getSignedUrl('getObject', params)
    */
    return {
        statusCode:200,
        body:JSON.stringify({
            listUrl
        })
    }
    
}