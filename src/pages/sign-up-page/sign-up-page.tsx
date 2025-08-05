import { Box, Progress, Text, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { GlobalSpinner } from '~/components';
import { AuthRegistrationForm } from '~/components/widgets/auth-registration-form/auth-registration-form';
import { PersonalInfoForm } from '~/components/widgets/personal-info-form/personal-info-form.tsx';
import { SignUpResultModal } from '~/components/wrappers/result-modal/sign-up-result-modal/sign-up-result-modal.tsx';
import { VerificationFailedModal } from '~/components/wrappers/result-modal/verification-failed-modal/verification-failed-modal.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { StatusCodes } from '~/query/constants/status-codes';
import { useSignUpMutation } from '~/query/services/auth/auth-api';
import {
    AuthInfoSchemaType,
    PersonalInfoSchemaType,
    SignUpSchema,
    SignUpSchemaType,
} from '~/schemas/sign-up.schema';
import { SignUpEmailVerifiedParam, SignUpLabels, SignUpStep } from '~/types/sign-up-types';
import { getValidFieldsCount } from '~/utils/get-valid-fields-count';
import { isRTKQueryError } from '~/utils/is-rtk-error';

const { ServerErrorToast, SignUpToast } = TOAST_MESSAGES;

export const SignUpPage = () => {
    const [step, setStep] = useState<SignUpStep>(SignUpStep.PersonalInfo);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const emailVerifiedParam = searchParams.get(SignUpEmailVerifiedParam);
    const isEmailVerifiedFailed = emailVerifiedParam === 'false';
    const [signUp, { isLoading }] = useSignUpMutation();
    const { toast } = useCustomToast();

    const {
        isOpen: isSuccessOpen,
        onOpen: onSuccessOpen,
        onClose: onSuccessClose,
    } = useDisclosure({ defaultIsOpen: false });
    const {
        isOpen: isFailedOpen,
        onOpen: onFailedOpen,
        onClose: onFailedClose,
    } = useDisclosure({ defaultIsOpen: false });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<SignUpSchemaType>({
        mode: 'onChange',
        resolver: yupResolver(SignUpSchema[step]),
    });

    const watchFields = watch();

    const validFieldsCount = getValidFieldsCount<SignUpSchemaType>(watchFields, errors);

    const handleFormSubmit = async ({ passwordConfirm, ...registrationData }: SignUpSchemaType) => {
        if (step === SignUpStep.PersonalInfo) {
            setStep(SignUpStep.AuthInfo);
            return;
        } else {
            try {
                await signUp(registrationData).unwrap();
                onSuccessOpen();
            } catch (error: unknown) {
                if (isRTKQueryError(error)) {
                    const status = error?.status;
                    if (status === StatusCodes.BAD_REQUEST) {
                        toast(
                            { ...SignUpToast[StatusCodes.BAD_REQUEST], title: error.data.message },
                            false,
                        );
                    } else {
                        toast(ServerErrorToast, false);
                    }
                }
            }
        }
    };

    const handlePersonalInfoBlur = (field: keyof PersonalInfoSchemaType, value: string) => {
        setValue(field, value.trim(), { shouldValidate: true });
    };

    const handleAuthInfoBlur = (field: keyof AuthInfoSchemaType, value: string) => {
        setValue(field, value.trim(), { shouldValidate: true });
    };

    const handleCloseSuccessModal = () => {
        onSuccessClose();
        navigate(PATHS.SIGN_IN);
    };

    const stepTitle = SignUpLabels[step];

    useEffect(() => {
        if (isEmailVerifiedFailed) {
            onFailedOpen();
        }
    }, [isEmailVerifiedFailed, onFailedOpen]);

    return (
        <>
            <Box>
                <Text fontSize='md'>{stepTitle}</Text>
                <Progress
                    value={(validFieldsCount * 100) / 6}
                    mb={6}
                    hasStripe
                    size='sm'
                    colorScheme='lime'
                    bgColor='blackAlpha.100'
                    data-test-id={DATA_TEST_ID.SIGN_UP_PROGRESS}
                />
                <form
                    data-test-id={DATA_TEST_ID.SIGN_UP_FORM}
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    {step === SignUpStep.PersonalInfo ? (
                        <PersonalInfoForm
                            register={register}
                            errors={errors}
                            onBlur={handlePersonalInfoBlur}
                            isFormSubmitting={isSubmitting}
                        />
                    ) : (
                        <AuthRegistrationForm
                            register={register}
                            errors={errors}
                            onBlur={handleAuthInfoBlur}
                            isFormSubmitting={isSubmitting}
                        />
                    )}
                </form>
            </Box>
            <GlobalSpinner isOpen={isLoading} />
            <SignUpResultModal
                isOpen={isSuccessOpen}
                onClose={handleCloseSuccessModal}
                email={watchFields.email}
            />
            <VerificationFailedModal isOpen={isFailedOpen} onClose={onFailedClose} />
        </>
    );
};
