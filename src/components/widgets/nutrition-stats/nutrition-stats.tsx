import { Box, Flex, Text } from '@chakra-ui/react';

import { RecipeNutrition } from '~/query/services/recipes/types.ts';
import { formatNutritionData } from '~/utils/format-nutrition-data.ts';

type NutritionStatsProps = {
    nutritionValue: RecipeNutrition;
};

export const NutritionStats = ({ nutritionValue }: NutritionStatsProps) => {
    const nutritionData = formatNutritionData(nutritionValue);

    return (
        <Box minW={{ base: '100%', md: '688px' }}>
            <Text fontSize='sm' color='blackAlpha.800' mb={5}>
                * Калорийность на 1 порцию
            </Text>
            <Flex w='100%' gap={{ base: 2, md: 6 }} flexDirection={{ base: 'column', sm: 'row' }}>
                {nutritionData.map((item) => (
                    <Box
                        w='100%'
                        key={item.label}
                        borderWidth='1px'
                        borderRadius='lg'
                        bg='white'
                        boxShadow='sm'
                        p={{ base: 3, sm: 4 }}
                        border='1px solid rgba(0, 0, 0, 0.08)'
                    >
                        <Flex
                            direction={{ base: 'row', sm: 'column' }}
                            justify={{ base: 'space-between', sm: 'center' }}
                            align='center'
                            textAlign={{ base: 'left', sm: 'center' }}
                        >
                            <Text fontSize='sm' color='blackAlpha.600' mb={{ base: 0, sm: 1 }}>
                                {item.label}
                            </Text>

                            <Flex
                                flexDirection={{ base: 'row', sm: 'column' }}
                                align='center'
                                justify={{ base: 'flex-end', sm: 'center' }}
                            >
                                <Text
                                    fontSize={{ base: '2xl', sm: '4xl' }}
                                    color='lime.800'
                                    fontWeight={500}
                                    mr={{ base: 10, sm: 0 }}
                                    p={{ base: '16px 12px', md: '16px' }}
                                >
                                    {item.value}
                                </Text>

                                <Text
                                    fontSize={{ base: 'xs', sm: 'sm' }}
                                    fontWeight={600}
                                    alignSelf={{ base: 'center', sm: 'auto' }}
                                    mb={{ base: 0, sm: 1 }}
                                >
                                    {item.unit}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};
