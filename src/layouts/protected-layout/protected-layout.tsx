import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { GlobalSpinner } from '~/components';
import { useRefreshTokenMutation } from '~/query/services/auth/auth-api';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectAccessToken } from '~/redux/slices/auth-slice';

export const ProtectedLayout = () => {
    const isFirstRender = useRef(true);
    const [isAppLoading, setIsAppLoading] = useState(true);
    const accessToken = useAppSelector(selectAccessToken);
    const [refreshToken, { isLoading, error }] = useRefreshTokenMutation();

    useEffect(() => {
        const fetchAccessToken = async () => {
            if (!accessToken) {
                try {
                    await refreshToken().unwrap();
                } catch (e) {
                    console.error('Ошибка обновления токена:', e);
                }
            }
            setIsAppLoading(false);
        };

        if (isFirstRender.current) {
            void fetchAccessToken();
            isFirstRender.current = false;
        }
    }, [accessToken, refreshToken]);

    if (isAppLoading || isLoading) {
        return <GlobalSpinner isOpen={true} />;
    }

    if (!accessToken || error) {
        return <Navigate to={PATHS.SIGN_IN} replace />;
    }

    return <Outlet />;
};
