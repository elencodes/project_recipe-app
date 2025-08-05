import { Box, Center, Heading, Image, Link, Text } from '@chakra-ui/react';
import notFound from '@public/images/not-found-page/not-found.png';
import notFoundTablet from '@public/images/not-found-page/not-found-tablet.png';
import { NavLink } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { DATA_TEST_ID } from '~/constants/data-test-ids';

export const NotFoundPage = () => (
    <Center
        textAlign='center'
        m='auto'
        w={{ base: '70%', md: '35%', lg: '100%' }}
        py={0}
        px={0}
        h='100%'
        flexDirection='column'
        gap={4}
    >
        <Box boxSize={{ base: 108, md: 206 }}>
            <Image
                w='100%'
                src={notFound}
                alt='not found page label'
                srcSet={`${notFound} 1440w, ${notFoundTablet} 768w`}
                mb={{ md: '16px' }}
            />
        </Box>
        <Box maxW={{ base: 240, md: 396 }}>
            <Heading mb={4} fontSize='2xl' as='h1'>
                Упс! Такой страницы нет
            </Heading>
            <Text fontSize='md' mb={6} textColor='blackAlpha.700'>
                Можете поискать другой рецепт&nbsp;
                <Link
                    data-test-id={DATA_TEST_ID.ERROR_PAGE_GO_HOME}
                    as={NavLink}
                    to={PATHS.ROOT}
                    textUnderlineOffset='4px'
                    textDecoration='underline'
                >
                    здесь.
                </Link>
            </Text>
        </Box>
    </Center>
);
