import { Container } from '@chakra-ui/react';

import { RecipeForm } from '~/components/widgets/recipe-form/recipe-form.tsx';

export const NewRecipePage = () => (
    <Container w='100%' maxW='100%' py={{ base: 4, md: '50px' }} px={0} mb={4}>
        <RecipeForm />
    </Container>
);
