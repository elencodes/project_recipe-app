import {
    Button,
    Collapse,
    Flex,
    Heading,
    HStack,
    Stack,
    StackProps,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';

import { BloggerNoteCard } from '~/components/ui/blogger-note-card/blogger-note-card';
import { UserProfileSectionTitle } from '~/components/ui/user-profile-section-title/user-profile-section-title';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { PenIcon } from '~/icons/profile-icons/pen-icon';
import { Note } from '~/query/services/blogs/types.ts';

type BloggerNotesCollapseProps = {
    bloggerNotes: Note[];
    isUserPage?: boolean;
    onButtonClick?: () => void;
} & StackProps;

const COLLAPSE_BREAKPOINT_HEIGHTS = {
    base: 204,
    sm: 244,
    md: 204,
    xl: 169,
};

const CARD_MIN_WIDTHS = {
    base: 'calc(100% / 2)',
    sm: 'calc(100% / 4)',
    md: 'calc(100% / 3)',
    xl: 'calc(100% / 4)',
};

const CARD_MAX_WIDTHS = {
    base: '100%',
    sm: 'calc(100% / 2)',
};

export const BloggerNotesCollapse = ({
    bloggerNotes,
    isUserPage,
    onButtonClick,
    ...rest
}: BloggerNotesCollapseProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const collapseHeight = useBreakpointValue(COLLAPSE_BREAKPOINT_HEIGHTS);
    const notesCount = bloggerNotes.length;
    const shouldShowButton = notesCount > 3;
    const toggleText = isCollapsed ? 'Показать больше' : 'Свернуть';

    const toggleCollapse = () => setIsCollapsed((prev) => !prev);

    return (
        <Stack
            bgColor='blackAlpha.50'
            borderRadius='16px'
            w='100%'
            align='center'
            p={{ base: 4, md: 6 }}
            pb={isUserPage ? 4 : 3}
            pt={isUserPage ? 4 : { base: 6, sm: 5 }}
            gap={{ base: 2, sm: 3, md: 4 }}
            data-test-id={DATA_TEST_ID.BLOG_NOTES_BOX}
            {...rest}
        >
            {isUserPage ? (
                <HStack justifyContent='space-between' alignItems='center' m={0} w='100%'>
                    <UserProfileSectionTitle title='Заметки' count={notesCount} />
                    <Button
                        size='sm'
                        leftIcon={<PenIcon />}
                        variant='outline'
                        colorScheme='dark'
                        onClick={onButtonClick}
                    >
                        Новая заметка
                    </Button>
                </HStack>
            ) : (
                <HStack alignItems='center' m={0} w='100%'>
                    <Heading fontSize={{ base: 20, md: 36 }} lineHeight='none' fontWeight={400}>
                        Заметки
                    </Heading>
                    <Text
                        lineHeight='none'
                        color='blackAlpha.600'
                        fontSize={{ base: 20, md: 30 }}
                        fontWeight={400}
                        data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_COUNT}
                    >
                        ({notesCount})
                    </Text>
                </HStack>
            )}

            <Collapse
                in={!isCollapsed}
                startingHeight={notesCount !== 0 ? collapseHeight : 0}
                style={{ width: '100%' }}
            >
                <Flex
                    flexWrap='wrap'
                    gap={4}
                    mt={{ base: 4, md: 3 }}
                    data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_GRID}
                >
                    {bloggerNotes.map((note, index) => (
                        <BloggerNoteCard
                            key={note.date + index}
                            isUserPage={isUserPage}
                            {...note}
                            minHeight={collapseHeight}
                            minWidth={CARD_MIN_WIDTHS}
                            maxWidth={CARD_MAX_WIDTHS}
                            flex={1}
                        />
                    ))}
                </Flex>
            </Collapse>

            {shouldShowButton && (
                <Button
                    w='fit-content'
                    size={{ base: 'xs', md: 'sm' }}
                    variant='ghost'
                    mt={{ base: 3, sm: 0 }}
                    onClick={toggleCollapse}
                    data-test-id={DATA_TEST_ID.BLOGGER_USER_NOTES_BUTTON}
                >
                    {toggleText}
                </Button>
            )}
        </Stack>
    );
};
