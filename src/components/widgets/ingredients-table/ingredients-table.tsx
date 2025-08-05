import {
    Box,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    Tbody,
    Td,
    Text,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { Ingredient } from '~/types/recipe-type';
import { formatNumber } from '~/utils/format-number.ts';

type IngredientsTableProps = {
    ingredients: Ingredient[];
    portions: number;
};

export const IngredientsTable = ({ ingredients, portions }: IngredientsTableProps) => {
    const [currentPortions, setCurrentPortions] = useState(portions);

    const handlePortionsChange = (_valueAsString: string, valueAsNumber: number) => {
        if (valueAsNumber > 0) {
            setCurrentPortions(valueAsNumber);
        }
    };

    const calculatePortionedIngredient = (ingredient: Ingredient) => {
        const base = Number(ingredient.count);
        const recalculated = (base * currentPortions) / portions;
        return {
            count: isNaN(recalculated) ? ingredient.count : formatNumber(recalculated),
            unit: ingredient.measureUnit,
        };
    };

    return (
        <Box w={{ base: '100%', sm: '604px', md: '680px' }}>
            <HStack justify='space-between' mb={4}>
                <Text fontSize='xs' color='lime.600' fontWeight={600} pl={{ base: 2, sm: 6 }}>
                    ИНГРЕДИЕНТЫ
                </Text>
                <HStack gap={4}>
                    <Text fontSize='xs' color='lime.600' fontWeight={600}>
                        ПОРЦИЙ
                    </Text>
                    <NumberInput
                        size='md'
                        maxW='90px'
                        min={1}
                        value={currentPortions}
                        onChange={handlePortionsChange}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id={DATA_TEST_ID.INCREMENT_STEPPER} />
                            <NumberDecrementStepper data-test-id={DATA_TEST_ID.DECREMENT_STEPPER} />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
            </HStack>
            <Table variant='simple' width='100%'>
                <Tbody>
                    {ingredients.map((ingredient, index) => {
                        const { count, unit } = calculatePortionedIngredient(ingredient);

                        return (
                            <Tr
                                key={ingredient.title}
                                bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                            >
                                <Td pl={{ base: 2, sm: 6 }} py={3} fontWeight={500}>
                                    {ingredient.title}
                                </Td>
                                <Td
                                    py={3}
                                    textAlign='right'
                                    isNumeric
                                    data-test-id={`ingredient-quantity-${index}`}
                                >
                                    {count !== '0' && count} {unit}
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
};
