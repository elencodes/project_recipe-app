import { Flex } from '@chakra-ui/icons';
import { Avatar, Box, Card, CardBody, HStack, Text } from '@chakra-ui/react';

import { RecipeStats } from '~/components/widgets';
import { SubscribeButton } from '~/components/widgets/subscribe-button/subscribe-button';
import { buildImageUrl } from '~/utils/build-image-url';

type RecipeAuthorCardProps = {
    userId: string;
    isFavorite: boolean;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    imageSrc?: string;
};

export const RecipeAuthorCard = ({
    userId,
    isFavorite,
    firstName,
    lastName,
    login,
    subscribersCount,
    imageSrc,
}: RecipeAuthorCardProps) => (
    <Box w={{ base: '100%', sm: '604px', md: '680px' }}>
        <Card
            direction='row'
            align='center'
            overflow='hidden'
            bgColor='lime.300'
            p={{ base: 3, sm: 6 }}
        >
            <Avatar src={buildImageUrl(imageSrc)} name={`${firstName} ${lastName}`} size='xl' />
            <CardBody
                w='100%'
                display='flex'
                flexDirection='column'
                py={0}
                pr={0}
                pl={{ base: 2, sm: 4 }}
            >
                <Flex
                    direction={{ base: 'column-reverse', sm: 'row' }}
                    justifyContent='space-between'
                >
                    <Text fontSize={{ base: 'lg', sm: '2xl' }} fontWeight='600'>
                        {firstName} {lastName}
                    </Text>
                    <Text fontSize={{ base: 'xs', sm: 'sm' }} align='right'>
                        Автор рецепта
                    </Text>
                </Flex>
                <Text fontSize='sm' color='blackAlpha.700'>
                    @{login}
                </Text>
                <HStack mt='16px' justify='space-between'>
                    <SubscribeButton userId={userId} isFavorite={isFavorite} />
                    <RecipeStats subscribers={subscribersCount} />
                </HStack>
            </CardBody>
        </Card>
    </Box>
);
