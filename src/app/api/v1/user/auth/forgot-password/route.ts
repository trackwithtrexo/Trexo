import { User } from "@/generated/prisma";
import { sendMail } from "@/service/sendmail";
import { EmailType, TokenType } from "@/utils/enum";
import { createLink, createVerificationToken } from "@/utils/helper";
import PRISMA from "@/utils/prisma";
import { emailVerification } from "@/validation/authValidation";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email } = (await req.json()) as { email: string };

    emailVerification.parse({ email });

    const user: User | null = await PRISMA.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.status) {
      throw new Error("Please verify your email");
    }

    const token = await createVerificationToken({
      email,
      type: TokenType.FORGOT_PASSWORD,
    });

    await PRISMA.token.create({
      data: {
        email: user.email,
        token,
        tokenType: TokenType.FORGOT_PASSWORD,
        expiresIn: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    sendMail({
      email,
      link: createLink(token, "new-password"),
      Type: EmailType.FORGOT_PASSWORD,
    });

    return Response.json({
      status: 200,
      message: "Forgot password email sent successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ message: "Failed to send forgot password email" }), {
      status: 500,
    });
  }
}
