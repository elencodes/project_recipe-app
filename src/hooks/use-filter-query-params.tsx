import { useAllSubcategoriesOfCategory } from '~/hooks/use-all-subcategories-of-category.tsx';
import { useCategoryParams } from '~/hooks/use-category-params.tsx';
import { RecipeQueryParams } from '~/query/services/recipes/types.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectIsExcludeEnabled, selectSelectedAllergens } from '~/redux/slices/allergens-slice.ts';
import { selectSelectedSubCategories } from '~/redux/slices/category-slice.ts';
import { selectSelectedSides } from '~/redux/slices/garnish-slice.ts';
import { selectSelectedMeats } from '~/redux/slices/meat-slice.ts';
import { selectFilteredPage } from '~/redux/slices/recipes-slice.ts';
import { selectInputValue } from '~/redux/slices/search-slice.ts';
import { generateRequestParams } from '~/utils/generate-request-params.ts';

export const useFilterQueryParams = (): RecipeQueryParams => {
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const isExcludeEnabled = useAppSelector(selectIsExcludeEnabled);
    const selectedSubCategories = useAppSelector(selectSelectedSubCategories);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);
    const searchQuery = useAppSelector(selectInputValue);
    const currentPage = useAppSelector(selectFilteredPage);
    const { selectedCategory } = useCategoryParams();
    const subCategoryIdsFromCategory = useAllSubcategoriesOfCategory();

    const subCategoriesToUse = selectedCategory
        ? subCategoryIdsFromCategory
        : selectedSubCategories;

    return generateRequestParams({
        subCategories: subCategoriesToUse,
        meats: selectedMeats,
        sides: selectedSides,
        allergens: selectedAllergens,
        isExcludeEnabled,
        searchInput: searchQuery,
        page: currentPage,
    });
};
