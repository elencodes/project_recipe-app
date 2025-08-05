import { Button, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import breakfast from '@public/images/auth/breakfast.png';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';

import { ResultModal } from '../result-modal';

type LoginResultModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onRetry: () => void;
};

export const LoginResultModal = ({ isOpen, onClose, onRetry }: LoginResultModalProps) => (
    <ResultModal
        dataTestId={DATA_TEST_ID.MODAL_ERROR_SIGN_IN}
        isOpen={isOpen}
        onClose={onClose}
        imageUrl={breakfast}
        title='Вход не выполнен'
    >
        <ModalBody>
            <Text color='blackAlpha.700' textAlign='center' fontSize='md'>
                Что-то пошло не так. <br /> Попробуйте еще раз
            </Text>
        </ModalBody>
        <ModalFooter>
            <Button
                data-test-id={DATA_TEST_ID.MODAL_REPEAT_BUTTON}
                variant='dark'
                mt={{ base: 0, md: 8 }}
                size='lg'
                w='100%'
                onClick={onRetry}
            >
                Повторить
            </Button>
        </ModalFooter>
    </ResultModal>
);
