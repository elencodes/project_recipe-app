import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { PATHS } from '~/app/routes/paths';
import { RecipeForm } from '~/components/widgets/recipe-form/recipe-form.tsx';
import { useGetRecipeByIdQuery } from '~/query/services/recipes/recipes-api.ts';
import { transformRecipeToFormData } from '~/utils/transform-recipe-to-form-data.ts';

export const EditRecipePage = () => {
    const { id } = useParams();
    const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(id!);
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            navigate(PATHS.NOT_FOUND, { replace: true });
        }
    }, [isError, navigate]);

    if (isLoading || !recipe) return null;

    const transformed = transformRecipeToFormData(recipe);

    return (
        <Container w='100%' maxW='100%' py={{ base: 4, md: '50px' }} px={0} mb={4}>
            <RecipeForm initialData={transformed} recipeId={id} mode='edit' />
        </Container>
    );
};
