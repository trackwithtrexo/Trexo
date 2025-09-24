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
        subject = "Welcome to Trexo - Start Tracking Expenses Smarter! 🚀";
        htmlContent = `
        <div class="hero">
          <p>🎉 Welcome to the smartest way to track your expenses! Ready to take control of your finances?</p>
          <div class="verification-options">
            <a href="${link ?? "#"}" class="verify-button">Complete Your Journey</a>
          </div>
        </div>
        <div class="message">
          <p><strong>Track Expenses Smarter Than Ever</strong> - From chai to EMI, intelligent automation and beautiful insights await you. Join thousands of users who've revolutionized their financial management!</p>
        </div>`;
        break;

      case EmailType.FORGOT_PASSWORD:
        subject = "Reset Your Password - Get Back to Smart Tracking! 🔐";
        htmlContent = `
        <div class="hero">
          <p>Don't worry! Let's get you back to tracking your expenses smartly. Click below to reset your password:</p>
          <div class="verification-options">
            <a href="${link ?? "#"}" class="verify-button">Reset & Continue Tracking</a>
          </div>
        </div>
        <div class="message">
          <p>Your financial data is secure with us. If you didn't request this reset, simply ignore this email. <strong>Smart Financial Management</strong> is just one click away!</p>
        </div>`;
        break;

      case EmailType.EMAIL_VERIFICATION:
        subject = "Verify Your Email - Unlock Smart Financial Insights! ✨";
        htmlContent = `
        <div class="hero">
          <p>Almost there! Verify your email to unlock intelligent expense tracking and beautiful insights:</p>
          <div class="verification-options">
            <a href="${link ?? "#"}" class="verify-button">Verify & Start Tracking</a>
          </div>
        </div>
        <div class="message">
          <p>Get ready for <strong>Everything You Need for Smart Financial Management</strong> - AI-powered categorization, group expense sharing, and detailed reports await!</p>
        </div>`;
        break;

      case EmailType.EXPENSE: {
        const categoryColors: Record<string, string> = {
          Food: "#00D26A",
          Transportation: "#4F46E5",
          Entertainment: "#7C3AED",
          Healthcare: "#059669",
          Shopping: "#F59E0B",
          Bills: "#DC2626",
          Other: "#6B7280",
        };
        const categoryColor = data
          ? categoryColors[data.category] ?? "#00D26A"
          : "#00D26A";

        subject = `💰 New Expense Alert - ${data?.name ?? ""} | Trexo`;
        htmlContent = `
    <div class="hero" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; padding: 30px; border-radius: 16px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border: 2px solid #00D26A; margin-bottom: 25px; color: #ffffff;">
      <div style="border-left: 4px solid #00D26A; padding-left: 20px; margin-bottom: 25px;">
        <p style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: #00D26A;">💡 Smart Expense Alert</p>
        <p style="font-size: 18px; color: #e2e8f0;">Hey ${
          data?.name ?? "Financial Guru"
        }! A new expense has been tracked in your group.</p>
      </div>
      
      <div style="background: rgba(0, 210, 106, 0.1); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid rgba(0, 210, 106, 0.3);">
        <p style="font-size: 16px; margin: 0; color: #00D26A; font-weight: 600;">📊 Expense Details - Tracked Automatically</p>
      </div>

      <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin: 25px 0; border: 1px solid #374151; border-radius: 12px; overflow: hidden; background: #1f2937;">
        <thead>
          <tr style="background: linear-gradient(90deg, #00D26A 0%, #00B359 100%); color: #000000; text-align: left;">
            <th style="padding: 16px; font-size: 16px; font-weight: 700;">💼 Field</th>
            <th style="padding: 16px; font-size: 16px; font-weight: 700;">📋 Details</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background: #374151;">
            <td style="padding: 16px; border-top: 1px solid #4B5563; font-size: 15px; font-weight: 600; color: #D1D5DB;">💰 Amount</td>
            <td style="padding: 16px; border-top: 1px solid #4B5563; color: #00D26A; font-weight: bold; font-size: 18px;">₹${
              data?.amount?.toLocaleString() ?? ""
            }</td>
          </tr>
          <tr style="background: #4B5563;">
            <td style="padding: 16px; border-top: 1px solid #6B7280; font-size: 15px; font-weight: 600; color: #D1D5DB;">📝 Description</td>
            <td style="padding: 16px; border-top: 1px solid #6B7280; font-size: 15px; color: #F3F4F6;">${
              data?.description ?? "Smart expense tracking in action"
            }</td>
          </tr>
          <tr style="background: #374151;">
            <td style="padding: 16px; border-top: 1px solid #4B5563; font-size: 15px; font-weight: 600; color: #D1D5DB;">📅 Date</td>
            <td style="padding: 16px; border-top: 1px solid #4B5563; font-size: 15px; color: #F3F4F6;">${
              data?.date
              // d ? new Date(d.date).toLocaleDateString() : ""
            }</td>
          </tr>
          <tr style="background: #4B5563;">
            <td style="padding: 16px; border-top: 1px solid #6B7280; font-size: 15px; font-weight: 600; color: #D1D5DB;">🏷️ Category</td>
            <td style="padding: 16px; border-top: 1px solid #6B7280; font-size: 15px;">
              <span style="color: #000000; font-weight: bold; padding: 8px 16px; border-radius: 20px; background: ${categoryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">${
          data?.category ?? ""
        }</span>
            </td>
          </tr>
          <tr style="background: #374151;">
            <td style="padding: 16px; border-top: 1px solid #4B5563; font-size: 15px; font-weight: 600; color: #D1D5DB;">👤 Paid By</td>
            <td style="padding: 16px; border-top: 1px solid #4B5563; font-size: 15px; color: #00D26A; font-weight: 600;">${
              data?.paidBy ?? ""
            }</td>
          </tr>
        </tbody>
      </table>
      
      <div style="background: linear-gradient(135deg, rgba(0, 210, 106, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%); border-radius: 12px; padding: 20px; margin-top: 25px; border: 1px solid #00D26A; text-align: center;">
        <p style="font-size: 16px; margin: 0; color: #00D26A; font-weight: 600;">🔍 View detailed analytics and beautiful insights in your dashboard!</p>
      </div>
    </div>
    <div class="message" style="margin-top: 30px; text-align: center; padding: 20px; border-top: 1px solid #374151; background: #1f2937; border-radius: 8px;">
      <p style="font-size: 14px; color: #9CA3AF;">Track expenses smarter than ever with intelligent automation 📊</p>
    </div>`;
        break;
      }

      default:
        subject = "Trexo - Your Smart Financial Assistant 💼";
        htmlContent = `
        <div class="hero">
          <p>🚀 This is a notification from Trexo - Track Expenses Smarter Than Ever! Need help with your smart financial management? We're here for you!</p>
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
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%);
          color: #ffffff;
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 650px;
          margin: 0 auto;
          background: #1a1a1a;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid #374151;
        }
        .header {
          background: linear-gradient(135deg, #00D26A 0%, #00B359 100%);
          color: #000000;
          padding: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-50%, -50%) rotate(180deg); }
        }
        .header h1 {
          font-size: 32px;
          font-weight: bold;
          margin: 0;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header::after {
          content: '💰 Track Expenses Smarter Than Ever';
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-top: 8px;
          opacity: 0.8;
          position: relative;
          z-index: 1;
        }
        .hero {
          padding: 30px;
          background: #2d2d2d;
          color: #ffffff;
        }
        .hero p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
          color: #e2e8f0;
        }
        .verification-options {
          text-align: center;
          margin: 25px 0;
        }
        .verify-button {
          display: inline-block;
          background: linear-gradient(135deg, #00D26A 0%, #00B359 100%);
          color: #000000 !important;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 210, 106, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 210, 106, 0.4);
        }
        .message {
          padding: 25px 30px;
          background: #374151;
          color: #d1d5db;
        }
        .message p {
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }
        .footer {
          background: #1f2937;
          color: #9ca3af;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #374151;
        }
        .footer p {
          margin: 8px 0;
          font-size: 14px;
        }
        .email-address {
          color: #00D26A !important;
          text-decoration: none;
          font-weight: 600;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          color: #00D26A !important;
          text-decoration: none;
          margin: 0 15px;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .social-links a:hover {
          color: #00B359 !important;
        }
        @media (max-width: 600px) {
          .container {
            margin: 10px;
            border-radius: 16px;
          }
          .header h1 {
            font-size: 26px;
          }
          .verify-button {
            padding: 12px 24px;
            font-size: 14px;
          }
          table {
            font-size: 13px !important;
          }
          th, td {
            padding: 12px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Trexo</h1>
        </div>
        ${htmlContent}
        <div class="footer">
          <p><strong>🌟 Trusted by Thousands of Smart Users</strong></p>
          <p>Need help with your financial tracking? We're here!</p>
          <p>Email: <a href="mailto:spendwithme03@gmail.com" class="email-address">trackwithtrexo@gmail.com</a></p>
          <div class="social-links">
            <a href="https://facebook.com/trexo" target="_blank">Facebook</a>
            <a href="https://twitter.com/trexo" target="_blank">Twitter</a>
            <a href="https://instagram.com/trexo" target="_blank">Instagram</a>
          </div>
          <p>© 2024 Trexo - Smart Financial Management. All rights reserved.</p>
          <p style="font-size: 12px; color: #6B7280; margin-top: 15px;">From chai to EMI — track it all with intelligent automation 🤖</p>
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