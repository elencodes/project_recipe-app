import { Avatar, Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Loader, RecipeStats } from '~/components';
import { SubscribeButton } from '~/components/widgets/subscribe-button/subscribe-button';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { buildImageUrl } from '~/utils/build-image-url';

type BloggerInfoProps = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
} & Partial<{
    imgSrc: string;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}>;

export const BloggerInfo = ({
    _id,
    imgSrc,
    firstName,
    lastName,
    login,
    subscribersCount,
    bookmarksCount,
    isFavorite,
    onToggleFavorite,
}: BloggerInfoProps) => {
    const [isSubscribing, setIsSubscribing] = useState(false);

    return (
        <Box
            w={{ base: '100%', sm: 'auto' }}
            position='relative'
            data-test-id={DATA_TEST_ID.BLOGGER_USER_INFO_BOX}
        >
            <Flex alignItems='center' flexDirection={{ base: 'column', sm: 'row' }} gap={6}>
                <Avatar
                    size={{ base: 'xl', md: '2xl' }}
                    src={buildImageUrl(imgSrc)}
                    name={`${firstName} ${lastName}`}
                />
                <Stack gap={3} w={{ base: '100%', sm: 'auto' }}>
                    <Text
                        lineHeight={{ base: '32px', md: '48px' }}
                        fontSize={{ base: '2xl', md: '5xl' }}
                        fontWeight={700}
                        textAlign={{ base: 'center', sm: 'left' }}
                        data-test-id={DATA_TEST_ID.BLOGGER_USER_INFO_NAME}
                    >{`${firstName} ${lastName}`}</Text>
                    <Text
                        fontSize='sm'
                        lineHeight={5}
                        color='blackAlpha.700'
                        textAlign={{ base: 'center', sm: 'left' }}
                        data-test-id={DATA_TEST_ID.BLOGGER_USER_INFO_LOGIN}
                    >
                        @{login}
                    </Text>
                    <HStack justify='space-between'>
                        <SubscribeButton
                            userId={_id}
                            isFavorite={isFavorite}
                            onSubscribed={onToggleFavorite}
                            onLoadingChange={setIsSubscribing}
                        />
                        <RecipeStats
                            bookmarks={bookmarksCount}
                            subscribers={subscribersCount}
                            dataTestIdSubs={DATA_TEST_ID.BLOGGER_FOLLOWERS_COUNT}
                            dataTestIdBook={DATA_TEST_ID.BLOGGER_FOLLOWERS_BOOKMARKS}
                            isBloggerInfo
                        />
                    </HStack>
                </Stack>
            </Flex>
            {isSubscribing && (
                <Center position='absolute' width='100%' height='100%' top={0} left={0}>
                    <Loader dataTestId='mobile-loader' isSmall />
                </Center>
            )}
        </Box>
    );
};
