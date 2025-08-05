import { Button, Tooltip } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { SubscribedIcon } from '~/icons/blog-icons/subscribed-icon';
import { SubscribeIcon } from '~/icons/button-icons/subscribe-icon';
import { useToggleSubscriptionMutation } from '~/query/services/blogs/blogs-api.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectUserId } from '~/redux/slices/auth-slice.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type SubscribeButtonProps = Partial<{
    userId: string;
    isFavorite: boolean;
    onLoadingChange: (value: boolean) => void;
    onSubscribed: (userId: string) => void;
}>;

const { ServerErrorToast } = TOAST_MESSAGES;

export const SubscribeButton = ({
    userId,
    isFavorite = false,
    onLoadingChange,
    onSubscribed,
}: SubscribeButtonProps) => {
    const [toggleSubscription] = useToggleSubscriptionMutation();
    const currentUserId = useAppSelector(selectUserId);
    const { toast } = useCustomToast();

    const handleButtonClick = async () => {
        onLoadingChange?.(true);
        try {
            await toggleSubscription({
                toUserId: userId ?? '',
                fromUserId: currentUserId,
            }).unwrap();
            onSubscribed?.(userId ?? '');
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        } finally {
            onLoadingChange?.(false);
        }
    };

    return isFavorite ? (
        <Tooltip
            hasArrow
            label='Нажмите, если хотите отписаться'
            openDelay={100}
            maxWidth={150}
            bgColor='blackAlpha.900'
            data-test-id={DATA_TEST_ID.BLOG_TOOLTIP}
        >
            <Button
                type='button'
                size='xs'
                color='blackAlpha.800'
                fontSize='xs'
                variant='outline'
                borderColor='blackAlpha.600'
                leftIcon={<SubscribedIcon />}
                onClick={handleButtonClick}
                data-test-id={DATA_TEST_ID.BLOG_TOGGLE_UNSUBSCRIBE}
            >
                Вы подписаны
            </Button>
        </Tooltip>
    ) : (
        <Button
            size='xs'
            color='white'
            bg='blackAlpha.900'
            fontSize='xs'
            leftIcon={<SubscribeIcon />}
            onClick={handleButtonClick}
            data-test-id={DATA_TEST_ID.BLOG_TOGGLE_SUBSCRIBE}
        >
            Подписаться
        </Button>
    );
};
