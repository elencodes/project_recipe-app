import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import { BlogCard } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { DESKTOP_BLOGS_PER_VIEW, MOBILE_BLOGS_PER_VIEW } from '~/pages/blogs-page/blogs-page';
import { BlogUser } from '~/query/services/blogs/types.ts';
import { arrayHasItems } from '~/utils/array-has-items.ts';

type OtherBlogsCollapseProps = {
    blogs?: BlogUser[];
    changeLimit: (limit: string) => void;
};

export const OtherBlogsCollapse = ({ blogs, changeLimit }: OtherBlogsCollapseProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDesktop } = useScreenSize();

    const onMoreBloggersClick = () => {
        if (arrayHasItems(blogs) && blogs.length <= MOBILE_BLOGS_PER_VIEW) {
            changeLimit('all');
        } else {
            changeLimit(isDesktop ? String(DESKTOP_BLOGS_PER_VIEW) : String(MOBILE_BLOGS_PER_VIEW));
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <Box
            mt={{ base: 1, xl: 3 }}
            mb={{ base: 1, md: 1 }}
            w='100%'
            bg='blackAlpha.50'
            borderRadius='16px'
            padding={{ base: 4, xl: 6 }}
            alignItems='center'
            data-test-id={DATA_TEST_ID.BLOGS_OTHERS_BOX}
        >
            <Stack align='center'>
                <SimpleGrid
                    w='100%'
                    columns={{ base: 1, sm: 2, xl: 3 }}
                    columnGap={{ base: 4, xl: 4 }}
                    rowGap={{ base: 4, xl: 6 }}
                    gridTemplateColumns={{
                        base: '1fr',
                        sm: 'repeat(2, 1fr)',
                        xl: 'repeat(3, 1fr)',
                    }}
                    data-test-id={DATA_TEST_ID.BLOGS_OTHERS_GRID}
                >
                    {blogs?.map((item) => <BlogCard key={item?._id} isBlogPage {...item} />)}
                </SimpleGrid>
                <Button
                    width='fit-content'
                    mt={{ base: 2, xl: 4 }}
                    size={{ base: 'lg', lg: 'lg' }}
                    rightIcon={isOpen ? undefined : <ArrowForwardIcon />}
                    leftIcon={isOpen ? <ArrowBackIcon /> : undefined}
                    alignItems='center'
                    variant='ghost'
                    onClick={onMoreBloggersClick}
                    data-test-id={DATA_TEST_ID.BLOGS_OTHERS_BUTTON}
                >
                    {isOpen ? 'Свернуть' : 'Всe авторы'}
                </Button>
            </Stack>
        </Box>
    );
};
