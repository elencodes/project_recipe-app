import { useAppSelector } from '~/redux/hooks.ts';
import { selectCategories, selectSubCategories } from '~/redux/slices/category-slice.ts';

export const useIconBySubCategoryId = (categoriesIds: string[]): string | undefined => {
    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);

    const recipeSubCategoryId = categoriesIds?.[0] ?? '';
    const foundSubCategory = subCategories.find((elem) => elem._id === recipeSubCategoryId);
    const foundCategory = categories.find(
        (category) => category._id === foundSubCategory?.rootCategoryId,
    );

    return foundCategory?.icon ?? '';
};
