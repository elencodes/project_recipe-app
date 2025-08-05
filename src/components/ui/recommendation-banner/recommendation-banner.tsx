import { Box, Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import cooking from '@public/images/profile/cooking.png';

import { StatItem } from '~/components';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { SubscribersIcon } from '~/icons/blog-icons/subscribers-icon';
import { BookmarkIcon } from '~/icons/counter-icons/bookmark-icon';
import { Recommend } from '~/icons/profile-icons/recommend';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectTotalBookmarks, selectTotalSubscribers } from '~/redux/slices/user-recipes-slice.ts';

export const RecommendationBanner = () => {
    const { isMobile } = useScreenSize();
    const totalSubscribers = useAppSelector(selectTotalSubscribers);
    const totalBookmarks = useAppSelector(selectTotalBookmarks);

    const statsItems = [
        {
            icon: <BookmarkIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />,
            value: totalBookmarks,
        },
        {
            icon: <SubscribersIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />,
            value: totalSubscribers,
        },
    ];

    return (
        <Box
            w={{ base: '100%', xl: '90%' }}
            py={{ base: 4, sm: 6 }}
            px={{ base: 4, sm: 8 }}
            borderRadius='16px'
            bg='lime.150'
            position='relative'
        >
            <Flex gap={8} alignItems='center' flexDirection={{ base: 'column', sm: 'row' }}>
                {isMobile && (
                    <HStack position='absolute' right={4}>
                        {statsItems.map((item, index) => (
                            <StatItem key={index} icon={item.icon} value={item.value} />
                        ))}
                    </HStack>
                )}

                <Image
                    src={cooking}
                    alt='Пара готовит завтрак'
                    boxSize={{ base: '108px', md: '206px' }}
                />

                <VStack alignItems='start'>
                    <Text
                        fontSize={{ base: 'xl', md: '4xl' }}
                        maxW='579px'
                        fontWeight='semibold'
                        lineHeight={{ base: '24px', md: '40px' }}
                        mb={6}
                    >
                        Теперь вы можете рекомендовать рецепты других авторов
                    </Text>

                    <Flex gap={3} alignItems='center' wrap='wrap'>
                        <Text fontSize='md' lineHeight='24px' fontWeight='500'>
                            Это можно будет сделать с помощью кнопки
                        </Text>
                        <Button
                            variant='dark'
                            size={{ base: 'xs', md: 'sm' }}
                            pointerEvents='none'
                            leftIcon={<Recommend />}
                        >
                            Рекомендовать рецепт
                        </Button>
                    </Flex>
                </VStack>

                {!isMobile && (
                    <HStack alignSelf='start' ml='auto'>
                        {statsItems.map((item, index) => (
                            <StatItem key={index} icon={item.icon} value={item.value} />
                        ))}
                    </HStack>
                )}
            </Flex>
        </Box>
    );
};
