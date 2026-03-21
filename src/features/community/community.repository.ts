import { prisma } from '@/lib/db';
import type { RoomWithMembers } from './community.types';

export async function createRoom(data: {
  name: string;
  code: string;
  coordinatorId: string;
  year: number;
  expiresAt: Date;
}) {
  return prisma.communityRoom.create({ data });
}

export async function findRoomByCode(code: string): Promise<RoomWithMembers | null> {
  return prisma.communityRoom.findUnique({
    where: { code },
    include: {
      coordinator: { select: { id: true, name: true, image: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, image: true } },
          saint: { select: { id: true, name: true, slug: true, imageUrl: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });
}

export async function findRoomById(id: string): Promise<RoomWithMembers | null> {
  return prisma.communityRoom.findUnique({
    where: { id },
    include: {
      coordinator: { select: { id: true, name: true, image: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, image: true } },
          saint: { select: { id: true, name: true, slug: true, imageUrl: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
  });
}

export async function addMember(roomId: string, userId: string) {
  return prisma.roomMember.create({
    data: { roomId, userId },
  });
}

export async function findMember(roomId: string, userId: string) {
  return prisma.roomMember.findUnique({
    where: { roomId_userId: { roomId, userId } },
  });
}

export async function updateMemberSaint(roomId: string, userId: string, saintId: string) {
  return prisma.roomMember.update({
    where: { roomId_userId: { roomId, userId } },
    data: { saintId, drawnAt: new Date() },
  });
}

export async function getUserRooms(userId: string): Promise<RoomWithMembers[]> {
  const memberships = await prisma.roomMember.findMany({
    where: { userId },
    select: { roomId: true },
  });

  const roomIds = memberships.map((m) => m.roomId);

  return prisma.communityRoom.findMany({
    where: { id: { in: roomIds } },
    include: {
      coordinator: { select: { id: true, name: true, image: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, image: true } },
          saint: { select: { id: true, name: true, slug: true, imageUrl: true } },
        },
        orderBy: { joinedAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
