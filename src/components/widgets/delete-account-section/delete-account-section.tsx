import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link, Text, useDisclosure, VStack } from '@chakra-ui/react';

import { AccountDeleteModal } from '~/components/wrappers/result-modal/account-delete-modal/account-delete-modal';

export const DeleteAccountSection = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <VStack alignItems='start' w='100%'>
                <Text w='100%' fontSize={{ base: 'lg', md: 'xl' }} fontWeight='600'>
                    О проекте
                </Text>
                <Text>
                    Связаться с{' '}
                    <Link textDecoration='underline' href='https://clevertec.ru/' isExternal>
                        разработчиками
                    </Link>{' '}
                    <ArrowForwardIcon />
                </Text>
            </VStack>
            <VStack alignItems='start' w='100%'>
                <Text w='100%' fontSize={{ base: 'lg', md: 'xl' }} fontWeight='600'>
                    Удаление аккаунта
                </Text>
                <Text cursor='pointer' onClick={onOpen}>
                    Удалить мой аккаунт <ArrowForwardIcon />
                </Text>
            </VStack>
            <AccountDeleteModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
