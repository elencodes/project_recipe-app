import { Flex } from '@chakra-ui/icons';
import { Box, Spacer, useDisclosure } from '@chakra-ui/react';

import { AppBreadcrumb, BurgerMenu, Logo, Stats, UserInfo } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';

export const Header = () => {
    const { isTablet } = useScreenSize();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            w='100%'
            as='header'
            bg={isOpen ? 'white' : 'lime.50'}
            pl={4}
            pr={isTablet ? 0 : 4}
            pt={6}
            pb={6}
            height={{ base: '64px', md: '80px' }}
        >
            <Flex align='center' h='100%' justify='center'>
                <Logo />
                {!isTablet && <AppBreadcrumb />}
                <Spacer />
                {!isTablet && <UserInfo />}
                {isTablet && !isOpen && <Stats />}
                <Box
                    display={{ base: 'block', md: 'none' }}
                    data-test-id={isTablet ? '' : DATA_TEST_ID.BURGER_NAV}
                >
                    <BurgerMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </Box>
            </Flex>
        </Box>
    );
};
