import { Button, IconButton } from '@chakra-ui/react';

import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { BookmarkIcon } from '~/icons/counter-icons/bookmark-icon';
import { useBookmarkRecipeMutation } from '~/query/services/recipes/recipes-api.ts';
import { Recipe } from '~/query/services/recipes/types';
import { useAppDispatch } from '~/redux/hooks.ts';
import { toggleBookmark } from '~/redux/slices/user-recipes-slice.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type SaveButtonProps = {
    recipe: Recipe;
};

const { ServerErrorToast } = TOAST_MESSAGES;

export const SaveButton = ({ recipe }: SaveButtonProps) => {
    const { isTablet } = useScreenSize();
    const { toast } = useCustomToast();
    const dispatch = useAppDispatch();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const handleBookmark = async () => {
        try {
            await bookmarkRecipe(recipe?._id).unwrap();
            dispatch(toggleBookmark(recipe as Recipe));
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    return isTablet ? (
        <IconButton
            onClick={handleBookmark}
            aria-label='Сохранить'
            icon={<BookmarkIcon />}
            size='xs'
            variant='outline'
        />
    ) : (
        <Button onClick={handleBookmark} size='sm' variant='outline' leftIcon={<BookmarkIcon />}>
            Сохранить
        </Button>
    );
};
