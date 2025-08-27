import { sendMail } from "@/service/sendmail";
import { SignUp } from "@/types/authTypes";
import { EmailType, TokenType } from "@/utils/enum";
import { createLink, createVerificationToken } from "@/utils/helper";
import PRISMA from "@/utils/prisma";
import { signUpSchema } from "@/validation/authValidation";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password, name } = (await req.json()) as SignUp;

    signUpSchema.parse({ email, password, name });

    const user = await PRISMA.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new Error("user already exists");
    }

    await PRISMA.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    const token = await createVerificationToken({
      email,
      type: TokenType.SIGNUP,
    });

    sendMail({
      email,
      link: createLink(token, TokenType.EMAIL_VERIFICATION),
      Type: EmailType.EMAIL_VERIFICATION,
    });

    return Response.json({
      status: 200,
      message: "Sign Up successful please verify your email",
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        error: error.message,
        status: 400,
      });
    } else {
      return Response.json({
        error: "Failed to sign in",
        status: 500,
      });
    }
  }
}
