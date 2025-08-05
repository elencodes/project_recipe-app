export type SubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type Category = {
    _id: string;
    title: string;
    description?: string;
    category: string;
    icon?: string;
    subCategories?: SubCategory[];
};

export type CombinedCategoriesAndSubCategories = {
    categories: Category[];
    subCategories: SubCategory[];
};
