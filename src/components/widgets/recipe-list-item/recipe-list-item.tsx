import { Button, HStack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetRecipePath } from '~/hooks/use-get-recipe-path.tsx';
import { useIconBySubCategoryId } from '~/hooks/use-icon-by-sub-category-id.tsx';
import { Recipe } from '~/query/services/recipes/types.ts';

type RecipeListItemProps = {
    recipe: Recipe;
};

export const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
    const imageSrc = useIconBySubCategoryId(recipe.categoriesIds);
    const navigate = useNavigate();
    const path = useGetRecipePath(recipe);

    const handleNavigate = () => {
        navigate(path);
    };

    return (
        <HStack
            width='100%'
            justify='space-between'
            p={3}
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='8px'
            boxShadow='none'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                cursor: 'pointer',
            }}
        >
            <HStack>
                <Image src={imageSrc} alt='' />
                <Text
                    wordBreak='break-all'
                    noOfLines={1}
                    fontWeight='500'
                    fontSize={{ base: 'md', md: 'lg', xl: 'xl' }}
                >
                    {recipe?.title}
                </Text>
            </HStack>
            <Button
                w={{ base: '70px', lg: '82px' }}
                flexShrink={0}
                fontSize={{ base: 'xs', lg: 'sm' }}
                size='sm'
                variant='outline'
                borderColor='lime.600'
                color='lime.600'
                onClick={handleNavigate}
            >
                Готовить
            </Button>
        </HStack>
    );
};
