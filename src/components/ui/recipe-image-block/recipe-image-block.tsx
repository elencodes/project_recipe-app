import { Flex, Heading, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';

import { RecipeActionButtons, RecipeStats, RecipeTag } from '~/components';
import { useMapCategoriesToTags } from '~/hooks/use-map-categories-to-tags.tsx';
import { ClockIcon } from '~/icons/recipe-page-icons/clock-icon';
import { Recipe } from '~/query/services/recipes/types.ts';
import { buildImageUrl } from '~/utils/build-image-url.ts';

type RecipeImageBlockProps = {
    recipe: Recipe;
    isTablet: boolean;
    isAuthor: boolean;
    onDelete?: () => void;
};

export const RecipeImageBlock = ({
    recipe,
    isTablet,
    isAuthor,
    onDelete,
}: RecipeImageBlockProps) => {
    const tags = useMapCategoriesToTags(recipe.categoriesIds);
    return (
        <Flex w='100%' gap={6} flexDirection={{ base: 'column', sm: 'row' }}>
            <Image
                borderRadius='xl'
                minW={{ base: 238, sm: 232, md: 353, xl: 535 }}
                minH={{ base: 224, md: 410 }}
                objectFit='cover'
                src={buildImageUrl(recipe.image)}
                alt={recipe.title}
            />
            <Flex w='100%' flexDirection='column' gap={6}>
                <Flex justifyContent='space-between'>
                    <HStack align='start' spacing={3} wrap='wrap'>
                        {tags}
                    </HStack>
                    <RecipeStats likes={recipe.likes} bookmarks={recipe.bookmarks} />
                </Flex>
                <VStack align='start'>
                    <Heading as='h1' maxW={437} fontSize={{ base: '2xl', md: '5xl' }}>
                        {recipe.title}
                    </Heading>
                    <Text maxW={537}>{recipe.description}</Text>
                </VStack>
                {!isTablet && <Spacer />}
                <Flex
                    flexDirection={{ base: 'column', sm: 'row' }}
                    gap={2}
                    alignItems={{ base: 'start', md: 'end' }}
                >
                    <RecipeTag
                        category={recipe.time}
                        bgColor='blackAlpha.100'
                        icon={<ClockIcon />}
                    />
                    <Spacer />
                    <RecipeActionButtons
                        isAuthor={isAuthor}
                        recipeId={recipe._id}
                        onDelete={onDelete}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
