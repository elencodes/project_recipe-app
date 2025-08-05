import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import {
    BlogsSection,
    CategoryPageLayout,
    CategoryPreviewSection,
    FilteredResultsSection,
    JuiciestSection,
    NewestRecipes,
    SectionWrapper,
} from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useGetBlogsQuery } from '~/query/services/blogs/blogs-api';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectUserId } from '~/redux/slices/auth-slice';
import { selectFilteredRecipes } from '~/redux/slices/recipes-slice.ts';
import { arrayHasItems } from '~/utils/array-has-items';

const { ServerErrorToast } = TOAST_MESSAGES;

export const MainPage = () => {
    const navigate = useNavigate();
    const { toast } = useCustomToast();
    const filteredRecipes = useAppSelector(selectFilteredRecipes);

    const currentUserId = useAppSelector(selectUserId);
    const { data: blogsPreview, isError } = useGetBlogsQuery({
        currentUserId,
        limit: '',
    });

    const handleNavigateButtonClick = () => {
        navigate(PATHS.BLOGS);
    };

    useEffect(() => {
        if (isError) {
            toast(ServerErrorToast);
        }
    }, [isError, toast]);

    if (filteredRecipes.length) {
        return (
            <CategoryPageLayout title='Приятного аппетита!'>
                <FilteredResultsSection />
            </CategoryPageLayout>
        );
    }

    return (
        <CategoryPageLayout title='Приятного аппетита!'>
            <NewestRecipes />
            <JuiciestSection />
            {arrayHasItems(blogsPreview?.others) && !isError && (
                <SectionWrapper
                    title='Кулинарные блоги'
                    buttonLabel='Все авторы'
                    theme='lime'
                    onButtonClick={handleNavigateButtonClick}
                    dataTestIdSection={DATA_TEST_ID.MAIN_PAGE_BLOGS_BOX}
                    dataTestIdMob={DATA_TEST_ID.MAIN_PAGE_BLOGS_BUTTON}
                    dataTestId={DATA_TEST_ID.MAIN_PAGE_BLOGS_BUTTON}
                >
                    <BlogsSection otherBlogs={blogsPreview.others} />
                </SectionWrapper>
            )}
            <CategoryPreviewSection />
        </CategoryPageLayout>
    );
};
