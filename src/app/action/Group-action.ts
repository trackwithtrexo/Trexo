import PRISMA from "@/utils/prisma";
import { loginUser } from "@/app/action/auth-action";
import { AddGroupData, AddGroupResult } from "@/types/groupTypes";

//Code to generate unique code for group
async function generateUniqueCode(length: number = 6): Promise<string> {
  // Generate a random string of the specified length
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code: string;

  while (true) {
    // Generate a random string of the specified length
    code = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");

    // Check if the code already exists in the database
    const existingGroup = await PRISMA.group.findUnique({
      where: { code },
    });

    if (!existingGroup) {
      return code;
    }
  }
}

export async function AddnewGroup({
  data,
}: {
  data: AddGroupData;
}): Promise<AddGroupResult> {
  // console.log("Function called", data)
  try {
    const user = await loginUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const code = await generateUniqueCode();

    const newGroup = await PRISMA.group.create({
      data: {
        name: data.name,
        description: data.description,
        code: code,
        creatorId: user,
        members: {
          create: {
            userId: user,
          },
        },
      },
    });

    return { success: true, code: newGroup.code };
  } catch (error) {
    console.error("Error creating group:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create group",
    };
  }
}

export async function joinGroup(code: string) {
  try {
    const user = await loginUser();

    // Check For Login
    if (!user) {
      return { success: false, message: "User not authenticated" };
    }

    // Check for validity of the code
    if (code.length !== 6 || !code.match(/^[a-zA-Z0-9]+$/)) {
      return { success: false, message: "Invalid group code" };
    }

    const group = await PRISMA.group.findUnique({
      where: { code },
      include: { members: true, joinRequests: true },
    });

    // If no such group is found
    if (!group) {
      return { success: false, message: "Group not found" };
    }

    // Check if user is already a member
    const isMember = group.members.some((member) => member.userId === user);
    if (isMember) {
      return {
        success: false,
        message: "You are already a member of this group",
      };
    }

    // Check if user has a pending request to this group
    const hasPendingRequest = group.joinRequests.some(
      (request) => request.userId === user && request.status === "PENDING"
    );
    if (hasPendingRequest) {
      return {
        success: false,
        message: "You already have a pending request for this group",
      };
    }

    const newJoinRequest = await PRISMA.joinRequest.create({
      data: {
        userId: user,
        groupId: group.id,
        status: "PENDING",
      },
    });

    // sendJoinRequestNotification(group.id, user);

    return {
      success: true,
      message: "Join request sent successfully",
      requestId: newJoinRequest.id,
      userId: user,
      groupId: group.id,
      groupName: group.name,
      groupCode: group.code,
      groupDescription: group.description,
      groupImage: group.photo,
      groupCreator: group.creatorId,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to join group",
    };
  }
}

export async function cancelPendingRequest(requestId: string) {
  try {
    const user = await loginUser();

    if (!user || !user) {
      return { success: false, message: "User not authenticated" };
    }

    const request = await PRISMA.joinRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return { success: false, message: "Request not found" };
    }

    if (request.userId !== user) {
      return {
        success: false,
        message: "You are not authorized to cancel this request",
      };
    }

    await PRISMA.joinRequest.delete({ where: { id: requestId } });
    return { success: true, message: "Request canceled successfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to cancel request",
    };
  }
}

// async function sendJoinRequestNotification(
//   groupId: string,
//   requesterId: string
// ) {
//   console.log(
//     `Attempting to send notification for group ${groupId} and requester ${requesterId}`
//   );
//   try {
//     const groupQuery = PRISMA.group.findUnique({
//       where: { id: groupId },
//       include: { creator: { include: { pushSubscriptions: true } } },
//     });

//     const requesterQueryb = PRISMA.user.findUnique({
//       where: { id: requesterId },
//       select: { name: true },
//     });

//     const [group, requester] = await Promise.all([groupQuery, requesterQueryb]);

//     if (!group || !group.creator.pushSubscriptions.length || !requester) {
//       console.log(
//         `No valid subscriptions found for group ${groupId} or requester not found`
//       );
//       return;
//     }

//     const notificationPayload = JSON.stringify({
//       title: "New Join Request",
//       body: `${requester.name} has requested to join your group "${group.name}"`,
//       type: "join-request",
//       data: {
//         url: `/group/${groupId}/requests`,
//         groupId: groupId,
//       },
//     });

//     const sendPromises = group.creator.pushSubscriptions.map(
//       async (subscription) => {
//         try {
//           await webpush.sendNotification(
//             {
//               endpoint: subscription.endpoint,
//               keys: {
//                 auth: subscription.auth,
//                 p256dh: subscription.p256dh,
//               },
//             },
//             notificationPayload,
//             {
//               vapidDetails: {
//                 subject: "mailto:etracker690@gmail.com",
//                 publicKey: process.env.NEXT_PUBLIC_VAPID_KEY as string,
//                 privateKey: process.env.PRIVATE_VAPID_KEY as string,
//               },
//             }
//           );
//         } catch (error: any) {
//           if (error.statusCode === 410) {
//             console.log(
//               `Subscription expired for endpoint: ${subscription.endpoint}`
//             );
//             await PRISMA.pushSubscription.delete({
//               where: { id: subscription.id },
//             });
//           }
//         }
//       }
//     );

//     await Promise.all(sendPromises);
//   } catch (error) {
//     console.error("Error in sendJoinRequestNotification:", error);
//   }
// }
