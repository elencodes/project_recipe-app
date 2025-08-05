import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { AccountRecoveryModal } from '~/components/wrappers/result-modal/account-recovery-modal/account-recovery-modal.tsx';
import { EmailRecoveryModal } from '~/components/wrappers/result-modal/email-recovery-modal/email-recovery-modal.tsx';
import { OneTimePasswordModal } from '~/components/wrappers/result-modal/one-time-password-modal/one-time-password-modal.tsx';
import { RecoveryStep } from '~/types/recovery-types';

export const RecoveryPage = () => {
    const navigate = useNavigate();
    const { isOpen, onClose: onCloseDisclosure } = useDisclosure({ defaultIsOpen: true });
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(RecoveryStep.VerifyEmail);

    const onClose = () => {
        navigate(PATHS.SIGN_IN, { replace: true });
        onCloseDisclosure();
    };

    return (
        <>
            {step === RecoveryStep.VerifyEmail && (
                <EmailRecoveryModal
                    isOpen={isOpen}
                    onClose={onClose}
                    setEmail={setEmail}
                    setStep={setStep}
                />
            )}
            {step === RecoveryStep.CheckCode && (
                <OneTimePasswordModal
                    isOpen={isOpen}
                    onClose={onClose}
                    setStep={setStep}
                    email={email}
                />
            )}
            {step === RecoveryStep.AccountRecovery && (
                <AccountRecoveryModal isOpen={isOpen} onClose={onClose} email={email} />
            )}
        </>
    );
};
