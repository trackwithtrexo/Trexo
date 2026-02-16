import { loginUser } from "@/app/action/auth-action";
import { Group, JoinRequest } from "@/generated/prisma";
import PRISMA from "@/utils/prisma";
import GroupContent from "@/app/(dashboard)/group/GroupContent";

export type MemberGroup = Group;

export type CreatedGroup = {
  id: string;
  name: string;
  description: string | null;
  code: string;
  membersCount: number;
  pendingRequestsCount: number;
};

export type PendingRequest = JoinRequest & {
  group: Group;
};

export default async function GroupManagementPage() {
  const user = await loginUser();

  const [createdGroups, memberGroups, pendingRequests] = await Promise.all([
    PRISMA.group.findMany({
      where: {
        creatorId: user,
      },
      select: {
        id: true,
        name: true,
        description: true,
        code: true,
        _count: {
          select: {
            members: true,
            joinRequests: {
              where: { status: "PENDING" },
            },
          },
        },
      },
    }),
    PRISMA.group.findMany({
      where: {
        members: {
          some: { userId: user },
        },
      },
    }) as Promise<MemberGroup[]>,
    PRISMA.joinRequest.findMany({
      where: {
        userId: user,
        status: "PENDING",
      },
      include: {
        group: true,
      },
    }) as Promise<PendingRequest[]>,
  ]);

  const createdGroupsData: CreatedGroup[] = createdGroups.map((group) => ({
    id: group.id,
    name: group.name,
    description: group.description,
    code: group.code,
    membersCount: group._count.members,
    pendingRequestsCount: group._count.joinRequests,
  }));

  return (
    <GroupContent
      createdGroupsData={createdGroupsData}
      memberGroups={memberGroups}
      pendingRequests={pendingRequests}
    />
  );
}
