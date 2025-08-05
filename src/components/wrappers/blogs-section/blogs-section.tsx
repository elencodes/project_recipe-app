import { Flex } from '@chakra-ui/icons';

import { BlogCard } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { BlogUser } from '~/query/services/blogs/types';

type BlogsSectionProps = {
    otherBlogs: BlogUser[];
};

export const BlogsSection = ({ otherBlogs }: BlogsSectionProps) => (
    <Flex
        maxW='100%'
        gap={4}
        pt={{ base: 2, md: 5 }}
        px={{ base: 3, md: 6 }}
        flexDirection={{ base: 'column', sm: 'row' }}
        data-test-id={DATA_TEST_ID.MAIN_PAGE_BLOGS_GRID}
    >
        {otherBlogs.map(({ _id, firstName, login, firstNoteText, lastName }) => (
            <BlogCard
                key={_id}
                firstName={firstName}
                login={login}
                firstNoteText={firstNoteText}
                lastName={lastName}
            />
        ))}
    </Flex>
);
