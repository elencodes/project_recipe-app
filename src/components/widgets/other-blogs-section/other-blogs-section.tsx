import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { BlogCard } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { BlogUser } from '~/query/services/blogs/types.ts';
import { useAppDispatch } from '~/redux/hooks.ts';
import { toggleSubscription } from '~/redux/slices/subscriptions-slice.ts';

type OtherBlogsSectionProps = {
    subscriptions: Record<string, boolean>;
    others?: BlogUser[];
};

export const OtherBlogsSection = ({ others, subscriptions }: OtherBlogsSectionProps) => {
    const dispatch = useAppDispatch();

    const handleToggleFavorite = (userId: string) => {
        dispatch(toggleSubscription(userId));
    };

    return (
        <VStack w='100%'>
            <HStack justify='space-between' w='100%' mt={{ base: 6, xmd: 7 }}>
                <Heading fontWeight={500} fontSize={{ base: 24, xl: 48 }}>
                    Другие блоги
                </Heading>
                <Button
                    mt={{ base: 2, xl: 4 }}
                    size={{ base: 'xs', lg: 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    variant='ghost'
                    as={Link}
                    to={PATHS.BLOGS}
                    data-test-id={DATA_TEST_ID.BLOGGER_USER_OTHERS_BLOGS_BUTTON}
                >
                    Всe авторы
                </Button>
            </HStack>
            <SimpleGrid
                w='100%'
                columns={{ base: 1, sm: 3 }}
                columnGap={4}
                rowGap={{ base: 4, md: 6 }}
                gridTemplateColumns={{
                    base: '1fr',
                    sm: 'repeat(3, 1fr)',
                }}
                data-test-id={DATA_TEST_ID.BLOGGER_USER_OTHERS_BLOGS_GRID}
            >
                {others?.map((item) => (
                    <BlogCard
                        key={item._id}
                        isBloggerPage
                        {...item}
                        isFavorite={subscriptions[item._id]}
                        onSubscribed={handleToggleFavorite}
                    />
                ))}
            </SimpleGrid>
        </VStack>
    );
};
