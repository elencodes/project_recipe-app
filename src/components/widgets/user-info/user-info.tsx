import { VStack } from '@chakra-ui/icons';
import { Avatar, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { PATHS } from '~/app/routes/paths';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { useGetUserInfoQuery } from '~/query/services/user/user-api.ts';
import { buildImageUrl } from '~/utils/build-image-url.ts';

export const UserInfo = () => {
    const { data: userInfo } = useGetUserInfoQuery();

    if (!userInfo) return null;

    return (
        <HStack
            spacing={2}
            align='center'
            mr='40px'
            as={Link}
            to={PATHS.PROFILE}
            data-test-id={DATA_TEST_ID.HEADER_PROFILE}
        >
            <Avatar
                name={`${userInfo.firstName} ${userInfo.lastName}`}
                size={{ base: 'sm', sm: 'md' }}
                src={buildImageUrl(userInfo?.photoLink)}
            />
            <VStack align='start' spacing={0}>
                <Text
                    fontSize={{ base: 'sm', sm: 'lg' }}
                    fontWeight={500}
                    lineHeight={{ base: 6, sm: 7 }}
                    letterSpacing='-0.5px'
                >
                    {`${userInfo.firstName} ${userInfo.lastName}`}
                </Text>
                <Text fontSize={{ base: 'xs', sm: 'sm' }} color='blackAlpha.700' maxWidth='296px'>
                    @{userInfo.login}
                </Text>
            </VStack>
        </HStack>
    );
};
