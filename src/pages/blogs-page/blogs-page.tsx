import { SimpleGrid } from '@chakra-ui/icons';
import { Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { BlogCard, NewestRecipes, SectionWrapper } from '~/components';
import { OtherBlogsCollapse } from '~/components/wrappers/other-blogs-collapse/other-blogs-collapse';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { useGetBlogsQuery } from '~/query/services/blogs/blogs-api.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectUserId } from '~/redux/slices/auth-slice.ts';

const { ServerErrorToast } = TOAST_MESSAGES;

export const MOBILE_BLOGS_PER_VIEW = 9;
export const DESKTOP_BLOGS_PER_VIEW = 8;

export const BlogsPage = () => {
    const { isDesktop } = useScreenSize();
    const [blogsPerView, setBlogsPerView] = useState<string | number>(MOBILE_BLOGS_PER_VIEW);
    const { toast } = useCustomToast();
    const navigate = useNavigate();
    const currentUserId = useAppSelector(selectUserId);
    const { data: blogsPreview, isError } = useGetBlogsQuery({
        currentUserId,
        limit: String(blogsPerView),
    });

    useEffect(() => {
        if (isError) {
            toast(ServerErrorToast);
            navigate(PATHS.ROOT, { replace: true });
        }
    }, [isError, navigate, toast]);

    useEffect(() => {
        if (blogsPerView !== 'all') {
            setBlogsPerView(isDesktop ? DESKTOP_BLOGS_PER_VIEW : MOBILE_BLOGS_PER_VIEW);
        }
    }, [isDesktop, blogsPerView]);

    return (
        <>
            <Heading as='h1' textAlign='center' fontSize={{ base: '2xl', md: '5xl' }} mt={6}>
                Кулинарные блоги
            </Heading>
            <VStack w='100%' gap={4} mb={6}>
                {blogsPreview?.favorites.length && (
                    <SectionWrapper
                        title='Избранные блоги'
                        theme='lime'
                        dataTestIdSection={DATA_TEST_ID.BLOGS_FAVOURITE_BOX}
                    >
                        <SimpleGrid
                            px={{ base: 2, sm: 6 }}
                            pb={{ base: 2, sm: 6 }}
                            columns={{ base: 1, sm: 2 }}
                            gap={{ base: 3, md: 4 }}
                            gridTemplateColumns={{
                                base: '1fr',
                                sm: 'repeat(2, 1fr)',
                            }}
                            data-test-id={DATA_TEST_ID.BLOGS_FAVOURITE_GRID}
                        >
                            {blogsPreview?.favorites.map((item) => (
                                <BlogCard key={item?._id} isBlogPage {...item} />
                            ))}
                        </SimpleGrid>
                    </SectionWrapper>
                )}
                {blogsPreview?.others.length && (
                    <OtherBlogsCollapse
                        blogs={blogsPreview?.others}
                        changeLimit={setBlogsPerView}
                    />
                )}
                <NewestRecipes />
            </VStack>
        </>
    );
};
