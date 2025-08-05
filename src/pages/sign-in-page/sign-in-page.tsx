import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { GlobalSpinner } from '~/components';
import { LoginForm } from '~/components/widgets/login-form/login-form.tsx';
import { LoginResultModal } from '~/components/wrappers/result-modal/login-result-modal/login-result-modal';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { StatusCodes, Statuses } from '~/query/constants/status-codes';
import { useSignInMutation } from '~/query/services/auth/auth-api';
import { loginSchema, LoginSchemaType } from '~/schemas/sign-in.schema.ts';
import { SignUpEmailVerifiedParam } from '~/types/sign-up-types';
import { isRTKQueryError } from '~/utils/is-rtk-error';

const { EmailVerifiedToast } = TOAST_MESSAGES;

export const SignInPage = () => {
    const [signIn, { isLoading }] = useSignInMutation();
    const { toast } = useCustomToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const [searchParams] = useSearchParams();
    const emailVerifiedParam = searchParams.get(SignUpEmailVerifiedParam);
    const isEmailVerified = emailVerifiedParam === 'true';

    const formMethods = useForm<LoginSchemaType>({
        mode: 'onChange',
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit, setError } = formMethods;

    const onSubmit = async (data: { login: string; password: string }) => {
        onClose();
        try {
            await signIn(data).unwrap();
            navigate(PATHS.ROOT);
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error?.status;
                const toastData =
                    TOAST_MESSAGES.SignInToast[status as keyof typeof TOAST_MESSAGES.SignInToast];
                if (toastData) {
                    toast(toastData, false);
                    setError('login', { message: '' });
                    setError('password', { message: '' });
                } else {
                    onOpen();
                }
            }
        }
    };

    useEffect(() => {
        if (isEmailVerified) {
            toast({ ...EmailVerifiedToast[StatusCodes.OK], status: Statuses.SUCCESS }, false);
        }
    }, [isEmailVerified, toast]);

    return (
        <>
            <LoginForm formMethods={formMethods} onSubmit={handleSubmit(onSubmit)} />
            <LoginResultModal isOpen={isOpen} onClose={onClose} onRetry={handleSubmit(onSubmit)} />
            <GlobalSpinner isOpen={isLoading} />
            <Outlet />
        </>
    );
};
