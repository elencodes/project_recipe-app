import { HStack, ModalBody, PinInput, PinInputField, Text } from '@chakra-ui/react';
import rest from '@public/images/auth/rest.png';
import { useState } from 'react';

import { GlobalSpinner } from '~/components';
import { ResultModal, ResultModalProps } from '~/components/wrappers/result-modal/result-modal';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages';
import { useCustomToast } from '~/hooks/use-custom-toast';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { StatusCodes } from '~/query/constants/status-codes';
import { useVerifyOtpMutation } from '~/query/services/auth/auth-api';
import { RecoveryStep } from '~/types/recovery-types';
import { isRTKQueryError } from '~/utils/is-rtk-error';

type OneTimePasswordModalProps = Omit<ResultModalProps, 'children'> & {
    email: string;
    setStep: (step: number) => void;
};

const { ServerErrorToast } = TOAST_MESSAGES;
const VERIFICATION_CODE_PIN_ID = [1, 2, 3, 4, 5, 6];

export const OneTimePasswordModal = ({
    email,
    setStep,
    ...restProps
}: OneTimePasswordModalProps) => {
    const { isTablet } = useScreenSize();
    const [isInvalid, setIsInvalid] = useState(false);
    const { toast } = useCustomToast();
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [code, setCode] = useState('');

    const updateCode = (value: string) => {
        setIsInvalid(false);
        setCode(value);
    };

    const onCompleteCode = async (value: string) => {
        try {
            await verifyOtp({ email, otpToken: value }).unwrap();
            setIsInvalid(false);
            setStep(RecoveryStep.AccountRecovery);
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error?.status;
                if (status === StatusCodes.FORBIDDEN) {
                    setIsInvalid(true);
                } else {
                    toast(ServerErrorToast);
                }
            }
            setCode('');
        }
    };

    return (
        <>
            <ResultModal
                {...restProps}
                dataTestId={DATA_TEST_ID.MODAL_VERIFICATION_CODE}
                imageUrl={rest}
                title={isInvalid ? 'Неверный код' : undefined}
            >
                <ModalBody alignSelf='center'>
                    <Text
                        color='blackAlpha.900'
                        textAlign='center'
                        fontSize='md'
                        maxW='315px'
                        mb={4}
                    >
                        Мы отправили вам на e-mail
                        <b> {email} </b>
                        <br />
                        шестизначный код. {isTablet && <br />} Введите его ниже.
                    </Text>
                    <HStack w='100%' mb={6} justifyContent='center'>
                        <PinInput
                            otp
                            isInvalid={isInvalid}
                            onChange={updateCode}
                            onComplete={onCompleteCode}
                            value={code}
                            autoFocus
                        >
                            {VERIFICATION_CODE_PIN_ID.map((item) => (
                                <PinInputField
                                    data-test-id={`${DATA_TEST_ID.VERIFICATION_CODE_INPUT}-${item}`}
                                    _placeholder={{ color: 'lime.800' }}
                                    color='lime.800'
                                    key={item}
                                />
                            ))}
                        </PinInput>
                    </HStack>
                    <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                        Не пришло письмо? {isTablet && <br />} Проверьте папку Спам.
                    </Text>
                </ModalBody>
            </ResultModal>
            <GlobalSpinner isOpen={isLoading} />
        </>
    );
};
