import { Button, HStack, IconButton } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { BookmarkIcon } from '~/icons/counter-icons/bookmark-icon';
import { ReactionIcon } from '~/icons/counter-icons/reaction-icon';
import { DraftIcon } from '~/icons/recipe-page-icons/draft-icon';
import { TrashIcon } from '~/icons/recipe-page-icons/trash-icon';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import {
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
} from '~/query/services/recipes/recipes-api.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type RecipeActionButtonsProps = {
    isAuthor: boolean;
    recipeId: string;
    onDelete?: () => void;
};

const { ServerErrorToast } = TOAST_MESSAGES;

export const RecipeActionButtons = ({ isAuthor, recipeId, onDelete }: RecipeActionButtonsProps) => {
    const { toast } = useCustomToast();
    const navigate = useNavigate();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();
    const { category, subcategory, id } = useParams();

    const handleEditClick = () => {
        if (category && subcategory && id) {
            navigate(`/edit-recipe/${category}/${subcategory}/${id}`);
        }
    };

    const handleLike = async () => {
        try {
            await likeRecipe(recipeId).unwrap();
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    const handleBookmark = async () => {
        try {
            await bookmarkRecipe(recipeId).unwrap();
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRecipe(recipeId).unwrap();
            const message = TOAST_MESSAGES.DeleteRecipeToast[StatusCodes.OK];
            onDelete?.();
            toast({ ...message, status: Statuses.SUCCESS });
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error?.status;
                const toastData =
                    TOAST_MESSAGES.DeleteRecipeToast[
                        status as keyof typeof TOAST_MESSAGES.DeleteRecipeToast
                    ];
                if (toastData) {
                    toast(toastData);
                }
            }
        }
    };

    return (
        <HStack>
            {isAuthor ? (
                <>
                    <IconButton
                        aria-label='Удалить'
                        variant='ghost'
                        colorScheme='dark'
                        size={{ base: 'xs', md: 'md' }}
                        icon={<TrashIcon />}
                        onClick={handleDelete}
                        data-test-id={DATA_TEST_ID.RECIPE_DELETE_BUTTON}
                    />
                    <Button
                        size={{ base: 'xs', md: 'md' }}
                        leftIcon={<DraftIcon />}
                        variant='outline'
                        colorScheme='dark'
                        onClick={handleEditClick}
                    >
                        Редактировать рецепт
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        size={{ base: 'xs', md: 'md' }}
                        variant='outline'
                        leftIcon={<ReactionIcon />}
                        colorScheme='black'
                        onClick={handleLike}
                    >
                        Оценить рецепт
                    </Button>
                    <Button
                        size={{ base: 'xs', md: 'md' }}
                        variant='solid'
                        leftIcon={<BookmarkIcon />}
                        bgColor='lime.400'
                        onClick={handleBookmark}
                    >
                        Сохранить в закладки
                    </Button>
                </>
            )}
        </HStack>
    );
};
