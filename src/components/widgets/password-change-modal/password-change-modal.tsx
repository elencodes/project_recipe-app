import { FormHelperText } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, ModalBody } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '~/components/ui/password-input/password-input';
import { ResultModal } from '~/components/wrappers/result-modal/result-modal.tsx';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import { useUpdateUserPasswordMutation } from '~/query/services/user/user-api.ts';
import { PasswordChangeFormValues, passwordChangeSchema } from '~/schemas/password-change.schema';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type PasswordChangeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const { ServerErrorToast } = TOAST_MESSAGES;

export const PasswordChangeModal = ({ isOpen, onClose }: PasswordChangeModalProps) => {
    const [updateUserPassword] = useUpdateUserPasswordMutation();
    const { toast } = useCustomToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        reset,
    } = useForm<PasswordChangeFormValues>({
        resolver: yupResolver(passwordChangeSchema),
        mode: 'onChange',
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async ({ oldPassword, password }: PasswordChangeFormValues) => {
        try {
            await updateUserPassword({
                password: oldPassword,
                newPassword: password,
            }).unwrap();
            const message = TOAST_MESSAGES.UpdatePasswordToast[StatusCodes.OK];
            toast({ ...message, status: Statuses.SUCCESS });
            handleClose();
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error?.status;
                const errorMessage = error?.data.message;
                const toastData =
                    TOAST_MESSAGES.UpdatePasswordToast[
                        status as keyof typeof TOAST_MESSAGES.UpdatePasswordToast
                    ];
                if (toastData) {
                    if (errorMessage === 'Новый и старый пароль совпадают') {
                        toast({ ...toastData, description: errorMessage });
                        setError('password', { message: '' });
                    } else {
                        toast({ ...toastData, description: 'Попробуйте снова' });
                        setError('oldPassword', { message: '' });
                    }
                } else {
                    toast(ServerErrorToast);
                }
            }
        }
    };

    return (
        <ResultModal isOpen={isOpen} onClose={handleClose} title='Сменить пароль'>
            <ModalBody px={8} as='form' onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.oldPassword} mb={4}>
                    <FormLabel>Введите старый пароль</FormLabel>
                    <PasswordInput
                        input={{
                            ...register('oldPassword'),
                            variant: 'auth',
                            placeholder: PLACEHOLDERS.OLD_PASSWORD,
                        }}
                    />
                    <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password} mb={4}>
                    <FormLabel>Введите новый пароль</FormLabel>
                    <PasswordInput
                        input={{
                            ...register('password'),
                            variant: 'auth',
                            placeholder: PLACEHOLDERS.NEW_PASSWORD,
                        }}
                    />
                    {errors.password?.message ? (
                        <FormErrorMessage fontSize='xs'>
                            {errors.password?.message}
                        </FormErrorMessage>
                    ) : (
                        <FormHelperText fontSize='xs'>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl isInvalid={!!errors.passwordConfirm}>
                    <FormLabel>Повторите пароль</FormLabel>
                    <PasswordInput
                        input={{
                            ...register('passwordConfirm'),
                            variant: 'auth',
                            placeholder: PLACEHOLDERS.REPEAT_PASSWORD,
                        }}
                    />
                </FormControl>
                <Button
                    mt={8}
                    type='submit'
                    w='full'
                    size='lg'
                    variant='dark'
                    isDisabled={!isValid}
                >
                    Сохранить пароль
                </Button>
            </ModalBody>
        </ResultModal>
    );
};
