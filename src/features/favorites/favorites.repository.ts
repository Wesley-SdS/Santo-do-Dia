import { prisma } from '@/lib/db';
import type { FavoriteWithSaint } from './favorites.types';

export async function findFavorite(userId: string, saintId: string) {
  return prisma.favorite.findUnique({
    where: { userId_saintId_listName: { userId, saintId, listName: 'favorites' } },
  });
}

export async function createFavorite(userId: string, saintId: string) {
  return prisma.favorite.create({
    data: { userId, saintId, listName: 'favorites' },
  });
}

export async function deleteFavorite(userId: string, saintId: string) {
  return prisma.favorite.delete({
    where: { userId_saintId_listName: { userId, saintId, listName: 'favorites' } },
  });
}

export async function getUserFavorites(userId: string): Promise<FavoriteWithSaint[]> {
  return prisma.favorite.findMany({
    where: { userId, listName: 'favorites' },
    include: {
      saint: {
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrl: true,
          feastMonth: true,
          feastDay: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function isFavorited(userId: string, saintId: string): Promise<boolean> {
  const count = await prisma.favorite.count({
    where: { userId, saintId, listName: 'favorites' },
  });
  return count > 0;
}

export async function findAmenToday(userId: string, saintId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return prisma.amen.findUnique({
    where: { userId_saintId_date: { userId, saintId, date: today } },
  });
}

export async function createAmen(userId: string, saintId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return prisma.amen.create({
    data: { userId, saintId, date: today },
  });
}

export async function countAmens(saintId: string): Promise<number> {
  return prisma.amen.count({ where: { saintId } });
}

export async function countTodayAmens(saintId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return prisma.amen.count({ where: { saintId, date: today } });
}
