import {
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    Image,
    Spacer,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { RecipeStats } from '~/components';
import { useGetRecipePath } from '~/hooks/use-get-recipe-path.tsx';
import { useMapCategoriesToTags } from '~/hooks/use-map-categories-to-tags.tsx';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { Recipe } from '~/query/services/recipes/types.ts';
import { buildImageUrl } from '~/utils/build-image-url';

type RecipeCardVerticalProps = {
    recipe: Recipe;
    isWithoutImage?: boolean;
};

export const RecipeCardVertical = memo(
    ({ recipe, isWithoutImage = false }: RecipeCardVerticalProps) => {
        const { isTablet } = useScreenSize();
        const padding = { base: '10px', md: '18px' };
        const navigate = useNavigate();
        const path = useGetRecipePath(recipe);
        const tags = useMapCategoriesToTags(
            recipe.categoriesIds,
            isWithoutImage ? 'lime.50' : 'lime.150',
        );

        const handleNavigate = () => {
            navigate(path);
        };

        return (
            <Card
                w={{
                    base: isWithoutImage ? '100%' : '158px',
                    sm: isWithoutImage ? '232px' : '158px',
                    md: isWithoutImage ? '282px' : '277px',
                    xl: '322px',
                }}
                height='100%'
                minH={isWithoutImage ? 'unset' : '220px'}
                transition='box-shadow 0.2s ease'
                _hover={{
                    boxShadow:
                        '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                }}
                onClick={handleNavigate}
            >
                <CardBody
                    p={0}
                    position='relative'
                    overflow='hidden'
                    display='flex'
                    flexDirection='column'
                >
                    {!isWithoutImage && (
                        <Image
                            src={buildImageUrl(recipe.image)}
                            alt={recipe.title}
                            h={{ base: '128px', md: '230px' }}
                            borderBottomRadius='none'
                            borderTopRadius='lg'
                        />
                    )}
                    <Stack p={padding} spacing='3'>
                        <Heading
                            noOfLines={{ base: isWithoutImage ? 1 : 2, md: 1 }}
                            wordBreak={{ base: isWithoutImage ? 'break-all' : 'break-word' }}
                            size={{ base: 'sm', md: 'md' }}
                            fontWeight='500'
                        >
                            {recipe.title}
                        </Heading>
                        {(!isTablet || isWithoutImage) && (
                            <Text noOfLines={3} fontSize='sm'>
                                {recipe.description}
                            </Text>
                        )}
                    </Stack>
                    <Spacer />
                    <Flex p={padding} justifyContent='space-between' alignItems='flex-end'>
                        {!isWithoutImage && isTablet && (
                            <Box position='absolute' top='5px' left='5px'>
                                <VStack align='start' spacing={1}>
                                    {tags}
                                </VStack>
                            </Box>
                        )}
                        {(!isTablet || isWithoutImage) && (
                            <VStack align='start' spacing={1}>
                                {tags}
                            </VStack>
                        )}
                        <RecipeStats likes={recipe.likes} bookmarks={recipe.bookmarks} />
                    </Flex>
                </CardBody>
            </Card>
        );
    },
);
