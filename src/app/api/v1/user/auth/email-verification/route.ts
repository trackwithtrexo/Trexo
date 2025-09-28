import { getUserByEmail } from "@/action/data/user";
import { getVerifationTokenByToken } from "@/action/data/verification-token";
import PRISMA from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { token } = await req.json();

    const existingToken = await getVerifationTokenByToken(token);

    if (!existingToken) {
      return NextResponse.json(
        {
          error: "Token does not exist!",
        },
        { status: 400 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        {
          error: "Token has expited!",
        },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return NextResponse.json(
        {
          error: "User does not exist!",
        },
        { status: 400 }
      );
    }

    if (existingUser.emailVerified) {
      return NextResponse.json(
        {
          error: "Email already verified!",
        },
        { status: 400 }
      );
    }

    if (existingUser.image !== null) {
      return NextResponse.json(
        {
          error: "You are registered with google",
        },
        { status: 400 }
      );
    }

    await PRISMA.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),

        // Reuse this when user wants to change there email
        email: existingToken.email,
      },
    });

    await PRISMA.tokens.delete({
      where: {
        id: existingToken.id,
        type: "EmailVerification",
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Email verified successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ message: "Failed to verify email" }), {
      status: 500,
    });
  }
}
