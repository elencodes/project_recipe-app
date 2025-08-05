import { Flex } from '@chakra-ui/react';

import { StatItem } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { useCanRecommendRecipe } from '~/hooks/use-can-recommend-recipe';
import { BookmarkIcon } from '~/icons/counter-icons/bookmark-icon';
import { FriendsIcon } from '~/icons/counter-icons/friends-icon';
import { ReactionIcon } from '~/icons/counter-icons/reaction-icon';
import { Recommend } from '~/icons/profile-icons/recommend';
import { useGetStatisticQuery, useGetUserInfoQuery } from '~/query/services/user/user-api.ts';

export const Stats = () => {
    const { data: userInfo } = useGetUserInfoQuery();
    const { data: stats } = useGetStatisticQuery();
    const canRecommend = useCanRecommendRecipe();

    const totalBookmarks = stats?.totalBookmarks ?? 0;
    const totalLikes = stats?.totalLikes ?? 0;
    const totalSubscribers = userInfo?.totalSubscribers ?? 0;
    const recommendationsCount = stats?.recommendationsCount ?? 0;

    const statsItems = [];

    if (canRecommend) {
        statsItems.push({
            icon: <Recommend w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />,
            value: recommendationsCount,
        });
    }

    statsItems.push(
        {
            icon: <BookmarkIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />,
            value: totalBookmarks,
        },
        {
            icon: <FriendsIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />,
            value: totalSubscribers,
        },
        {
            icon: <ReactionIcon w={{ base: 3, sm: 4 }} h={{ base: 3, sm: 4 }} />,
            value: totalLikes,
        },
    );

    return (
        <Flex
            pl={{ base: 2, sm: 0 }}
            pr={{ base: 2, sm: 0 }}
            pt={{ base: 0, sm: 4 }}
            pb={{ base: 0, sm: 4 }}
            flexDirection={{ base: 'row', md: 'column' }}
            gap={{ base: 2, sm: 6 }}
            data-test-id={DATA_TEST_ID.USER_STATS}
        >
            {statsItems.map((item, index) => (
                <StatItem key={index} icon={item.icon} value={item.value} />
            ))}
        </Flex>
    );
};
