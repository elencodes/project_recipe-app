import { RecipeNutrition } from '~/query/services/recipes/types.ts';

type NutritionDataItem = {
    label: string;
    value: number;
    unit: string;
};

export const formatNutritionData = (nutritionValue: RecipeNutrition): NutritionDataItem[] => [
    {
        label: 'калорийность',
        value: nutritionValue.calories,
        unit: 'ККАЛ',
    },
    {
        label: 'белки',
        value: nutritionValue.protein,
        unit: 'ГРАММ',
    },
    {
        label: 'жиры',
        value: nutritionValue.fats,
        unit: 'ГРАММ',
    },
    {
        label: 'углеводы',
        value: nutritionValue.carbohydrates,
        unit: 'ГРАММ',
    },
];
