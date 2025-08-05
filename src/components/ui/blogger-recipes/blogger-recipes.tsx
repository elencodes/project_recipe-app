import { Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { ResponsiveRecipeGrid } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { Recipe } from '~/query/services/recipes/types';

type BloggerRecipesProps = {
    bloggerRecipes?: Recipe[];
};

const INITIAL_RECIPES_COUNT = 8;

export const BloggerRecipes = ({ bloggerRecipes }: BloggerRecipesProps) => {
    const [showAllRecipes, setShowAllRecipes] = useState(false);

    const recipesToShow = showAllRecipes
        ? bloggerRecipes || []
        : bloggerRecipes?.slice(0, INITIAL_RECIPES_COUNT) || [];

    const shouldShowLoadMore =
        !showAllRecipes && bloggerRecipes && bloggerRecipes.length > INITIAL_RECIPES_COUNT;

    const handleLoadMore = () => {
        setShowAllRecipes(true);
    };
    return (
        <VStack gap={{ base: 3, md: 6 }} align='center'>
            <ResponsiveRecipeGrid
                recipes={recipesToShow}
                dataTestId={DATA_TEST_ID.RECIPE_CARD_LIST}
            />
            {shouldShowLoadMore && (
                <Button
                    data-test-id={DATA_TEST_ID.LOAD_MORE_BUTTON}
                    bg='lime.400'
                    color='black'
                    onClick={handleLoadMore}
                >
                    Загрузить еще
                </Button>
            )}
        </VStack>
    );
};
