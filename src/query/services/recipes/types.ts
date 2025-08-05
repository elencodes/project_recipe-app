import { CreateRecipeSchemaType } from '~/schemas/create-recipe.schema';

export type RecipeIngredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type RecipeNutrition = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Recipe = {
    _id: string;
    createdAt: string;
    title: string;
    description: string;
    time: number;
    image: string;
    likes: number;
    bookmarks: number;
    views: number;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: RecipeStep[];
    nutritionValue: RecipeNutrition;
    ingredients: RecipeIngredient[];
    meat?: string;
    garnish?: string;
    recommendedByUserId?: string[];
};

export type Recipes = Recipe[];

export type RecipesGrid = {
    recipes: Recipes;
    dataTestId?: string;
};

export type RecipeMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipeResponse = {
    data: Recipe[];
    meta: RecipeMeta;
};

export type PageParam = { page: number };

export enum SortBy {
    DATE = 'createdAt',
    LIKES = 'likes',
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type RecipeQueryParams = {
    page?: number;
    limit?: number;
    searchString?: string;
    allergens?: string[];
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
    sortBy?: SortBy;
    sortOrder?: SortOrder;
};

export type RecipeByCategoryQueryParams = {
    id?: string;
    limit?: number;
    page?: number;
    searchString?: string;
    allergens?: string;
};

export type CreateRecipeBody = CreateRecipeSchemaType;
export type CreateRecipeResponse = Recipe;

export type SaveDraftBody = Partial<CreateRecipeSchemaType>;
export type SaveDraftResponse = Recipe;

export type LikeRecipeResponse = {
    message: string;
    likes: number;
};

export type BookmarkRecipeResponse = {
    message: string;
    bookmarks: number;
};
