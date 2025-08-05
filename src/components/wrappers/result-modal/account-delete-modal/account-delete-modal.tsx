import { Button, Link, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import breakfast from '@public/images/auth/breakfast.png';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { ResultModal, ResultModalProps } from '~/components/wrappers/result-modal/result-modal.tsx';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import { useDeleteAccountMutation } from '~/query/services/user/user-api.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type AccountDeleteModalProps = Omit<ResultModalProps, 'children'>;

const { ServerErrorToast } = TOAST_MESSAGES;

export const AccountDeleteModal = ({ onClose, ...restProps }: AccountDeleteModalProps) => {
    const navigate = useNavigate();
    const { toast } = useCustomToast();
    const [deleteAccount] = useDeleteAccountMutation();

    const handleAccountDelete = async () => {
        onClose();
        try {
            await deleteAccount().unwrap();
            navigate(PATHS.SIGN_IN);
            const message = TOAST_MESSAGES.DeleteAccountToast[StatusCodes.OK];
            toast({ ...message, status: Statuses.SUCCESS });
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    return (
        <ResultModal
            onClose={onClose}
            {...restProps}
            imageUrl={breakfast}
            title='Действительно хотите удалить свой аккаунт?'
        >
            <ModalBody alignSelf='center'>
                <Text maxW='315px' color='blackAlpha.700' textAlign='center' fontSize='md' mb={4}>
                    Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса, которые
                    вы использовали.
                </Text>
                <Text maxW='315px' color='blackAlpha.700' textAlign='center' fontSize='md' mb={4}>
                    Мы удалим все ваши опубликованные рецепты и записи в блоге.
                </Text>
                <Button my={4} w='100%' variant='dark' size='lg' onClick={handleAccountDelete}>
                    Удалить мой аккаунт
                </Button>
            </ModalBody>
            <ModalFooter maxW='327px' alignSelf='center' m={0} pt={0}>
                <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                    Остались вопросы? Cвяжитесь{' '}
                    <Link textDecoration='underline' _hover={{ textDecoration: 'none' }}>
                        с поддержкой
                    </Link>
                </Text>
            </ModalFooter>
        </ResultModal>
    );
};
