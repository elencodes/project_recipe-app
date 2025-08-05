import { PATHS } from '~/app/routes/paths.ts';
import { Recipe } from '~/query/services/recipes/types.ts';
import { Category, SubCategory } from '~/types/category-type';

export const getPathFromRecipe = (
    categories: Category[],
    subCategories: SubCategory[],
    recipe: Partial<Recipe>,
): string => {
    const { _id, categoriesIds } = recipe;

    if (!categoriesIds || categoriesIds.length === 0) {
        return PATHS.ROOT;
    }

    const firstSub = subCategories.find((sub) => sub._id === categoriesIds[0]);

    if (!firstSub) return PATHS.ROOT;

    const parent = categories.find((cat) => cat._id === firstSub.rootCategoryId);
    if (!parent) return PATHS.ROOT;

    return `${PATHS.ROOT}${parent.category}${PATHS.ROOT}${firstSub.category}${PATHS.ROOT}${_id}`;
};
