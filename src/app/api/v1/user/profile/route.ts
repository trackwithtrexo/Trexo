import { GoogleUser, User } from "@/generated/prisma";
import { Role } from "@/utils/enum";
import PRISMA from "@/utils/prisma";

export async function GET(req: Request): Promise<Response> {
  try {
    const userId: string | null = req.headers.get("x-user-id");
    const userRole: string | null = req.headers.get("x-user-role");

    if (!userId || !userRole) {
      throw new Error("Please Login again");
    }

    let user: User | GoogleUser | null;

    if (userRole === Role.USER) {
      user = await PRISMA.user.findUnique({ where: { id: userId } });
    } else {
      user = await PRISMA.googleUser.findUnique({ where: { id: userId } });
    }

    if (!user) {
      throw new Error("User Not Found");
    }

    return Response.json({
      status: 200,
      user,
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
