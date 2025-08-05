import { Divider } from '@chakra-ui/icons';
import { Box, Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { RecipeCardVertical, RecipeListItem } from '~/components';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import {
    INITIAL_PAGE_NUM,
    RANDOM_CATEGORY_RECIPES_LIMIT,
} from '~/query/constants/recipe-consts.ts';
import { useGetRecipeByCategoryQuery } from '~/query/services/recipes/recipes-api.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectCategories } from '~/redux/slices/category-slice.ts';
import { isTestMode } from '~/utils/configure-test-mode.ts';
import { getRandomCategory } from '~/utils/get-random-category.ts';

const RANDOM_CATEGORY_BIG_CARD_START = 0;
const RANDOM_CATEGORY_BIG_CARD_END = 2;
const RANDOM_CATEGORY_SMALL_CARD_START = 2;
const RANDOM_CATEGORY_SMALL_CARD_END = 5;
const TOAST_DELAY_TEST_MODE = 100;
const TOAST_DELAY = 15000;

const { SearchErrorToast } = TOAST_MESSAGES;

export const CategoryPreviewSection = () => {
    const categories = useAppSelector(selectCategories);
    const location = useLocation();
    const { toast } = useCustomToast();
    const [selectedCategory, setSelectedCategory] = useState(() => getRandomCategory(categories));
    const [hasShownError, setHasShownError] = useState(false);

    useEffect(() => {
        setSelectedCategory(getRandomCategory(categories));
    }, [location.pathname, categories]);

    const { title, description, firstSubCategoryId } = selectedCategory || {};

    const { data, isError } = useGetRecipeByCategoryQuery(
        {
            id: firstSubCategoryId,
            limit: RANDOM_CATEGORY_RECIPES_LIMIT,
            page: INITIAL_PAGE_NUM,
        },
        {
            skip: !firstSubCategoryId,
        },
    );

    const randomCategoryRecipes = data?.data ?? [];
    const firstRecipes = randomCategoryRecipes.slice(
        RANDOM_CATEGORY_BIG_CARD_START,
        RANDOM_CATEGORY_BIG_CARD_END,
    );
    const lastRecipes = randomCategoryRecipes.slice(
        RANDOM_CATEGORY_SMALL_CARD_START,
        RANDOM_CATEGORY_SMALL_CARD_END,
    );

    useEffect(() => {
        if (isError && !hasShownError) {
            const toastDelay = isTestMode() ? TOAST_DELAY_TEST_MODE : TOAST_DELAY;
            toast(SearchErrorToast, true, toastDelay);
            setHasShownError(true);
        } else if (!isError && hasShownError) {
            setHasShownError(false);
        }
    }, [isError, toast, hasShownError]);

    return (
        <Box mt={8}>
            <Divider />
            <Flex
                w='100%'
                my={{ base: 2, md: 6 }}
                gap={4}
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'start', md: 'center' }}
                justifyContent='start'
            >
                <Heading flex={1} fontWeight='500' fontSize={{ md: '48px', base: '24px' }} mb={2}>
                    {title}
                </Heading>
                {description && (
                    <Text
                        flex={{ md: 2, xl: 1 }}
                        color='blackAlpha.700'
                        pr={15}
                        pl={{ base: 0, md: 10 }}
                        fontSize={{ base: 'sm', md: 'md' }}
                    >
                        {description}
                    </Text>
                )}
            </Flex>
            <Grid
                maxW='100%'
                templateColumns={{ base: '1fr', sm: 'max-content max-content auto' }}
                gap={{ base: 3, md: 4 }}
                alignItems={{ lg: 'start' }}
            >
                {firstRecipes.map((recipe) => (
                    <RecipeCardVertical key={recipe.title} recipe={recipe} isWithoutImage />
                ))}
                <VStack justify='space-between' h='100%'>
                    {lastRecipes.map((recipe) => (
                        <RecipeListItem key={recipe._id} recipe={recipe} />
                    ))}
                </VStack>
            </Grid>
        </Box>
    );
};
