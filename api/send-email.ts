import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const {
      formType = "General Inquiry",
      name = "Website Visitor",
      email = "Not provided",
      phone = "Not provided",
      company = "Not provided",
      message = "No message body",
      details = {},
      subject,
    } = req.body || {};

    const targetRecipient = process.env.SMTP_TO || "nimesh.patel@vratsystems.com, nimeshpatel.vsi@gmail.com";
    const emailSubject = subject || `[VRAT SYSTEM] New ${formType} from ${name}`;

    // Format extra details rows
    const extraRows = Object.entries(details)
      .map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">${k}</td><td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${v}</td></tr>`)
      .join("");

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 24px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px;">VRAT SYSTEM INTEGRATORS</h2>
        <p style="margin: 4px 0 0; font-size: 13px; color: #93c5fd; text-transform: uppercase;">New ${formType} Notification</p>
      </div>
      <div style="padding: 24px;">
        <p style="margin: 0 0 16px; font-size: 14px; color: #334155;">
          You have received a new submission from the official website (<strong>https://vratsystems.com</strong>):
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; width: 35%;">Submission Type</td>
            <td style="padding: 8px 12px; color: #0284c7; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${formType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">Full Name</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">Email Address</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">Company / Org</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${company}</td>
          </tr>
          ${extraRows}
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; vertical-align: top;">Message</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569;">Received Date/Time</td>
            <td style="padding: 8px 12px; color: #64748b;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
          </tr>
        </table>
        <div style="background: #f8fafc; border-radius: 8px; padding: 12px; font-size: 11px; color: #64748b; text-align: center;">
          This message was generated automatically by the VRAT SYSTEM web integration portal.
        </div>
      </div>
    </div>
    `;

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"VRAT SYSTEM Web Portal" <${smtpUser}>`,
        to: targetRecipient,
        replyTo: email && email.includes("@") ? email : undefined,
        subject: emailSubject,
        html: htmlContent,
      });

      return res.status(200).json({
        success: true,
        message: "Email delivered successfully via SMTP to " + targetRecipient,
      });
    } else {
      // SMTP not configured yet with user/pass
      console.log(`[Form Submission - Stored] To: ${targetRecipient} | Type: ${formType} | From: ${name} (${email})`);
      return res.status(200).json({
        success: true,
        delivered: false,
        message: "Inquiry received and recorded successfully for " + targetRecipient,
      });
    }
  } catch (error: any) {
    console.error("Email API Handler Error:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Failed to deliver email through SMTP",
    });
  }
}

