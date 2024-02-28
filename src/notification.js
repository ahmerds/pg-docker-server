const { createTransport } = require("nodemailer")
const { getEmail } = require("./email")

export async function sendEmail(type) {
  try {
    const SMTP_HOST = process.env.SMTP_HOST
    const SMTP_PORT = process.env.SMTP_PORT
    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASS = process.env.SMTP_PASS
    const SMTP_SENDER = process.env.SMTP_SENDER_EMAIL
    const EMAIL_TO_RECEIVE_NOTIFICATIONS = process.env.EMAIL_TO_RECEIVE_NOTIFICATIONS
    const body = getEmail(type)

    if (!SMTP_HOST || EMAIL_TO_RECEIVE_NOTIFICATIONS) {
      return
    } 

    const transport = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    })

    await transport.sendMail({
      from: `"Database Backup" <${SMTP_SENDER}>`,
      to: EMAIL_TO_RECEIVE_NOTIFICATIONS,
      subject: type === 'success' ? 'Database backup successful 🥳' : 'Database backup failed 😔',
      text: type === 'success' ? 'Your Postgres database backup was successful 🥳' : 'Database backup failed 😔',
      html: body
    })
  } catch (error) {
    console.log(`Error sending email notification: ${error}`)
  }
}