import { AddIcon } from '@chakra-ui/icons';
import {
    Flex,
    FormControl,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    Select,
} from '@chakra-ui/react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { TrashIcon } from '~/icons/recipe-page-icons/trash-icon';
import { MeasureUnitsResponse } from '~/query/services/user/types.ts';
import { CreateRecipeSchemaType } from '~/schemas/create-recipe.schema.ts';
import { arrayHasItems } from '~/utils/array-has-items.ts';

type RecipeIngredientRowProps = {
    index: number;
    register: UseFormRegister<CreateRecipeSchemaType>;
    control: Control<CreateRecipeSchemaType>;
    errors: FieldErrors<CreateRecipeSchemaType>;
    onRemove: () => void;
    onAdd: () => void;
    isLast: boolean;
    measureUnits?: MeasureUnitsResponse;
};

export const RecipeIngredientRow = ({
    index,
    register,
    control,
    errors,
    onRemove,
    onAdd,
    isLast,
    measureUnits = [],
}: RecipeIngredientRowProps) => (
    <Flex w='100%' gap={4} mb={2} flexWrap='wrap'>
        <FormControl
            w={{ base: '100%', sm: undefined }}
            flex={{ base: undefined, sm: '3' }}
            isInvalid={!!errors.ingredients?.[index]?.title}
        >
            <Input
                data-test-id={DATA_TEST_ID.RECIPE_INGREDIENTS_TITLE(index)}
                placeholder={PLACEHOLDERS.INGREDIENT}
                {...register(`ingredients.${index}.title` as const)}
            />
        </FormControl>

        <FormControl flex='1' isInvalid={!!errors.ingredients?.[index]?.count}>
            <Controller
                control={control}
                name={`ingredients.${index}.count`}
                render={({ field: { onChange, value } }) => (
                    <NumberInput value={value} onChange={onChange} precision={0}>
                        <NumberInputField
                            placeholder={PLACEHOLDERS.INGREDIENTS_COUNT}
                            data-test-id={DATA_TEST_ID.RECIPE_INGREDIENTS_COUNT(index)}
                        />
                    </NumberInput>
                )}
            />
        </FormControl>

        <FormControl flex='2' isInvalid={!!errors.ingredients?.[index]?.measureUnit}>
            <Select
                {...register(`ingredients.${index}.measureUnit` as const)}
                placeholder={PLACEHOLDERS.INGREDIENTS_MEASURE_UNIT}
                _placeholder={{ color: 'blackAlpha.700' }}
                isTruncated={true}
                data-test-id={DATA_TEST_ID.RECIPE_INGREDIENTS_MEASURE(index)}
            >
                {arrayHasItems(measureUnits) &&
                    measureUnits.map((unit) => (
                        <option key={unit.name} value={unit.name}>
                            {unit.name}
                        </option>
                    ))}
            </Select>
        </FormControl>
        <IconButton
            aria-label={isLast ? 'Добавить' : 'Удалить'}
            isRound={isLast}
            variant={isLast ? 'dark' : 'ghost'}
            colorScheme={isLast ? undefined : 'lime'}
            icon={isLast ? <AddIcon /> : <TrashIcon />}
            data-test-id={
                isLast
                    ? DATA_TEST_ID.RECIPE_ADD_INGREDIENT
                    : DATA_TEST_ID.RECIPE_REMOVE_INGREDIENT(index)
            }
            size='sm'
            h='32px'
            onClick={isLast ? onAdd : onRemove}
        />
    </Flex>
);
