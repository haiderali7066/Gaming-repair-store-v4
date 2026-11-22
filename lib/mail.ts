import nodemailer from "nodemailer"

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) return null

  const port = Number(process.env.SMTP_PORT || 465)

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
  })

  return transporter
}

export async function sendOtpEmail(to: string, code: string) {
  const mailer = getTransporter()

  if (!mailer) {
    // Local development without SMTP: print the code instead of emailing it
    if (process.env.NODE_ENV !== "production") {
      console.log(`[DEV] Password reset code for ${to}: ${code}`)
      return
    }

    throw new Error("SMTP is not configured")
  }

  await mailer.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject: "Your Al Dana password reset code",
    text: `Your Al Dana password reset code is ${code}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#18181b">
        <h2 style="margin:0 0 8px;font-size:20px">Reset your password</h2>
        <p style="margin:0 0 20px;font-size:14px;color:#52525b">
          Use this code to reset your Al Dana account password.
        </p>
        <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:18px;text-align:center">
          <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#7c3aed">${code}</span>
        </div>
        <p style="margin:20px 0 0;font-size:13px;color:#71717a">
          This code expires in 10 minutes. If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>
    `,
  })
}
