import { Flex } from '@chakra-ui/icons';
import { Box, Card, CardBody, Heading, Image, Tag, TagLabel, Text } from '@chakra-ui/react';

import { RecipeStep } from '~/query/services/recipes/types.ts';
import { buildImageUrl } from '~/utils/build-image-url';

type RecipeStepsSectionProps = {
    steps: RecipeStep[];
};

export const RecipeStepsSection = ({ steps }: RecipeStepsSectionProps) => (
    <Flex w={{ base: '100%', sm: '604px', md: '680px' }} direction='column' gap='20px'>
        <Heading fontWeight='500' fontSize={{ md: '48px', base: '24px' }}>
            Шаги приготовления
        </Heading>
        {steps.map((step, index) => (
            <Card
                key={step.stepNumber}
                direction='row'
                overflow='hidden'
                variant='outline'
                minH='128px'
            >
                {step.image && (
                    <Box position='relative' w={{ base: '158px', md: '50%' }}>
                        <Image
                            src={buildImageUrl(step.image)}
                            alt={step.description}
                            borderLeftRadius='lg'
                            w='100%'
                            h='100%'
                            objectFit='cover'
                        />
                    </Box>
                )}
                <CardBody
                    w='100%'
                    display='flex'
                    flexDirection='column'
                    gap={{ base: 1, sm: 2, md: 5 }}
                    p={{ base: 2, md: 6 }}
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='8px'
                    boxShadow='none'
                >
                    <Tag w='max-content' bgColor={index === steps.length - 1 ? 'lime.50' : ''}>
                        <TagLabel>Шаг {step.stepNumber}</TagLabel>
                    </Tag>
                    <Text fontSize='sm'>{step.description}</Text>
                </CardBody>
            </Card>
        ))}
    </Flex>
);
