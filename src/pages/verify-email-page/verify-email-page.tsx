import { Navigate, useSearchParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { SignUpEmailVerifiedParam } from '~/types/sign-up-types';

export const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const isEmailVerified = JSON.parse(searchParams.get(SignUpEmailVerifiedParam) ?? '');

    return (
        <Navigate
            to={`${isEmailVerified ? PATHS.SIGN_IN : PATHS.SIGN_UP}?${searchParams.toString()}`}
            replace
        />
    );
};
