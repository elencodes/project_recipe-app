import { FormHelperText } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Input,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { PasswordChangeModal } from '~/components/widgets/password-change-modal/password-change-modal.tsx';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import { UserInfoResponse } from '~/query/services/user/types';
import { useUpdateUserInfoMutation } from '~/query/services/user/user-api.ts';
import { userInfoSchema, UserInfoSchemaType } from '~/schemas/user-info.schema';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type UserSettingsFormProps = {
    userInfo: UserInfoResponse;
};

const { ServerErrorToast } = TOAST_MESSAGES;

export const UserSettingsForm = ({ userInfo }: UserSettingsFormProps) => {
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toast } = useCustomToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<UserInfoSchemaType>({
        resolver: yupResolver(userInfoSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
        },
    });

    const onSubmit = async (data: UserInfoSchemaType) => {
        try {
            await updateUserInfo(data).unwrap();
            const message = TOAST_MESSAGES.UpdateUserInfoToast[StatusCodes.OK];
            toast({ ...message, status: Statuses.SUCCESS });
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    return (
        <>
            <Box as='form' onSubmit={handleSubmit(onSubmit)} w='100%'>
                <Grid
                    templateColumns={{
                        base: '1fr',
                        sm: 'repeat(2, 1fr)',
                    }}
                    gap={4}
                    width='100%'
                    maxW='100%'
                    autoRows='1fr'
                >
                    <FormControl isInvalid={!!errors.firstName}>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            size='lg'
                            variant='auth'
                            placeholder={PLACEHOLDERS.NAME}
                            {...register('firstName')}
                        />
                        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.lastName}>
                        <FormLabel>Фамилия</FormLabel>
                        <Input
                            size='lg'
                            variant='auth'
                            placeholder={PLACEHOLDERS.SURNAME}
                            {...register('lastName')}
                        />
                        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isDisabled>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            size='lg'
                            variant='auth'
                            value={userInfo.email}
                            isDisabled
                            readOnly
                        />
                    </FormControl>

                    <FormControl isDisabled>
                        <FormLabel>Логин</FormLabel>
                        <Input
                            size='lg'
                            variant='auth'
                            value={userInfo.login}
                            isDisabled
                            readOnly
                        />
                        <FormHelperText fontSize='xs'>
                            Логин не менее 5 символов, только латиница
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <VStack align='start' spacing={6} mt={6}>
                    <Button size='lg' variant='ghost' colorScheme='white' onClick={onOpen}>
                        Сменить пароль
                    </Button>
                    <Button
                        size='lg'
                        variant='dark'
                        type='submit'
                        isDisabled={!isDirty || !isValid}
                    >
                        Сохранить изменения
                    </Button>
                </VStack>
            </Box>
            <PasswordChangeModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
