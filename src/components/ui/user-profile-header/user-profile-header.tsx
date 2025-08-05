import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { RecipeStats } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { UserInfoResponse } from '~/query/services/user/types.ts';
import { buildImageUrl } from '~/utils/build-image-url.ts';

type UserProfileHeaderProps = {
    userInfo: UserInfoResponse;
    totalBookmarks: number;
};

export const UserProfileHeader = ({ userInfo, totalBookmarks }: UserProfileHeaderProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(PATHS.SETTINGS);
    };

    return (
        <Box w='100%' position='relative'>
            <Flex
                alignItems='center'
                w='100%'
                flexDirection={{ base: 'column', sm: 'row' }}
                gap={6}
                data-test-id={DATA_TEST_ID.USER_PROFILE_BOX}
            >
                <Avatar
                    size={{ base: 'xl', md: '2xl' }}
                    src={buildImageUrl(userInfo.photoLink)}
                    name={`${userInfo?.firstName} ${userInfo?.lastName}`}
                />
                <Stack gap={3} w={{ base: '100%', sm: 'auto' }}>
                    <Text
                        lineHeight={{ base: '32px', md: '48px' }}
                        fontSize={{ base: '2xl', md: '5xl' }}
                        fontWeight={700}
                        textAlign={{ base: 'center', sm: 'left' }}
                        data-test-id={DATA_TEST_ID.USER_PROFILE_NAME}
                    >{`${userInfo?.firstName} ${userInfo?.lastName}`}</Text>
                    <Text
                        fontSize='sm'
                        lineHeight={5}
                        color='blackAlpha.700'
                        textAlign={{ base: 'center', sm: 'left' }}
                        data-test-id={DATA_TEST_ID.USER_PROFILE_LOGIN}
                    >
                        @{userInfo?.login}
                    </Text>
                    <HStack
                        w='100%'
                        justifyContent={{ base: 'center', sm: 'start' }}
                        data-test-id='user-profile-stats-block'
                    >
                        <RecipeStats
                            bookmarks={totalBookmarks}
                            subscribers={userInfo?.totalSubscribers}
                            isBloggerInfo
                        />
                    </HStack>
                </Stack>
            </Flex>
            <Box position='absolute' top={0} right={0}>
                <IconButton
                    variant='ghost'
                    aria-label='настройки'
                    size='lg'
                    icon={<SettingsIcon boxSize='24px' />}
                    onClick={handleNavigate}
                    data-test-id={DATA_TEST_ID.USER_PROFILE_SETTINGS_BTN}
                />
            </Box>
        </Box>
    );
};
