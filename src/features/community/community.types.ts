import type { CommunityRoom, RoomMember, Saint, User } from '@prisma/client';

export interface RoomWithMembers extends CommunityRoom {
  coordinator: Pick<User, 'id' | 'name' | 'image'>;
  members: (RoomMember & {
    user: Pick<User, 'id' | 'name' | 'image'>;
    saint: Pick<Saint, 'id' | 'name' | 'slug' | 'imageUrl'> | null;
  })[];
}

export interface CreateRoomInput {
  name: string;
  coordinatorId: string;
}

export interface JoinRoomInput {
  code: string;
  userId: string;
}
