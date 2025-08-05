import { Badge } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths';
import { Loader, RecipeStats } from '~/components';
import { Float } from '~/components/ui/float/float';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { BlogUser } from '~/query/services/blogs/types';
import { buildImageUrl } from '~/utils/build-image-url';
import { getNewRecipesText } from '~/utils/get-new-recipes-text';

import { SubscribeButton } from '../subscribe-button/subscribe-button';

type BlogCardProps = Partial<
    BlogUser & {
        isBlogPage: boolean;
        isBloggerPage: boolean;
        onSubscribed?: (userId: string) => void;
    }
>;

export const BlogCard = ({
    _id,
    firstName,
    lastName,
    firstNoteText,
    login,
    subscribersCount,
    bookmarksCount,
    newRecipesCount,
    isFavorite,
    photoLink,
    isBlogPage = false,
    isBloggerPage = false,
    onSubscribed,
}: BlogCardProps) => {
    const [isSubscribing, setIsSubscribing] = useState(false);
    const navigate = useNavigate();

    const handleRecipesClick = () => {
        navigate(PATHS.BLOGS + PATHS.ROOT + _id);
    };

    const handleNotesClick = () => {
        navigate(PATHS.BLOGS + PATHS.ROOT + _id + '#notes');
    };

    return (
        <Card
            w='100%'
            transition='box-shadow 0.2s ease'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
            data-test-id={DATA_TEST_ID.BLOGS_CARD}
        >
            <CardHeader px={{ base: 4, md: 6 }} pb={0}>
                <Flex gap='3' pt={2}>
                    <Flex gap='3' alignItems='center' wrap='nowrap'>
                        <Avatar
                            name={`${firstName} ${lastName}`}
                            src={buildImageUrl(photoLink)}
                            size={{ base: 'sm', md: 'md' }}
                        />
                        <Box>
                            <Heading
                                size={{ base: 'sm', xl: '18px' }}
                                fontWeight={500}
                                wordBreak='break-all'
                                noOfLines={1}
                                data-test-id={DATA_TEST_ID.BLOGS_CARD_NAME}
                            >
                                {`${firstName} ${lastName}`}
                            </Heading>
                            <Text
                                size={{ base: 'xs', md: 'sm' }}
                                color='blackAlpha.700'
                                data-test-id={DATA_TEST_ID.BLOGS_CARD_LOGIN}
                            >
                                @{login}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
                {isFavorite && Boolean(newRecipesCount) && (
                    <Float top={{ base: 1, xl: 2 }} right={{ base: 1, xl: 2 }}>
                        <Badge
                            fontWeight='400'
                            color='black'
                            bg='blackAlpha.100'
                            fontSize='14px'
                            variant='solid'
                            textTransform='lowercase'
                            p='1px 5px'
                            data-test-id={DATA_TEST_ID.BLOGS_CARD_NEW_RECIPES_BADGE}
                        >
                            {getNewRecipesText(newRecipesCount ?? 0)}
                        </Badge>
                    </Float>
                )}
            </CardHeader>
            <CardBody p={{ base: 4, lg: 6 }}>
                <Text
                    noOfLines={3}
                    fontSize='14px'
                    data-test-id={DATA_TEST_ID.BLOGS_CARD_NOTES_TEXT}
                >
                    {firstNoteText}
                </Text>
            </CardBody>
            {(isBlogPage || isBloggerPage) && (
                <CardFooter>
                    <Flex
                        w='100%'
                        flexDirection={
                            isBloggerPage ? { base: 'column-reverse', sm: 'row' } : 'row'
                        }
                        alignItems={isBloggerPage ? { base: 'end', sm: 'center' } : 'center'}
                        justifyContent={
                            isBloggerPage ? { base: 'end', xl: 'space-between' } : 'space-between'
                        }
                        gap={isBloggerPage ? 4 : 0}
                        flexWrap={isBloggerPage ? 'wrap-reverse' : 'unset'}
                    >
                        <HStack>
                            {isFavorite && isBlogPage ? (
                                <Button
                                    size='xs'
                                    variant='solid'
                                    color='black'
                                    colorScheme='lime'
                                    onClick={handleRecipesClick}
                                    data-test-id={DATA_TEST_ID.BLOGS_CARD_RECIPES_BUTTON}
                                >
                                    Рецепты
                                </Button>
                            ) : (
                                <SubscribeButton
                                    userId={_id}
                                    onLoadingChange={setIsSubscribing}
                                    isFavorite={isFavorite}
                                    onSubscribed={onSubscribed}
                                />
                            )}
                            <Button
                                size='xs'
                                variant='outline'
                                colorScheme='lime'
                                onClick={handleNotesClick}
                                data-test-id={DATA_TEST_ID.BLOGS_CARD_NOTES_BUTTON}
                            >
                                Читать
                            </Button>
                        </HStack>
                        <RecipeStats
                            bookmarks={bookmarksCount}
                            subscribers={subscribersCount}
                            isBloggerInfo
                        />
                    </Flex>
                </CardFooter>
            )}
            {isSubscribing && (
                <Center position='absolute' width='100%' height='100%' top={0} left={0}>
                    <Loader dataTestId={DATA_TEST_ID.MOBILE_LOADER} isSmall />
                </Center>
            )}
        </Card>
    );
};
