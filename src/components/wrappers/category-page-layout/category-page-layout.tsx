import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { SearchGroup } from '~/components';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectSelectedAllergens } from '~/redux/slices/allergens-slice.ts';
import { selectIsFiltering, selectShowEmptyText } from '~/redux/slices/recipes-slice.ts';
import { selectSearchValue } from '~/redux/slices/search-slice.ts';

type CategoryPageLayoutProps = {
    children: ReactNode;
} & Partial<{
    title: string;
    description: string;
}>;

export const CategoryPageLayout = ({ title, description, children }: CategoryPageLayoutProps) => {
    const inputValue = useAppSelector(selectSearchValue);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const isFiltering = useAppSelector(selectIsFiltering);
    const showEmptyText = useAppSelector(selectShowEmptyText);

    const shouldHighlightBlock = inputValue.trim().length > 0 || selectedAllergens.length > 0;

    return (
        <Container w='100%' maxW='100%' p={0} mb={4} centerContent>
            <Box
                w={{ base: '100%', md: '898px' }}
                borderRadius={shouldHighlightBlock ? '24px' : undefined}
                boxShadow={
                    shouldHighlightBlock
                        ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        : undefined
                }
                display='flex'
                pb={isFiltering ? 0 : { base: 2, sm: 4, md: 0 }}
                mb={8}
                flexDirection='column'
                alignItems='center'
                bg='white'
            >
                {showEmptyText ? (
                    <Text size='md' fontWeight='600' my={4} textAlign='center'>
                        По вашему запросу ничего не найдено.
                        <br />
                        Попробуйте другой запрос
                    </Text>
                ) : (
                    <Heading
                        as='h1'
                        textAlign='center'
                        fontSize={{ base: '2xl', md: '5xl' }}
                        my={4}
                    >
                        {title}
                    </Heading>
                )}

                {description && !isFiltering && (
                    <Text
                        fontSize='sm'
                        w={{ base: '350px', sm: '720px', md: '690px' }}
                        px={2}
                        pb={5}
                        color='blackAlpha.600'
                        align='center'
                    >
                        {description}
                    </Text>
                )}
                <SearchGroup />
            </Box>
            <Flex w='100%' maxW='100%' direction='column' overflow='hidden'>
                {children}
            </Flex>
        </Container>
    );
};
