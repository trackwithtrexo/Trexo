import { Token, TOKEN_STATUS } from "@/generated/prisma";
import { ChangePassword } from "@/types/authTypes";
import PRISMA from "@/utils/prisma";
import { TokenVerification } from "@/validation/authValidation";
import bcrypt from "bcryptjs";

export async function POST(req: Request): Promise<Response> {
  try {
    const { token, password, confirmPassword } =
      (await req.json()) as ChangePassword;

    TokenVerification.parse({
      token,
      password,
      confirmPassword,
    });

    const tokenData: Token | null = await PRISMA.token.findFirst({
      where: { token },
    });

    if (!tokenData) {
      throw new Error("Link is expired");
    }

    if (tokenData.tokenStatus !== TOKEN_STATUS.VALIDATE) {
      throw new Error("Link is expired");
    }

    if (new Date() < tokenData.expiresIn) {
      throw new Error("Link is expired");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await PRISMA.user.update({
      where: {
        email: tokenData.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await PRISMA.token.update({
      where: {
        id: tokenData.id,
      },
      data: {
        tokenStatus: TOKEN_STATUS.DELETED,
      },
    });

    return Response.json({
      status: 200,
      message: "Password changed successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response(
      JSON.stringify({ message: "Failed to change password" }),
      {
        status: 500,
      }
    );
  }
}
