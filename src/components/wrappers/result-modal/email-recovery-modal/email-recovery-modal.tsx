import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ModalBody,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import breakfast from '@public/images/auth/breakfast.png';
import { useForm } from 'react-hook-form';

import { ResultModal, ResultModalProps } from '~/components/wrappers/result-modal/result-modal';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { TOAST_MESSAGES } from '~/constants/toast-messages';
import { useCustomToast } from '~/hooks/use-custom-toast';
import { StatusCodes } from '~/query/constants/status-codes';
import { useForgotPasswordMutation } from '~/query/services/auth/auth-api';
import { emailRecoverySchema, EmailRecoverySchemaType } from '~/schemas/email-recovery.schema.ts';
import { RecoveryStep } from '~/types/recovery-types';
import { isRTKQueryError } from '~/utils/is-rtk-error';

type EmailRecoveryModalProps = Omit<ResultModalProps, 'children'> & {
    setEmail: (email: string) => void;
    setStep: (step: number) => void;
};

const { ForgotPasswordToast, ServerErrorToast } = TOAST_MESSAGES;

export const EmailRecoveryModal = ({
    setEmail,
    setStep,
    ...restProps
}: EmailRecoveryModalProps) => {
    const { toast } = useCustomToast();
    const [forgotPassword] = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<EmailRecoverySchemaType>({
        mode: 'onChange',
        resolver: yupResolver(emailRecoverySchema),
    });

    const handleFormSubmit = async ({ email }: EmailRecoverySchemaType) => {
        try {
            await forgotPassword({ email }).unwrap();
            setEmail(email);
            setStep(RecoveryStep.CheckCode);
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error.status;
                if (status === StatusCodes.FORBIDDEN) {
                    toast({
                        ...ForgotPasswordToast[StatusCodes.FORBIDDEN],
                    });
                } else {
                    toast(ServerErrorToast);
                }
            } else {
                toast(ServerErrorToast);
            }
            setValue('email', '');
            setError('email', { message: '' });
        }
    };

    const handleEmailBlur = (field: keyof EmailRecoverySchemaType, value: string) => {
        setValue(field, value.trim(), { shouldValidate: true });
    };

    return (
        <ResultModal {...restProps} dataTestId={DATA_TEST_ID.MODAL_SEND_EMAIL} imageUrl={breakfast}>
            <ModalBody alignSelf='center'>
                <Text maxW='315px' color='blackAlpha.900' textAlign='center' fontSize='md' mb={4}>
                    Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
                </Text>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Ваш e-mail</FormLabel>
                        <Input
                            size='lg'
                            variant='auth'
                            {...register('email')}
                            onBlur={(e) => handleEmailBlur('email', e.target.value)}
                            placeholder={PLACEHOLDERS.EMAIL}
                            data-test-id={DATA_TEST_ID.SIGN_UP_EMAIL}
                        />
                        <FormErrorMessage>{String(errors.email?.message)}</FormErrorMessage>
                    </FormControl>
                    <Button
                        my={6}
                        w='100%'
                        variant='dark'
                        size='lg'
                        type='submit'
                        data-test-id={DATA_TEST_ID.FORM_SUBMIT_BUTTON}
                    >
                        Получить код
                    </Button>
                </form>
                <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
            </ModalBody>
        </ResultModal>
    );
};
