import { Box, Flex } from '@chakra-ui/react';

import { SidebarAccordion, SidebarFooter } from '~/components';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';

export const Sidebar = () => {
    const { isTablet } = useScreenSize();

    return (
        <Box h='100%' py={2}>
            <Flex flexDirection='column' h='100%' justifyContent='space-between'>
                {!isTablet && (
                    <Box
                        maxH='845px'
                        px={2}
                        borderRadius='md'
                        overflowY='auto'
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
                )}
                <SidebarFooter />
            </Flex>
        </Box>
    );
};
