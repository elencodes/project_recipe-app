import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

import { CategoryPageLayout, CategoryPreviewSection, ResponsiveRecipeGrid } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { JUICIEST_PAGE_PARAMS } from '~/query/constants/recipe-consts.ts';
import { useGetRecipesInfiniteInfiniteQuery } from '~/query/services/recipes/recipes-api.ts';

const { SearchErrorToast } = TOAST_MESSAGES;

export const JuiciestPage = () => {
    const { toast } = useCustomToast();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useGetRecipesInfiniteInfiniteQuery(JUICIEST_PAGE_PARAMS);

    const juiciestItems = data?.pages.flatMap((page) => page.data) ?? [];

    const shouldShowLoadMoreButton = hasNextPage && !isLoading;

    useEffect(() => {
        if (isError) {
            toast(SearchErrorToast);
        }
    }, [isError, toast]);

    return (
        <CategoryPageLayout title='Самое сочное'>
            <Flex
                mt={10}
                mb={3}
                flexDirection='column'
                gap={4}
                justifyContent='center'
                alignItems='center'
            >
                <ResponsiveRecipeGrid recipes={juiciestItems} />

                {shouldShowLoadMoreButton && (
                    <Button
                        data-test-id={DATA_TEST_ID.LOAD_MORE_BUTTON}
                        bg='lime.400'
                        color='black'
                        onClick={() => fetchNextPage()}
                        isLoading={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? 'Загрузка' : 'Загрузить еще'}
                    </Button>
                )}

                <CategoryPreviewSection />
            </Flex>
        </CategoryPageLayout>
    );
};
