const { execSync } = require('child_process')
const { unlink } = require('fs/promises')
const gzip = require('gzipme')
const { uploadToS3 } = require('./s3')
const { sendEmail } = require('./notification')

const PG_HOST = process.env.PG_HOST
const PG_PORT = process.env.PG_PORT
const PG_USER = process.env.PG_USER
const PG_DB = process.env.PG_DB
const PG_DUMPALL = process.env.PG_DUMPALL
let filename = `pgbackup_${new Date().toISOString()}.tar`

async function doBackup() {
  try {
    console.log('Starting Postgres backup...')
    const dump = Boolean(PG_DUMPALL) ? 'pg_dumpall' : 'pg_dump'
    const db = dump ? `-d ${PG_DB}` : ''
    filename = `pgbackup_${new Date().toISOString()}.tar`
    const cmd = `${dump} -h ${PG_HOST} -p ${PG_PORT} -U ${PG_USER} ${db} -f ${filename}`

    const output = execSync(cmd).toString()
    await gzip(filename, { output: `${filename}.gz` }) // Gzip file
    await unlink(filename) // Delete regular tar file
    console.log(`Backup successful\n${output}`)
    
    console.log('Starting upload to S3...')
    // Upload gzipped file
    await uploadToS3(`${filename}.gz`)
    console.log('Uploaded to S3')

    await sendEmail('success')
  } catch (error) {
    console.log(String(error))
    // Send failure notification
    await sendEmail('failure')
  }
}

exports.doBackup = doBackup
