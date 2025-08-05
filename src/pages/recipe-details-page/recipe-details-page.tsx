import { Button, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
    IngredientsTable,
    NewestRecipes,
    NutritionStats,
    RecipeAuthorCard,
    RecipeImageBlock,
    RecipeStepsSection,
} from '~/components';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCanRecommendRecipe } from '~/hooks/use-can-recommend-recipe';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { Recommend } from '~/icons/profile-icons/recommend';
import { useGetBloggerByIdQuery } from '~/query/services/blogs/blogs-api.ts';
import {
    useGetRecipeByIdQuery,
    useRecommendRecipeMutation,
} from '~/query/services/recipes/recipes-api.ts';
import { useGetUserInfoQuery } from '~/query/services/user/user-api';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectUserId } from '~/redux/slices/auth-slice.ts';

const { SearchErrorToast } = TOAST_MESSAGES;

export const RecipeDetailsPage = () => {
    const { isTablet } = useScreenSize();
    const canRecommend = useCanRecommendRecipe();
    const [recommendRecipe] = useRecommendRecipeMutation();
    const { toast } = useCustomToast();
    const recipeId = useParams().id;
    const navigate = useNavigate();
    const { data: foundRecipe, isError } = useGetRecipeByIdQuery(recipeId || '', {
        skip: !recipeId,
    });
    const userId = useAppSelector(selectUserId);
    const isOwnRecipe = foundRecipe?.authorId === userId;
    const shouldShowAuthorCard = !isOwnRecipe;
    const { data: blogger } = useGetBloggerByIdQuery(
        {
            bloggerId: foundRecipe?.authorId ?? '',
            currentUserId: userId,
        },
        {
            skip: !userId,
        },
    );

    const { data: userInfo } = useGetUserInfoQuery();

    const [hasRecommended, setHasRecommended] = useState(
        userInfo?._id ? foundRecipe?.recommendedByUserId?.includes(userInfo?._id) : false,
    );

    console.log('hasRecommended -> ', hasRecommended);

    const handleRecommend = async () => {
        try {
            await recommendRecipe(recipeId || '').unwrap();
            setHasRecommended((prev) => !prev);
        } catch {
            toast({ title: 'Не удалось рекомендовать рецепт', status: 'error' });
        }
    };

    useEffect(() => {
        if (isError) {
            navigate(-1);
            toast(SearchErrorToast);
        }
    }, [isError, navigate, toast]);

    if (!foundRecipe) return null;

    return (
        <Container
            gap={{ base: 6, md: 10 }}
            w='100%'
            maxW='100%'
            py={{ base: 4, md: '56px' }}
            px={0}
            mb={4}
            centerContent
        >
            <RecipeImageBlock recipe={foundRecipe} isTablet={isTablet} isAuthor={isOwnRecipe} />
            <NutritionStats nutritionValue={foundRecipe.nutritionValue} />
            <IngredientsTable
                ingredients={foundRecipe.ingredients}
                portions={foundRecipe.portions}
            />
            <RecipeStepsSection steps={foundRecipe.steps} />
            {shouldShowAuthorCard && blogger && (
                <RecipeAuthorCard
                    userId={blogger.bloggerInfo?._id}
                    firstName={blogger.bloggerInfo?.firstName}
                    lastName={blogger.bloggerInfo?.lastName}
                    login={blogger.bloggerInfo?.login}
                    isFavorite={blogger?.isFavorite}
                    subscribersCount={blogger?.totalSubscribers}
                    imageSrc={blogger.bloggerInfo?.photoLink}
                />
            )}
            {canRecommend && (
                <Button
                    variant={hasRecommended ? 'outline' : 'dark'}
                    size='lg'
                    leftIcon={<Recommend />}
                    w={{ base: '100%', sm: '604px', md: '680px' }}
                    onClick={handleRecommend}
                >
                    {hasRecommended ? 'Вы порекомендовали' : 'Рекомендовать рецепт'}
                </Button>
            )}
            <NewestRecipes />
        </Container>
    );
};
