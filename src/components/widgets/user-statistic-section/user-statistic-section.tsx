import { Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { ResponsiveRecipeGrid, StatItem } from '~/components';
import { StatsChart } from '~/components/ui/bookmark-chart/stats-chart.tsx';
import { RecommendationBanner } from '~/components/ui/recommendation-banner/recommendation-banner.tsx';
import { SubscribersList } from '~/components/ui/subscribers-list/subscribers-list.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { useCanRecommendRecipe } from '~/hooks/use-can-recommend-recipe.tsx';
import { BookmarkHeart } from '~/icons/profile-icons/bookmark-heart';
import { FavoritesFilled } from '~/icons/profile-icons/favorites-filled';
import { Recommend } from '~/icons/profile-icons/recommend';
import { SubscribersFilled } from '~/icons/profile-icons/subscribers-filled';
import { useGetStatisticQuery, useGetUserAllQuery } from '~/query/services/user/user-api.ts';
import { arrayHasItems } from '~/utils/array-has-items.ts';
import { filterUsersByIds } from '~/utils/filter-users-by-ids.ts';
import { groupStatsByWeek } from '~/utils/group-stats-by-week.ts';
import { pluralizeWithCount } from '~/utils/pluralize-ru.ts';

type UserStatisticSectionProps = {
    subscribers: string[];
};

export const UserStatisticSection = ({ subscribers }: UserStatisticSectionProps) => {
    const { data: stats } = useGetStatisticQuery();
    const { data: allUsers } = useGetUserAllQuery();
    const canRecommend = useCanRecommendRecipe();

    const mySubscribers = useMemo(() => {
        if (!allUsers) return [];
        return filterUsersByIds(allUsers, subscribers);
    }, [allUsers, subscribers]);

    const bookmarkWeeklyData = groupStatsByWeek(stats?.bookmarks || []);

    const likeWeeklyData = groupStatsByWeek(stats?.likes || []);

    return (
        <VStack alignItems={{ base: 'center', md: 'start' }} spacing={4} w='100%'>
            <Text w='100%' fontSize={{ base: 'lg', md: 'xl' }} fontWeight='600'>
                Статистика
            </Text>
            <VStack alignItems='start' spacing={4} w='100%'>
                <StatItem
                    icon={<SubscribersFilled />}
                    value={pluralizeWithCount(
                        subscribers.length,
                        'подписчик',
                        'подписчика',
                        'подписчиков',
                    )}
                />
                <SubscribersList users={mySubscribers} />
            </VStack>
            <VStack alignItems='start' spacing={4} w={{ base: '100%', xl: '90%' }}>
                <StatItem
                    icon={<BookmarkHeart />}
                    value={pluralizeWithCount(
                        stats?.totalBookmarks || 0,
                        'сохранение',
                        'сохранения',
                        'сохранений',
                    )}
                />
                <StatsChart statsData={bookmarkWeeklyData} />
            </VStack>
            <VStack alignItems='start' spacing={4} w={{ base: '100%', xl: '90%' }}>
                <StatItem
                    icon={<FavoritesFilled />}
                    value={pluralizeWithCount(stats?.totalLikes || 0, 'лайк', 'лайка', 'лайков')}
                />
                <StatsChart statsData={likeWeeklyData} chartType='likes' />
            </VStack>
            {canRecommend && (
                <VStack
                    data-test-id={DATA_TEST_ID.RECOMMENDATION_BLOCK}
                    w='100%'
                    alignItems='start'
                >
                    <RecommendationBanner />
                    <StatItem
                        icon={<Recommend />}
                        value={pluralizeWithCount(
                            stats?.recommendationsCount || 0,
                            'рекомендованный рецепт',
                            'рекомендованных рецепта',
                            'рекомендованных рецептов',
                        )}
                    />
                    {arrayHasItems(stats?.recipesWithRecommendations) && (
                        <ResponsiveRecipeGrid recipes={stats?.recipesWithRecommendations} />
                    )}
                </VStack>
            )}
        </VStack>
    );
};
