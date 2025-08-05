import { Category } from '~/types/category-type';

const getRandom = (range: number) => Math.floor(Math.random() * range);

export const getRandomCategory = (categories: Category[]) => {
    const randomInd = getRandom(categories.length);
    const randomCategory = categories[randomInd];

    const title = randomCategory?.title;
    const description = randomCategory?.description;
    const firstSubCategoryId = randomCategory?.subCategories?.[0]?._id;

    return { title, description, firstSubCategoryId };
};
