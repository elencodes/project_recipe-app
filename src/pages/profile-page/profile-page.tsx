import { Grid, HStack, useDisclosure, VStack } from '@chakra-ui/react';

import { UserProfileHeader } from '~/components/ui/user-profile-header/user-profile-header.tsx';
import { UserProfileSectionTitle } from '~/components/ui/user-profile-section-title/user-profile-section-title.tsx';
import { UserRecipeCard } from '~/components/ui/user-recipe-card/user-recipe-card.tsx';
import { BloggerNotesCollapse } from '~/components/widgets/blogger-notes-collapse/blogger-notes-collapse.tsx';
import { CreateNoteDrawer } from '~/components/widgets/create-note-drawer/create-note-drawer.tsx';
import { UserRecipeSection } from '~/components/widgets/user-recipe-section/user-recipe-section.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { useGetRecipeByUserIdQuery } from '~/query/services/blogs/blogs-api.ts';
import { useGetStatisticQuery, useGetUserInfoQuery } from '~/query/services/user/user-api.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectUserBookmarks, selectUserNotes } from '~/redux/slices/user-recipes-slice.ts';

export const ProfilePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: userInfo } = useGetUserInfoQuery();
    const { data: userRecipes } = useGetRecipeByUserIdQuery(userInfo?._id ?? '', {
        skip: !userInfo?._id,
    });
    const { data: stats } = useGetStatisticQuery();

    const bookmarks = useAppSelector(selectUserBookmarks) ?? [];
    const notes = useAppSelector(selectUserNotes) ?? [];
    const drafts = userInfo?.drafts ?? [];
    const recipes = userRecipes?.recipes ?? [];

    return (
        <>
            <VStack my={4} gap={6} w='100%'>
                {userInfo && (
                    <UserProfileHeader
                        userInfo={userInfo}
                        totalBookmarks={stats?.totalBookmarks || 0}
                    />
                )}
                <UserRecipeSection drafts={drafts} recipes={recipes} />
                <BloggerNotesCollapse
                    bloggerNotes={notes}
                    id='notes'
                    isUserPage
                    onButtonClick={onOpen}
                />
                <VStack
                    align='center'
                    w='100%'
                    spacing={4}
                    data-test-id={DATA_TEST_ID.USER_PROFILE_BOOKMARKS}
                >
                    <HStack alignItems='center' m={0} w='100%' spacing={8}>
                        <UserProfileSectionTitle title='Мои закладки' count={bookmarks.length} />
                    </HStack>
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: '1fr',
                            xl: 'repeat(2, 1fr)',
                        }}
                        gap={6}
                        width='100%'
                        maxW='100%'
                        autoRows='1fr'
                    >
                        {bookmarks.map((recipe, index) => (
                            <UserRecipeCard
                                key={recipe._id}
                                recipe={recipe}
                                dataTestId={DATA_TEST_ID.USER_PROFILE_FOOD_CARD(index)}
                                isBookmark
                            />
                        ))}
                    </Grid>
                </VStack>
            </VStack>
            <CreateNoteDrawer onClose={onClose} isOpen={isOpen} />
        </>
    );
};
