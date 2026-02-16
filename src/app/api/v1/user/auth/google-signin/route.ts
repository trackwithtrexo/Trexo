import { getUserByEmail } from "@/action/data/user";
import { GOOGLE_CLIENT_ID } from "@/config/config";
import { setCookie, tokenBuilder } from "@/utils/authUtils";
import { client } from "@/utils/helper";
import PRISMA from "@/utils/prisma";
import { emailTokenVerification } from "@/validation/authValidation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();

    const validation = emailTokenVerification.safeParse(values);

    if (validation.error) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { token } = validation.data;

    // ✅ Exchange authorization code for tokens
    const { tokens } = await client.getToken(token);
    const idToken = tokens.id_token;

    if (!idToken) {
      return NextResponse.json(
        { error: "No id_token received from Google" },
        { status: 400 }
      );
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const { email, picture, name } = ticket.getPayload() || {};

    const existinguser = await getUserByEmail(email as string);
    if (existinguser) {
      if (existinguser.emailVerified === null) {
        await PRISMA.user.update({
          where: { email: email as string },
          data: { emailVerified: new Date() },
        });
      }

      if (!existinguser?.image) {
        await PRISMA.user.update({
          where: { email: email as string },
          data: { image: picture },
        });
      }

      const JWT = await tokenBuilder({ id: existinguser.id });

      await setCookie({
        key: "trackwithtrexo",
        data: JWT.accessToken,
        maxDays: 60 * 60 * 24,
      });

      return NextResponse.json(
        { message: "Signed in successfully" },
        { status: 200 }
      );
    }

    const user = await PRISMA.user.create({
      data: {
        name: name as string,
        email,
      },
    });

    const JWT = await tokenBuilder({ id: user.id });

    await setCookie({
      key: "trackwithtrexo",
      data: JWT.accessToken,
      maxDays: 60 * 60 * 24,
    });

    return NextResponse.json(
      { message: "Signup in successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while signing up user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
