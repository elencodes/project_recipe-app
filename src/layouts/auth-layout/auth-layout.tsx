import {
    Box,
    Center,
    Container,
    Heading,
    Show,
    Tab,
    TabList,
    Tabs,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import authBg from '@public/images/auth/auth_background.png';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useMatch, useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { GlobalSpinner, Logo } from '~/components';
import { TEXT_LABELS } from '~/constants/text-labels.ts';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { useCheckAuthQuery } from '~/query/services/auth/auth-api';
import { selectAccessToken } from '~/redux/slices/auth-slice';

const TABS = [
    { label: 'Вход на сайт', path: PATHS.SIGN_IN },
    { label: 'Регистрация', path: PATHS.SIGN_UP },
];

export const AuthLayout = () => {
    const { isTablet } = useScreenSize();
    const navigate = useNavigate();
    const activeIndex = useMatch(PATHS.SIGN_IN) ? 0 : 1;
    const { isLoading, isSuccess } = useCheckAuthQuery();
    const accessToken = useSelector(selectAccessToken);

    const handleTabsChange = (index: number) => {
        navigate(TABS[index].path, { replace: true });
    };

    if (isSuccess && accessToken) {
        return <Navigate to={PATHS.ROOT} />;
    }

    return (
        <>
            <Box pos='relative' w='100%'>
                <Box display='flex' minHeight='100dvh'>
                    <Center flex={1} pb={75} bgGradient='linear(to-bl, lime.100, #29813F 170%)'>
                        <Container py={12} maxW={{ base: 387, md: 493 }}>
                            <Center mb={{ base: 16, md: 20 }}>
                                <Logo size={isTablet ? 'base' : 'md'} isHideText={false} />
                            </Center>
                            <Tabs
                                variant='auth'
                                size='lg'
                                mb={10}
                                isFitted
                                index={activeIndex}
                                onChange={handleTabsChange}
                            >
                                <TabList
                                    borderBottom='2px solid'
                                    borderColor='blackAlpha.200'
                                    gap={4}
                                    w='100%'
                                >
                                    {TABS.map((tab) => (
                                        <Tab
                                            key={tab.path}
                                            w='50%'
                                            cursor='pointer'
                                            color='lime.800'
                                            px={6}
                                            py={3}
                                            _selected={{
                                                color: 'lime.700',
                                                borderBottom: '2px solid',
                                                borderColor: 'lime.700',
                                            }}
                                            fontSize={{ base: 'md', md: 'lg' }}
                                        >
                                            {tab.label}
                                        </Tab>
                                    ))}
                                </TabList>
                            </Tabs>
                            <Outlet />
                        </Container>
                    </Center>

                    <Show above='lg'>
                        <Box
                            maxW='50.65%'
                            w='full'
                            bgImage={authBg}
                            bgRepeat='no-repeat'
                            bgPosition='50% 50%'
                            bgSize='cover'
                        />
                    </Show>
                </Box>

                <Box as='footer' p={{ base: 4, sm: 30 }} pos='absolute' bottom={0} w='full'>
                    <Wrap spacing={4} justify='space-between'>
                        <WrapItem>
                            <Heading as='h6' fontSize='xs' fontWeight='semibold'>
                                {TEXT_LABELS.Rights}
                            </Heading>
                        </WrapItem>
                        <WrapItem display={{ base: 'none', lg: 'block' }}>
                            <Heading as='h6' fontSize='xs' fontWeight='semibold'>
                                {TEXT_LABELS.BestApp}
                            </Heading>
                        </WrapItem>
                    </Wrap>
                </Box>
            </Box>
            <GlobalSpinner isOpen={isLoading} />
        </>
    );
};
