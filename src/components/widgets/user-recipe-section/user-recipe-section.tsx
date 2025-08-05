import { Button, Grid, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { UserProfileSectionTitle } from '~/components/ui/user-profile-section-title/user-profile-section-title.tsx';
import { UserRecipeCard } from '~/components/ui/user-recipe-card/user-recipe-card.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { Recipe } from '~/query/services/recipes/types.ts';

type UserRecipeSectionProps = {
    drafts: Partial<Recipe>[];
    recipes: Recipe[];
};

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 4;

export const UserRecipeSection = ({ drafts, recipes }: UserRecipeSectionProps) => {
    const allRecipes = [
        ...drafts.map((r) => ({ ...r, isDraft: true })),
        ...recipes.map((r) => ({ ...r, isDraft: false })),
    ];
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const showLoadMore = allRecipes.length > visibleCount;

    return (
        <VStack
            align='center'
            w='100%'
            spacing={4}
            data-test-id={DATA_TEST_ID.USER_PROFILE_RECIPES}
        >
            <HStack alignItems='center' m={0} w='100%' spacing={8}>
                <UserProfileSectionTitle title='Мои рецепты' count={recipes.length} />
                {drafts.length > 0 && (
                    <UserProfileSectionTitle title='Черновики' count={drafts.length} />
                )}
            </HStack>
            {allRecipes.length > 0 && (
                <>
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: '1fr',
                            xl: 'repeat(2, 1fr)',
                        }}
                        gap={6}
                        width='100%'
                        maxW='100%'
                        autoRows='1fr'
                    >
                        {allRecipes.slice(0, visibleCount).map((recipe, index) => (
                            <UserRecipeCard
                                key={recipe._id}
                                recipe={recipe}
                                isDraft={recipe.isDraft}
                                dataTestId={DATA_TEST_ID.USER_PROFILE_FOOD_CARD(index)}
                            />
                        ))}
                    </Grid>

                    {showLoadMore && (
                        <Button
                            bg='lime.400'
                            color='black'
                            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
                        >
                            Загрузить ещё
                        </Button>
                    )}
                </>
            )}
        </VStack>
    );
};
