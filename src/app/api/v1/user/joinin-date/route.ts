import { loginUser } from "@/app/action/auth-action";
import PRISMA from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await loginUser();

    const userData = await PRISMA.user.findUnique({
      where: { id: userId },
      select: { emailVerified: true },
    });

    if (!userData || !userData.emailVerified) {
      return NextResponse.json(
        { error: "Joinin date not found" },
        { status: 404 }
      );
    }

    console.log("Fetched joinin date:", userData);

    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    console.error("Error while signing up user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
