import { CloseIcon, Flex, HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';

import { AppBreadcrumb, SidebarAccordion, SidebarFooter } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';

type BurgerMenuProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const BurgerMenu = ({ isOpen, onOpen, onClose }: BurgerMenuProps) => {
    const { isTablet } = useScreenSize();
    return (
        <>
            {isOpen && (
                <Box
                    position='fixed'
                    top='64px'
                    left={0}
                    right={0}
                    bottom={0}
                    background='rgba(0, 0, 0, 0.16)'
                    backdropFilter='blur(3px)'
                    onClick={onClose}
                />
            )}

            <Menu
                placement='bottom-end'
                autoSelect={false}
                closeOnSelect={false}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            as={IconButton}
                            size='sm'
                            icon={
                                isOpen ? (
                                    <CloseIcon
                                        w='12px'
                                        data-test-id={DATA_TEST_ID.BURGER_CLOSE_ICON}
                                    />
                                ) : (
                                    <HamburgerIcon data-test-id={DATA_TEST_ID.BURGER_ICON} />
                                )
                            }
                            variant='unstyled'
                            aria-label='Открыть меню'
                            zIndex='modal'
                            mx={2}
                            px={2}
                        />
                        {isTablet && isOpen && (
                            <MenuList
                                data-test-id={DATA_TEST_ID.BURGER_NAV}
                                px={2}
                                pt={4}
                                pb={0}
                                bg='white'
                                border='none'
                                borderTopRadius='none'
                                maxW='344px'
                            >
                                <Flex direction='column' gap={3}>
                                    <AppBreadcrumb onClose={onClose} />
                                    <Box
                                        maxH='calc(100vh - 294px)'
                                        overflowY='auto'
                                        overflowX='hidden'
                                        sx={{
                                            '&::-webkit-scrollbar': {
                                                width: '6px',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.16)',
                                                borderRadius: '8px',
                                            },
                                        }}
                                    >
                                        <SidebarAccordion />
                                    </Box>
                                    <SidebarFooter />
                                </Flex>
                            </MenuList>
                        )}
                    </>
                )}
            </Menu>
        </>
    );
};
