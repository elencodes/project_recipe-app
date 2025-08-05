import { useParams } from 'react-router';

import { useAppSelector } from '~/redux/hooks';
import { selectCategories } from '~/redux/slices/category-slice';

export const useCategoryParams = () => {
    const menuItems = useAppSelector(selectCategories);
    const { category: categoryName, subcategory: subCategoryName, id: recipeId } = useParams();

    const selectedCategory = menuItems.find((elem) => elem.category === categoryName) ?? null;

    const selectedSubCategory = selectedCategory?.subCategories?.length
        ? selectedCategory.subCategories.find((sub) => sub.category === subCategoryName)
        : null;

    return {
        selectedCategory,
        selectedSubCategory: selectedSubCategory ?? null,
        recipeId: recipeId ?? null,
    };
};
