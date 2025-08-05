import { VStack } from '@chakra-ui/icons';
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { Control, FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';

import { RecipeIngredientRow } from '~/components/widgets/recipe-form/fields/recipe-ingredient-row.tsx';
import { Add } from '~/icons/recipe-page-icons/add-icon';
import { MeasureUnitsResponse } from '~/query/services/user/types.ts';
import { CreateRecipeSchemaType } from '~/schemas/create-recipe.schema.ts';

type RecipeIngredientsListProps = {
    control: Control<CreateRecipeSchemaType>;
    register: UseFormRegister<CreateRecipeSchemaType>;
    errors: FieldErrors<CreateRecipeSchemaType>;
    measureUnits?: MeasureUnitsResponse;
};

export const RecipeIngredientsList = ({
    control,
    register,
    errors,
    measureUnits,
}: RecipeIngredientsListProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    return (
        <VStack
            mt={8}
            maxW={{ base: undefined, sm: '600px', md: '668px' }}
            spacing={4}
            mx={{ base: 0, sm: 'auto' }}
        >
            <FormLabel
                textAlign='left'
                w='100%'
                m={0}
                fontWeight={600}
                fontSize={{ base: 'sm', md: 'md' }}
            >
                Добавьте ингредиенты рецепта, нажав на <Add />
            </FormLabel>
            <Box w='100%'>
                <Flex w='100%' display={{ base: 'none', sm: 'flex' }} gap={4} mb={2}>
                    <Box flex='3' color='lime.600' fontSize='xs' fontWeight={600} ml={4}>
                        Ингредиент
                    </Box>
                    <Box flex='1' color='lime.600' fontSize='xs' fontWeight={600} ml={4}>
                        Количество
                    </Box>
                    <Box flex='2' color='lime.600' fontSize='xs' fontWeight={600} ml={4}>
                        Единица измерения
                    </Box>
                    <Box w='32px'></Box>
                </Flex>
                {fields.map((field, index) => (
                    <RecipeIngredientRow
                        key={field.id}
                        index={index}
                        register={register}
                        control={control}
                        errors={errors}
                        measureUnits={measureUnits}
                        onRemove={() => remove(index)}
                        isLast={index === fields.length - 1}
                        onAdd={() => append({ title: '', count: 0, measureUnit: '' })}
                    />
                ))}
            </Box>
        </VStack>
    );
};
