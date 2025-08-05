import { FILTER_RECIPES_LIMIT } from '~/query/constants/recipe-consts.ts';
import { RecipeQueryParams } from '~/query/services/recipes/types.ts';

type RequestParams = {
    subCategories: string[];
    meats: string[];
    sides: string[];
    allergens: string[];
    searchInput: string;
    isExcludeEnabled: boolean;
    page?: number;
    limit?: number;
};

export const generateRequestParams = ({
    subCategories,
    meats,
    sides,
    allergens,
    searchInput,
    isExcludeEnabled,
    page = 1,
    limit = FILTER_RECIPES_LIMIT,
}: RequestParams): RecipeQueryParams => {
    const result: RecipeQueryParams = {
        page,
        limit,
    };

    if (subCategories.length > 0) {
        result.subcategoriesIds = subCategories;
    }
    if (meats.length > 0) {
        result.meat = meats;
    }
    if (sides.length > 0) {
        result.garnish = sides;
    }
    if (isExcludeEnabled && allergens.length > 0) {
        result.allergens = allergens;
    }
    if (searchInput) {
        result.searchString = searchInput;
    }

    return result;
};
