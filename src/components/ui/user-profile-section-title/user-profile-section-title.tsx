import { HStack, Text } from '@chakra-ui/react';

type UserProfileSectionTitle = {
    title: string;
    count: number;
};

export const UserProfileSectionTitle = ({ title, count }: UserProfileSectionTitle) => (
    <HStack>
        <Text size='xl' fontWeight='600' lineHeight='none'>
            {title}
        </Text>
        <Text lineHeight='none' color='blackAlpha.600' size='xl'>
            ({count})
        </Text>
    </HStack>
);
