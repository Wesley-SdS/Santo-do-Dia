import { getRandomSaintForDraw } from '@/features/saints';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { createChildLogger } from '@/lib/logger';
import * as communityRepo from './community.repository';

const logger = createChildLogger({ module: 'community.service' });

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createRoom(name: string, coordinatorId: string) {
  const year = new Date().getFullYear();
  const expiresAt = new Date(year, 11, 31, 23, 59, 59);
  const code = generateCode();

  const room = await communityRepo.createRoom({
    name,
    code,
    coordinatorId,
    year,
    expiresAt,
  });

  await communityRepo.addMember(room.id, coordinatorId);

  logger.info({ roomId: room.id, code }, 'Community room created');
  return communityRepo.findRoomById(room.id);
}

export async function joinRoom(code: string, userId: string) {
  const room = await communityRepo.findRoomByCode(code);
  if (!room) throw new NotFoundError('Sala não encontrada');

  if (room.expiresAt < new Date()) {
    throw new ValidationError('Esta sala expirou');
  }

  const existing = await communityRepo.findMember(room.id, userId);
  if (existing) throw new ValidationError('Você já está nesta sala');

  await communityRepo.addMember(room.id, userId);
  logger.info({ roomId: room.id, userId }, 'Member joined room');
  return communityRepo.findRoomById(room.id);
}

export async function drawSaintInRoom(roomId: string, userId: string) {
  const member = await communityRepo.findMember(roomId, userId);
  if (!member) throw new NotFoundError('Você não é membro desta sala');
  if (member.saintId) throw new ValidationError('Você já sorteou seu santo nesta sala');

  const saint = await getRandomSaintForDraw();
  await communityRepo.updateMemberSaint(roomId, userId, saint.id);

  logger.info({ roomId, userId, saintId: saint.id }, 'Saint drawn in room');
  return saint;
}

export async function getRoomByCode(code: string) {
  const room = await communityRepo.findRoomByCode(code);
  if (!room) throw new NotFoundError('Sala não encontrada');
  return room;
}

export async function getUserRooms(userId: string) {
  return communityRepo.getUserRooms(userId);
}
