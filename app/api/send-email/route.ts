import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, from, subject, name, message } = await request.json()

    // Validate required fields
    if (!to || !from || !subject || !name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(from) || !emailRegex.test(to)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // In a real application, you would use a service like:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // Example with a hypothetical email service:
    /*
    const emailService = new EmailService({
      apiKey: process.env.EMAIL_API_KEY
    })
    
    await emailService.send({
      to: to,
      from: 'noreply@yourdomain.com',
      replyTo: from,
      subject: subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${from})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })
    */

    // For demonstration purposes, we'll simulate a successful email send
    // In production, replace this with actual email sending logic
    console.log("Email would be sent:", {
      to,
      from,
      subject,
      name,
      message,
    })

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
