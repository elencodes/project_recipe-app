import { Container } from '@chakra-ui/react';
import { Navigate, useLocation, useParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { RecipeForm } from '~/components/widgets/recipe-form/recipe-form.tsx';
import { Recipe } from '~/query/services/recipes/types.ts';
import { transformDraftToFormData } from '~/utils/transform-recipe-to-form-data.ts';

type LocationState = {
    draft?: Partial<Recipe>;
};

export const EditDraftPage = () => {
    const { state } = useLocation() as { state: LocationState };
    const { draft } = state || {};
    const { draftId } = useParams();

    if (!draft || draft._id !== draftId) {
        return <Navigate to={PATHS.NOT_FOUND} replace />;
    }

    const transformed = transformDraftToFormData(draft as Recipe);

    return (
        <Container w='100%' maxW='100%' py={{ base: 4, md: '50px' }} px={0} mb={4}>
            <RecipeForm initialData={transformed} recipeId={draftId} mode='editDraft' />
        </Container>
    );
};
