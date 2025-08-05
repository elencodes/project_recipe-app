import { Grid } from '@chakra-ui/react';

import { RecipeCardHorizontal } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { RecipesGrid } from '~/query/services/recipes/types.ts';

export const ResponsiveRecipeGrid = ({ recipes, dataTestId }: RecipesGrid) => (
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
        data-test-id={dataTestId}
    >
        {recipes.map((recipe, index) => (
            <RecipeCardHorizontal
                dataTestId={`${DATA_TEST_ID.FOOD_CARD}${index}`}
                key={recipe?._id + index}
                recipe={recipe}
                index={index}
            />
        ))}
    </Grid>
);
