import { VStack } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    HStack,
    Image,
    Spacer,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { RecipeStats } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useGetRecipePath } from '~/hooks/use-get-recipe-path.tsx';
import { useMapCategoriesToTags } from '~/hooks/use-map-categories-to-tags.tsx';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { BookmarkFilled } from '~/icons/profile-icons/bookmark-filled';
import { ImageIcon } from '~/icons/recipe-page-icons/image-icon';
import { useBookmarkRecipeMutation } from '~/query/services/recipes/recipes-api.ts';
import { Recipe } from '~/query/services/recipes/types.ts';
import { useAppDispatch } from '~/redux/hooks.ts';
import { toggleBookmark } from '~/redux/slices/user-recipes-slice.ts';
import { buildImageUrl } from '~/utils/build-image-url.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type UserRecipeCardProps = {
    recipe: Partial<Recipe>;
    isDraft?: boolean;
    isBookmark?: boolean;
    dataTestId?: string;
};

const { ServerErrorToast } = TOAST_MESSAGES;

export const UserRecipeCard = ({
    recipe,
    isDraft,
    isBookmark,
    dataTestId,
}: UserRecipeCardProps) => {
    const { isTablet } = useScreenSize();
    const tags = useMapCategoriesToTags(recipe?.categoriesIds || []);
    const dispatch = useAppDispatch();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const { toast } = useCustomToast();
    const navigate = useNavigate();
    const path = useGetRecipePath(recipe);

    const handleBookmark = async () => {
        try {
            await bookmarkRecipe(recipe?._id ?? '').unwrap();
            dispatch(toggleBookmark(recipe as Recipe));
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    const handleEditRecipe = () => {
        if (isDraft) {
            navigate(`/edit-draft/${recipe?._id}`, {
                state: { draft: recipe },
            });
        } else {
            navigate(`/edit-recipe${path}`);
        }
    };

    return (
        <Card
            direction='row'
            overflow='hidden'
            variant='outline'
            transition='box-shadow 0.2s ease'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
            minH='128px'
            data-test-id={dataTestId}
        >
            <Box position='relative' w='48%'>
                <Box
                    w='100%'
                    h='100%'
                    bg='blackAlpha.200'
                    rounded='md'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    _hover={{ bg: 'blackAlpha.300' }}
                    position='relative'
                >
                    {recipe?.image ? (
                        <Image
                            src={buildImageUrl(recipe?.image)}
                            alt={recipe?.title}
                            borderBottomRadius='none'
                            borderLeftRadius='lg'
                            w='100%'
                            h='100%'
                            objectFit='cover'
                        />
                    ) : (
                        <Box textAlign='center'>
                            <ImageIcon width='33px' height='28px' />
                        </Box>
                    )}
                </Box>
                {isTablet &&
                    (isDraft ? (
                        <Tag w='max-content' bgColor='blackAlpha.100' px={2} py={1} gap={1}>
                            <TagLabel fontWeight={400} fontSize='sm'>
                                Черновик
                            </TagLabel>
                        </Tag>
                    ) : (
                        <Box position='absolute' top='8px' left='8px'>
                            <VStack align='start' spacing={1}>
                                {tags}
                            </VStack>
                        </Box>
                    ))}
            </Box>
            <CardBody
                display='flex'
                gap={{ base: 1, sm: 2, md: 5 }}
                flexDirection='column'
                position='relative'
                px={isTablet ? 2 : 8}
                pt={isTablet ? 2 : 5}
                pb={isTablet ? 1 : 5}
            >
                <HStack align='start'>
                    {!isTablet &&
                        (isDraft ? (
                            <Tag
                                w='max-content'
                                bgColor='blackAlpha.100'
                                px={2}
                                py={1}
                                gap={1}
                                ml='auto'
                            >
                                <TagLabel fontWeight={400} fontSize='sm'>
                                    Черновик
                                </TagLabel>
                            </Tag>
                        ) : (
                            <VStack align='start' spacing={1}>
                                {tags}
                            </VStack>
                        ))}
                    {!isTablet && !isDraft && <Spacer />}
                    {!isDraft && (
                        <RecipeStats likes={recipe?.likes} bookmarks={recipe?.bookmarks} />
                    )}
                </HStack>
                <VStack align='start' justify='start' gap={isTablet ? 2 : 5}>
                    <Heading
                        noOfLines={{ base: 2, md: 1 }}
                        size={{ base: 'sm', md: 'md' }}
                        fontWeight='500'
                    >
                        {recipe?.title}
                    </Heading>
                    {!isTablet && (
                        <Text noOfLines={3} fontSize='sm' wordBreak='break-all'>
                            {recipe?.description}
                        </Text>
                    )}
                </VStack>
                <HStack justifyContent='end' mt='auto'>
                    {isBookmark ? (
                        <Button
                            size={isTablet ? 'xs' : 'sm'}
                            variant={isDraft ? 'dark' : 'outline'}
                            colorScheme='black'
                            leftIcon={isTablet ? undefined : <BookmarkFilled />}
                            onClick={handleBookmark}
                        >
                            Убрать из сохранённых
                        </Button>
                    ) : (
                        <Button
                            size={isTablet ? 'xs' : 'sm'}
                            variant={isDraft ? 'dark' : 'outline'}
                            colorScheme='black'
                            onClick={handleEditRecipe}
                            data-test-id={DATA_TEST_ID.USER_PROFILE_EDIT_BTN}
                        >
                            Редактировать
                        </Button>
                    )}
                </HStack>
            </CardBody>
        </Card>
    );
};
