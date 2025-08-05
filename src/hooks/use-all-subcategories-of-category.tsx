import { useAppSelector } from '~/redux/hooks';
import { selectSubCategories } from '~/redux/slices/category-slice';

import { useCategoryParams } from './use-category-params';

export const useAllSubcategoriesOfCategory = () => {
    const { selectedCategory } = useCategoryParams();
    const subCategories = useAppSelector(selectSubCategories);

    if (!selectedCategory) return [];

    return subCategories
        .filter((sub) => sub.rootCategoryId === selectedCategory._id)
        .map((sub) => sub._id);
};
