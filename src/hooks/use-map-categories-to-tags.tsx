import { RecipeTag } from '~/components';
import { useAppSelector } from '~/redux/hooks';
import { selectCategories, selectSubCategories } from '~/redux/slices/category-slice';
import { buildImageUrl } from '~/utils/build-image-url';

export const useMapCategoriesToTags = (subCategoryIds: string[] = [], bgColor = 'lime.50') => {
    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);

    if (!subCategoryIds || subCategoryIds.length === 0) return [];

    const uniqueCategoryMap = new Map<string, { title: string; icon: string | undefined }>();

    subCategoryIds.forEach((subId) => {
        const subCategory = subCategories.find((sub) => sub._id === subId);
        if (!subCategory) return;

        const parentCategory = categories.find((cat) => cat._id === subCategory.rootCategoryId);
        if (!parentCategory) return;

        if (!uniqueCategoryMap.has(parentCategory._id)) {
            uniqueCategoryMap.set(parentCategory._id, {
                title: parentCategory.title,
                icon: buildImageUrl(parentCategory.icon),
            });
        }
    });

    return Array.from(uniqueCategoryMap.entries()).map(([id, { title, icon }]) => (
        <RecipeTag key={id} category={title} iconSrc={icon} bgColor={bgColor} />
    ));
};
