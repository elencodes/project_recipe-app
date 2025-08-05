import { HStack } from '@chakra-ui/react';

import { StatItem } from '~/components';
import { SubscribersIcon } from '~/icons/blog-icons/subscribers-icon';
import { BookmarkIcon } from '~/icons/counter-icons/bookmark-icon';
import { ReactionIcon } from '~/icons/counter-icons/reaction-icon';

type RecipeStatsProps = Partial<{
    bookmarks: number;
    likes: number;
    subscribers: number;
    dataTestIdSubs: string;
    dataTestIdLikes: string;
    dataTestIdBook: string;
    isBloggerInfo: boolean;
}>;

export const RecipeStats = ({
    bookmarks = 0,
    likes = 0,
    subscribers = 0,
    dataTestIdLikes,
    dataTestIdSubs,
    dataTestIdBook,
    isBloggerInfo = false,
}: RecipeStatsProps) => (
    <HStack align='start' spacing={1}>
        {(isBloggerInfo || bookmarks > 0) && (
            <StatItem
                icon={<BookmarkIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />}
                value={bookmarks}
                dataTestId={dataTestIdBook}
            />
        )}
        {likes > 0 && (
            <StatItem
                icon={<ReactionIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />}
                value={likes}
                dataTestId={dataTestIdLikes}
            />
        )}
        {(isBloggerInfo || subscribers > 0) && (
            <StatItem
                icon={<SubscribersIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />}
                value={subscribers}
                dataTestId={dataTestIdSubs}
            />
        )}
    </HStack>
);
