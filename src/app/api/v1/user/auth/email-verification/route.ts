import { Token, TOKEN_STATUS } from "@/generated/prisma";
import PRISMA from "@/utils/prisma";
import { emailTokenVerification } from "@/validation/authValidation";

export async function POST(req: Request): Promise<Response> {
  try {
    const { token } = (await req.json()) as { token: string };

    emailTokenVerification.parse({ token });

    const tokenData: Token | null = await PRISMA.token.findFirst({
      where: { token },
    });

    if (!tokenData) {
      throw new Error("Link is expired");
    }

    if (tokenData.tokenStatus === TOKEN_STATUS.VALIDATE) {
      throw new Error("Link is expired");
    }

    if (tokenData.expiresIn < new Date()) {
      throw new Error("Link is expired");
    }

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
      message: "Email verified successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response(
      JSON.stringify({ message: "Failed to verify email" }),
      {
        status: 500,
      }
    );
  }
}
