import { Button, ModalBody, ModalFooter, Text, VStack } from '@chakra-ui/react';
import breakfast from '@public/images/auth/breakfast.png';

import { ResultModal, ResultModalProps } from '~/components/wrappers/result-modal/result-modal.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { DraftIcon } from '~/icons/recipe-page-icons/draft-icon';

type SaveChangesModalProps = Omit<ResultModalProps, 'children' | 'onClose'> & {
    onSaveDraft: () => void;
    onDiscardChanges: () => void;
    onCancel: () => void;
};

export const SaveChangesModal = ({
    onSaveDraft,
    onDiscardChanges,
    onCancel,
    ...modalProps
}: SaveChangesModalProps) => (
    <ResultModal
        title='Выйти без сохранения?'
        imageUrl={breakfast}
        onClose={onCancel}
        isClosable={true}
        {...modalProps}
        dataTestId={DATA_TEST_ID.RECIPE_PREVENTIVE_MODAL}
    >
        <ModalBody px={8} py={0}>
            <Text textAlign='center' color='gray.600'>
                Чтобы сохранить, нажмите кнопку сохранить черновик
            </Text>
        </ModalBody>

        <ModalFooter px={8} py={4}>
            <VStack w='100%' spacing={3}>
                <Button
                    leftIcon={<DraftIcon />}
                    size='lg'
                    w='100%'
                    variant='dark'
                    onClick={onSaveDraft}
                >
                    Сохранить черновик
                </Button>
                <Button
                    variant='ghost'
                    colorScheme='dark'
                    onClick={onDiscardChanges}
                    size='lg'
                    w='100%'
                >
                    Выйти без сохранения
                </Button>
            </VStack>
        </ModalFooter>
    </ResultModal>
);
