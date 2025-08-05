import { PATHS } from '~/app/routes/paths';
import { Category } from '~/types/category-type';

export const getFirstSubcategoryPath = (categorySlug: string, categories: Category[]): string => {
    const category = categories.find((cat) => cat.category === categorySlug);
    const firstSub = category?.subCategories?.[0]?.category;

    return firstSub
        ? `${PATHS.ROOT}${categorySlug}${PATHS.ROOT}${firstSub}`
        : `${PATHS.ROOT}${categorySlug}`;
};
