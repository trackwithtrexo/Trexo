import { getUserByEmail } from "@/actions/data/user";
import { CLIENT_URL, SMTP_MAIL, SMTP_PASSWORD } from "@/config/config";
import PRISMA from "@/utils/prisma";
import { generateVerificationToken } from "@/utils/tokens";
import { SignUpSchema } from "@/validator/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendVerificationEmail(
  email: string,
  token: string,
  name: string,
) {
  const VerificationLink = `${CLIENT_URL}/auth/email-verification?token=${token}`;
  console.log("Verification Link", VerificationLink);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMTP_MAIL,
    to: email,
    subject: "Email Verification For Spendwise",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Spendwise Account</title>
</head>
<body>
    <div style="margin:0;padding:0;background:linear-gradient(180deg,#f7faf7 0%,#eef5ef 100%);font-family:Arial,Helvetica,sans-serif;color:#17301f;">
      <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border:1px solid #e3ebe3;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(24, 46, 31, 0.08);">
          <div style="background:linear-gradient(135deg,#0f5132 0%,#1f7a49 55%,#34a853 100%);padding:28px 24px;text-align:center;color:#ffffff;">
            <div style="display:inline-flex;align-items:center;gap:14px;">
              <img src="/Logo.svg" alt="Spendwise Logo" width="48" height="48" style="display:block;border-radius:14px;border:1px solid rgba(255,255,255,0.25);background:#ffffff;object-fit:cover;" />
              <div style="text-align:left;">
                <div style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.85;">Spendwise</div>
                <div style="font-size:26px;line-height:1.1;font-weight:700;">Verify your email</div>
              </div>
            </div>
          </div>

          <div style="padding:36px 28px 30px;">
            <div style="display:inline-block;padding:8px 12px;border-radius:999px;background:#eaf6ee;color:#1f7a49;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:18px;">
              Account Security
            </div>

            <h1 style="margin:0 0 14px;font-size:28px;line-height:1.2;color:#17301f;">Hi ${name}, welcome to Spendwise</h1>
            <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#4d5d51;">
              Your account is almost ready. Confirm your email address to keep your profile secure and start using Spendwise.
            </p>

            <div style="text-align:center;margin:28px 0 22px;">
              <a href="${VerificationLink}" style="display:inline-block;background:linear-gradient(135deg,#1f7a49 0%,#34a853 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;line-height:1;padding:15px 28px;border-radius:14px;box-shadow:0 12px 24px rgba(52,168,83,0.25);">
                Verify email address
              </a>
            </div>

            <div style="background:#f5faf6;border:1px solid #dfe9e2;border-radius:16px;padding:18px 18px 16px;margin-bottom:20px;">
              <div style="font-size:14px;font-weight:700;color:#17301f;margin-bottom:8px;">What this does</div>
              <p style="margin:0;font-size:14px;line-height:1.65;color:#516256;">
                This confirms you own <strong>${email}</strong> and helps protect your account.
              </p>
            </div>

            <div style="border-left:4px solid #34a853;background:#f8fcf9;padding:14px 16px;border-radius:12px;margin-bottom:20px;">
              <p style="margin:0;font-size:14px;line-height:1.65;color:#3f5145;">
                This verification link expires in 24 hours.
              </p>
            </div>

            <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#4d5d51;">
              If the button does not work, paste this link into your browser:
            </p>
            <p style="margin:0;word-break:break-all;font-size:13px;line-height:1.7;color:#1f7a49;background:#f5faf6;border:1px solid #dfe9e2;padding:12px 14px;border-radius:12px;">
              ${VerificationLink}
            </p>
          </div>

          <div style="padding:20px 28px 28px;background:#f8faf8;border-top:1px solid #e3ebe3;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#5d6b61;">
              If you did not create an account, you can safely ignore this email.
            </p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#7a8780;">
              Need help? Contact us at <a href="mailto:etracker690@gmail.com" style="color:#1f7a49;text-decoration:none;font-weight:700;">etracker690@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
</body>
</html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification Mail sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending Verification email:", error);
    throw error;
  }
}

// ...existing code...
export async function POST(req: Request) {
  try {
    const values = await req.json();
    const validation = SignUpSchema.safeParse(values);

    if (validation.error) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: validation.error.format(),
        },
        { status: 400 },
      );
    }

    const { email, password, name } = validation.data;

    const existinguser = await getUserByEmail(email);
    if (existinguser) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await PRISMA.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    try {
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        name,
      );
    } catch (mailError) {
      console.error("Error sending verification email:", mailError);
      // Email failure shouldn't block user creation; respond with created but warn client
      return NextResponse.json(
        { message: "User created but verification email failed to send." },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { message: "Confirmation email sent!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error while signing up user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
