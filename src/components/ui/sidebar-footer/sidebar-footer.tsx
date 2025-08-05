import { Flex, Text } from '@chakra-ui/react';

import { LogOutIcon } from '~/icons/footer-nav-menu-icons/logout-icon';

export const SidebarFooter = () => (
    <Flex flexDirection='column' alignItems='start' gap={4} pl='20px' pr='62px' py='24px'>
        <Text fontSize='xs' color='blackAlpha.400'>
            Версия программы 03.25
        </Text>
        <Text fontSize='xs' textAlign='left' color='blackAlpha.700' lineHeight='133%'>
            Все права защищены, ученический файл,
            <br /> ©Клевер Технолоджи, 2025
        </Text>
        <Flex alignItems='center' gap={2}>
            <LogOutIcon />
            <Text fontWeight='bold' fontSize='xs'>
                Выйти
            </Text>
        </Flex>
    </Flex>
);
