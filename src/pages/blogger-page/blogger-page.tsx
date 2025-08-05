import { VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { BloggerInfo } from '~/components/ui/blogger-info/blogger-info';
import { BloggerRecipes } from '~/components/ui/blogger-recipes/blogger-recipes';
import { BloggerNotesCollapse } from '~/components/widgets/blogger-notes-collapse/blogger-notes-collapse';
import { OtherBlogsSection } from '~/components/widgets/other-blogs-section/other-blogs-section';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import {
    useGetBloggerByIdQuery,
    useGetBlogsQuery,
    useGetRecipeByUserIdQuery,
} from '~/query/services/blogs/blogs-api.ts';
import { useAppDispatch, useAppSelector } from '~/redux/hooks.ts';
import { selectIsSubscribedToUser, selectSubscriptionsForUsers } from '~/redux/selectors.ts';
import { selectUserId } from '~/redux/slices/auth-slice.ts';
import { setSubscription, toggleSubscription } from '~/redux/slices/subscriptions-slice.ts';

const { ServerErrorToast } = TOAST_MESSAGES;

export const BloggerPage = () => {
    const currentUserId = useAppSelector(selectUserId);
    const { toast } = useCustomToast();
    const navigate = useNavigate();
    const { userId = '' } = useParams();
    const { data: bloggerRecipes, error } = useGetRecipeByUserIdQuery(userId);
    const { data: blogger, error: userError } = useGetBloggerByIdQuery(
        {
            bloggerId: userId,
            currentUserId,
        },
        {
            skip: !userId,
        },
    );
    const { data: blogsPreview } = useGetBlogsQuery(
        { currentUserId, limit: '' },
        { skip: !currentUserId },
    );
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isSubscribed = useAppSelector(selectIsSubscribedToUser(userId));

    const handleToggleFavorite = () => {
        dispatch(toggleSubscription(userId));
    };

    const userIds = blogsPreview?.others?.map((user) => user._id) ?? [];
    const subscriptions = useAppSelector(selectSubscriptionsForUsers(userIds));

    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView();
                }, 50);
            }
        }
    }, [location.hash]);

    useEffect(() => {
        if (
            (error && 'status' in error && error.status === 404) ||
            (userError && 'status' in userError && userError.status === 404)
        ) {
            navigate(PATHS.NOT_FOUND, { replace: true });
        } else if (error || userError) {
            toast(ServerErrorToast);
            navigate(PATHS.ROOT, { replace: true });
        }
    }, [error, userError, navigate, toast]);

    useEffect(() => {
        if (blogger && blogger.isFavorite !== undefined) {
            dispatch(
                setSubscription({
                    userId: userId,
                    isSubscribed: blogger.isFavorite,
                }),
            );
        }
    }, [blogger, userId, dispatch]);

    return (
        <VStack my={4} gap={{ base: 3, md: 6 }} align='center'>
            {blogger && (
                <BloggerInfo
                    _id={userId}
                    firstName={blogger?.bloggerInfo.firstName}
                    lastName={blogger?.bloggerInfo.lastName}
                    login={blogger?.bloggerInfo.login}
                    subscribersCount={blogger?.totalSubscribers}
                    bookmarksCount={blogger?.totalBookmarks}
                    isFavorite={isSubscribed}
                    onToggleFavorite={handleToggleFavorite}
                    imgSrc={blogger?.bloggerInfo?.photoLink}
                />
            )}
            <BloggerRecipes bloggerRecipes={bloggerRecipes?.recipes} />
            <BloggerNotesCollapse bloggerNotes={bloggerRecipes?.notes ?? []} id='notes' />
            {blogsPreview?.others && (
                <OtherBlogsSection others={blogsPreview.others} subscriptions={subscriptions} />
            )}
        </VStack>
    );
};
