import { sendMail } from "@/service/sendmail";
import { SignIn } from "@/types/authTypes";
import { setCookie, tokenBuilder } from "@/utils/authUtils";
import { EmailType, TokenType } from "@/utils/enum";
import { createLink, createVerificationToken } from "@/utils/helper";
import PRISMA from "@/utils/prisma";
import { signInSchema } from "@/validation/authValidation";
import { compare } from "bcryptjs";

export async function POST(req: Request): Promise<Response> {
  try {
    // TODU
    const { email, password } = (await req.json()) as SignIn;

    signInSchema.parse({ email, password });

    const user = await PRISMA.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("user not found");
    }

    if (!user.status) {
      const token = await createVerificationToken({
        email,
        type: TokenType.EMAIL_VERIFICATION,
      });

      sendMail({
        email,
        link: createLink(token, TokenType.EMAIL_VERIFICATION),
        Type: EmailType.EMAIL_VERIFICATION,
      });
      throw new Error("Please verify your email");
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = await tokenBuilder({ id: user.id, role: user.role });

    await PRISMA.user.update({
      where: { id: user.id },
      data: { jwtToken: token.accessToken },
    });

    await setCookie({
      key: "trexo",
      data: token.accessToken,
      maxDays: 1,
    });

    return Response.json({
      status: 200,
      message: "Sign in successful",
      token: token.accessToken,
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
