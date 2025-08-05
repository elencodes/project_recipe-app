import { Link, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import teaCeremony from '@public/images/auth/tea_ceremony.png';

import { ResultModal } from '~/components/wrappers/result-modal/result-modal.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';

type VerificationFailedModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const VerificationFailedModal = ({ isOpen, onClose }: VerificationFailedModalProps) => (
    <ResultModal
        isOpen={isOpen}
        onClose={onClose}
        imageUrl={teaCeremony}
        dataTestId={DATA_TEST_ID.MODAL_SIGN_UP_ERROR}
        title='Упс! Что-то пошло не так'
    >
        <ModalBody maxW='300px' alignSelf='center'>
            <Text color='blackAlpha.700' textAlign='center' fontSize='md'>
                Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.
            </Text>
        </ModalBody>
        <ModalFooter maxW='327px' alignSelf='center'>
            <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                Остались вопросы? Свяжитесь{' '}
                <Link textDecoration='underline' _hover={{ textDecoration: 'none' }}>
                    с поддержкой
                </Link>
            </Text>
        </ModalFooter>
    </ResultModal>
);
