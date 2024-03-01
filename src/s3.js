const { readFile, unlink } = require('fs/promises')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const S3_ENDPOINT = process.env.S3_ENDPOINT
const S3_REGION = process.env.S3_REGION
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID
const S3_SECRET = process.env.S3_SECRET
const S3_BUCKET = process.env.S3_BUCKET
const S3_PREFIX = process.env.S3_PREFIX

async function uploadToS3(filename) {
  if (!S3_ACCESS_KEY_ID || !S3_SECRET) {
    console.log('Please provide keys for your S3 to proceed')
    return
  }

  const s3Client = new S3Client({
    endpoint: S3_ENDPOINT,
    forcePathStyle: false,
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET
    }
  })

  const file = await readFile(filename)

  await s3Client.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Body: file,
    ACL: 'private',
    ContentType: 'application/gzip',
    Key: `${S3_PREFIX}/${filename}`
  }))
  // File successfully uploaded
  // Remove file. Not a critical step, don't await
  unlink(filename)
}

exports.uploadToS3 = uploadToS3
