import { Link, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import party from '@public/images/auth/party.png';

import { ResultModal } from '~/components/wrappers/result-modal/result-modal.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';

type SignUpResultModalProps = {
    isOpen: boolean;
    onClose: () => void;
    email: string;
};

export const SignUpResultModal = ({ isOpen, onClose, email }: SignUpResultModalProps) => (
    <ResultModal
        dataTestId={DATA_TEST_ID.MODAL_SIGN_UP_SUCCESS}
        isOpen={isOpen}
        onClose={onClose}
        imageUrl={party}
        title='Остался последний шаг. Нужно верифицировать ваш e-mail'
    >
        <ModalBody maxW='300px' alignSelf='center'>
            <Text color='blackAlpha.900' textAlign='center' fontSize='md'>
                Мы отправили вам на почту
                <b> {email} </b> <br />
                ссылку для верификации.
            </Text>
        </ModalBody>
        <ModalFooter maxW='327px' alignSelf='center'>
            <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь{' '}
                <Link textDecoration='underline' _hover={{ textDecoration: 'none' }}>
                    с поддержкой
                </Link>
            </Text>
        </ModalFooter>
    </ResultModal>
);
