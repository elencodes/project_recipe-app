import { useAppSelector } from '~/redux/hooks.ts';
import { selectTotalBookmarks, selectTotalSubscribers } from '~/redux/slices/user-recipes-slice.ts';

export const useCanRecommendRecipe = (): boolean => {
    const totalSubscribers = useAppSelector(selectTotalSubscribers);
    const totalBookmarks = useAppSelector(selectTotalBookmarks);

    return totalSubscribers > 100 && totalBookmarks > 200;
};
