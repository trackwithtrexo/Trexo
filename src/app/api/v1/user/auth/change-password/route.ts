"use server";
import bcrypt from "bcryptjs";
import PRISMA from "@/utils/prisma";
import { getpasswordResetTokenByToken } from "@/action/data/password-reset-token";
import { getUserByEmail } from "@/action/data/user";
import { NewPasswordSchema } from "@/validation/authValidation";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { token, password, confirmPassword } = await req.json();

    if (!token) {
      return NextResponse.json(
        {
          error: "Missing token!",
        },
        { status: 400 }
      );
    }

    const { data, error } = NewPasswordSchema.safeParse({
      password,
      confirmPassword,
    });

    if (error) {
      return NextResponse.json(
        {
          error: "Invalid Fields!",
          details: error.format(),
        },
        { status: 400 }
      );
    }

    const existingToken = await getpasswordResetTokenByToken(token);

    if (!existingToken) {
      return NextResponse.json(
        {
          error: "Invalid token!",
        },
        { status: 400 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        {
          error: "Token has expired!",
        },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return NextResponse.json(
        {
          error: "Email does not exist",
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

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await PRISMA.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await PRISMA.tokens.delete({
      where: { id: existingToken.id, type: "PasswordReset" },
    });

    return NextResponse.json({ success: "Password updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
