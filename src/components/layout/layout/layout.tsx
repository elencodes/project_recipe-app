import { Box, Grid as ChakraGrid, GridItem } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router';

import { HIDE_ASIDE_PATHS } from '~/app/routes/paths';
import { Aside, Footer, Header, Sidebar } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';

const Layout = () => {
    const location = useLocation();
    const isAsideVisible = HIDE_ASIDE_PATHS.some((path) => location.pathname.startsWith(path));

    return (
        <ChakraGrid
            templateRows={{ base: 'auto 1fr auto', md: 'auto 1fr' }}
            templateColumns={{ base: '1fr', md: '256px 1fr 240px' }}
            templateAreas={{
                base: `
                "header"
                "main"
                "footer"
            `,
                md: `
                "header header header"
                "sidebar main aside"
            `,
            }}
            minH='100vh'
            m='0 auto'
            overflowY={{ base: 'hidden', md: 'auto' }}
            overflowX='hidden'
            position='relative'
        >
            <GridItem
                data-test-id={DATA_TEST_ID.HEADER}
                area='header'
                position='fixed'
                top={0}
                left={0}
                right={0}
                zIndex={1000}
                bg='white'
                w='100%'
                textAlign='center'
            >
                <Box m='0 auto'>
                    <Header />
                </Box>
            </GridItem>

            <GridItem
                area='sidebar'
                display={{ base: 'none', md: 'block' }}
                position='fixed'
                top={{ base: '74px', md: '80px' }}
                alignSelf='start'
                borderRight='1px solid rgba(0, 0, 0, 0.12)'
                w='256px'
                h='calc(100vh - 64px)'
                overflowY='auto'
                zIndex={900}
            >
                <Sidebar />
            </GridItem>

            <GridItem
                area='main'
                px={{ base: 4, md: 5 }}
                pt={{ base: '64px', md: '84px' }}
                pb={{ base: '84px', md: 0 }}
                overflowY={{ base: 'auto', md: 'visible' }}
                overflowX='hidden'
                minH={{ md: 'calc(100vh - 84px)' }}
            >
                <Outlet />
            </GridItem>

            {!isAsideVisible && (
                <GridItem
                    area='aside'
                    display={{ base: 'none', md: 'block' }}
                    position='fixed'
                    top={{ base: '74px', md: '80px' }}
                    right={0}
                    w='240px'
                    h='calc(100vh - 64px)'
                    overflowY='auto'
                    zIndex={900}
                >
                    <Aside />
                </GridItem>
            )}

            <GridItem
                data-test-id={DATA_TEST_ID.FOOTER}
                area='footer'
                display={{ base: 'block', md: 'none' }}
                position='fixed'
                bottom={0}
                left={0}
                right={0}
                zIndex={997}
                bg='white'
            >
                <Footer />
            </GridItem>
        </ChakraGrid>
    );
};

export default Layout;
