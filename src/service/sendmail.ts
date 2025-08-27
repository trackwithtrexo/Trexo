import { createTransport, SendMailOptions } from "nodemailer";
import { SMTP_MAIL, SMTP_PASSWORD } from "../config/config";
import { EmailType } from "@/utils/enum";
import { Email } from "@/types/authTypes";

// CREATE TRANSPORTER OBJECT FOR SENDING EMAIL USING SMTP SERVER OF GMAIL SERVICE
const transport = createTransport({
  service: "gmail",
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASSWORD,
  },
});

/**
 * Send email (Promise-based). Throws on error.
 */
export const sendMail = async ({
  link,
  email,
  Type,
  data,
}: Email): Promise<void> => {
  let subject = "";
  let htmlContent = "";

  try {
    switch (Type) {
      case EmailType.SIGNUP:
        subject = "Welcome to Spend With Me - Complete Your Signup!";
        htmlContent = `
        <div class="hero">
          <p>Thanks for joining us! Click the button below to complete your signup:</p>
          <div class="verification-options">
            <a href="${link ?? "#"}" class="verify-button">Complete Signup</a>
          </div>
        </div>
        <div class="message">
          <p>Welcome to Spend With Me! We're excited to have you on board. If you didn't request this email, you can safely ignore it.</p>
        </div>`;
        break;

      case EmailType.FORGOT_PASSWORD:
        subject = "Reset Your Password - Spend With Me";
        htmlContent = `
        <div class="hero">
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <div class="verification-options">
            <a href="${link ?? "#"}" class="verify-button">Reset Password</a>
          </div>
        </div>
        <div class="message">
          <p>If you didn't request a password reset, you can safely ignore this email. Your account security is important to us.</p>
        </div>`;
        break;

      case EmailType.EMAIL_VERIFICATION:
        subject = "Verify Your Email - Spend With Me";
        htmlContent = `
        <div class="hero">
          <p>Please verify your email address by clicking the button below:</p>
          <div class="verification-options">
            <a href="${link ?? "#"}" class="verify-button">Verify Email</a>
          </div>
        </div>
        <div class="message">
          <p>If you didn't request this verification, you can safely ignore this email.</p>
        </div>`;
        break;

      case EmailType.EXPENSE: {
        const categoryColors: Record<string, string> = {
          Food: "#FF5733",
          Transportation: "#33B5FF",
          Entertainment: "#8E44AD",
          Healthcare: "#28B463",
          Shopping: "#FFC300",
          Bills: "#E74C3C",
          Other: "#95A5A6",
        };
        const categoryColor = data
          ? categoryColors[data.category] ?? "#95A5A6"
          : "#95A5A6";

        subject = `Expense Notification - ${data?.name ?? ""}`;
        htmlContent = `
    <div class="hero" style="font-family: Arial, sans-serif; line-height: 1.6; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
      <div style="border-left: 3px solid ${categoryColor}; padding-left: 15px; margin-bottom: 20px;">
        <p style="font-size: 22px; font-weight: bold; margin-bottom: 5px;">Hello ${
          data?.name ?? "User"
        },</p>
        <p style="font-size: 16px;">An expense has been added to your group. Here are the details:</p>
      </div>
      <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin: 20px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background-color: #4c51bf; color: white; text-align: left;">
            <th style="padding: 14px; font-size: 16px;">Field</th>
            <th style="padding: 14px; font-size: 16px;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 500;">Amount</td>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; color: #FF0000; font-weight: bold; font-size: 16px;">₹${
              data?.amount?.toLocaleString() ?? ""
            }</td>
          </tr>
          <tr style="background-color: #f7fafc;">
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 500;">Description</td>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px;">${
              data?.description ?? "No description provided"
            }</td>
          </tr>
          <tr>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 500;">Date</td>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px;">${
              data?.date
              // d ? new Date(d.date).toLocaleDateString() : ""
            }</td>
          </tr>
          <tr style="background-color: #f7fafc;">
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 500;">Category</td>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px;">
              <span style="color: ${categoryColor}; font-weight: bold; padding: 5px 10px; border-radius: 12px; background-color: #fff; border: 1px solid ${categoryColor};">${
          data?.category ?? ""
        }</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 500;">Paid By</td>
            <td style="padding: 14px; border-top: 1px solid #e2e8f0; font-size: 15px;">${
              data?.paidBy ?? ""
            }</td>
          </tr>
        </tbody>
      </table>
      <div style="background-color: #ebf4ff; border-radius: 8px; padding: 15px; margin-top: 20px; border: 1px solid #3b82f6;">
        <p style="font-size: 16px; margin: 0;">Please log in to your account to view more details or make changes.</p>
      </div>
    </div>
    <div class="message" style="margin-top: 25px; text-align: center; padding: 15px; border-top: 1px solid #e2e8f0;">
      <p style="font-size: 14px;">If you have any questions, feel free to contact us.</p>
    </div>`;
        break;
      }

      default:
        subject = "Spend With Me Notification";
        htmlContent = `
        <div class="hero">
          <p>This is a notification from Spend With Me. Please contact support if you have any questions.</p>
        </div>`;
        break;
    }

    const mailOptions: SendMailOptions = {
      from: SMTP_MAIL,
      to: email,
      subject,
      html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>/* styles omitted for brevity */</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Spend With Me</h1>
        </div>
        ${htmlContent}
        <div class="footer">
          <p>Need help? Contact us:</p>
          <p>Email: <a href="mailto:spendwithme03@gmail.com" class="email-address">spendwithme03@gmail.com</a></p>
          <div class="social-links">
            <a href="https://facebook.com/spendwithme" target="_blank">Facebook</a>
            <a href="https://twitter.com/spendwithme" target="_blank">Twitter</a>
            <a href="https://instagram.com/spendwithme" target="_blank">Instagram</a>
          </div>
          <p>© 2024 Spend With Me. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>`,
    };

    await transport.sendMail(mailOptions);
    console.log("Email sent");
  } catch (err) {
    console.error("Error sending email");
    console.error(err as Error);
    throw err instanceof Error ? err : new Error("Failed to send email");
  }
};
