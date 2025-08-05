import { jwtDecode } from 'jwt-decode';

import { useAppSelector } from '~/redux/hooks.ts';
import { selectAccessToken } from '~/redux/slices/auth-slice.ts';

type JwtPayload = {
    userId: string;
    login: string;
    iat: number;
    exp: number;
};

export const useGetUserId = (): string | null => {
    const accessToken = useAppSelector(selectAccessToken);

    if (!accessToken) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        return decoded.userId ?? null;
    } catch (error) {
        console.error('Ошибка при декодировании accessToken:', error);
        return null;
    }
};
