import { Avatar, Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';

import { buildImageUrl } from '~/utils/build-image-url';

type SubscriberCardProps = {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    photo?: string;
};

export const SubscriberCard = ({ id, firstName, lastName, login, photo }: SubscriberCardProps) => (
    <Card key={id}>
        <CardBody p='16px 24px'>
            <Flex gap='3' alignItems='center'>
                <Avatar name={`${firstName} ${lastName}`} src={buildImageUrl(photo)} size='md' />
                <Box>
                    <Heading size='md' fontWeight={500} noOfLines={1}>
                        {firstName} {lastName}
                    </Heading>
                    <Text size='sm' color='blackAlpha.700'>
                        @{login}
                    </Text>
                </Box>
            </Flex>
        </CardBody>
    </Card>
);
