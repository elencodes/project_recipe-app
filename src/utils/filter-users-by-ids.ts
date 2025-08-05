import { UserAllResponse } from '~/query/services/user/types.ts';

export function filterUsersByIds(users: UserAllResponse[], ids: string[]): UserAllResponse[] {
    const idSet = new Set(ids);
    return users.filter((user) => idSet.has(user.id));
}
