import { useCategoryParams } from '~/hooks/use-category-params.tsx';
import { Recipe } from '~/query/services/recipes/types.ts';
import { useAppSelector } from '~/redux/hooks';
import { selectCategories, selectSubCategories } from '~/redux/slices/category-slice';
import { getPathFromRecipe } from '~/utils/get-path-from-recipe';

export const useGetRecipePath = (recipe: Partial<Recipe>) => {
    const { selectedCategory, selectedSubCategory } = useCategoryParams();
    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);

    if (selectedCategory && selectedSubCategory) {
        return `/${selectedCategory.category}/${selectedSubCategory.category}/${recipe?._id}`;
    }

    return getPathFromRecipe(categories, subCategories, recipe);
};
