import { VStack } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Tag,
    TagLabel,
    Textarea,
} from '@chakra-ui/react';
import {
    Control,
    FieldErrors,
    useFieldArray,
    UseFormClearErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { FileImagePreview } from '~/components/widgets/file-image-preview/file-image-preview.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { AddIconFilled } from '~/icons/recipe-page-icons/add-icon-filled';
import { TrashIcon } from '~/icons/recipe-page-icons/trash-icon';
import { CreateRecipeSchemaType } from '~/schemas/create-recipe.schema.ts';

type RecipeStepsListProps = {
    control: Control<CreateRecipeSchemaType>;
    register: UseFormRegister<CreateRecipeSchemaType>;
    errors: FieldErrors<CreateRecipeSchemaType>;
    setValue: UseFormSetValue<CreateRecipeSchemaType>;
    watch: UseFormWatch<CreateRecipeSchemaType>;
    clearErrors: UseFormClearErrors<CreateRecipeSchemaType>;
};

export const RecipeStepsList = ({
    control,
    register,
    errors,
    setValue,
    watch,
    clearErrors,
}: RecipeStepsListProps) => {
    const { fields, append } = useFieldArray({
        control,
        name: 'steps',
    });

    const currentSteps = watch('steps');

    const handleRemoveStep = (index: number) => {
        const updatedSteps = [...(currentSteps || [])];
        updatedSteps.splice(index, 1);
        const reNumberedSteps = updatedSteps.map((step, idx) => ({
            ...step,
            stepNumber: idx + 1,
        }));
        setValue('steps', reNumberedSteps);
    };

    const handleAddStep = () => {
        append({
            stepNumber: fields.length + 1,
            description: '',
            image: '',
        });
    };

    const handleAddStepImage = (url: string, index: number) => {
        setValue(`steps.${index}.image`, url);
        clearErrors();
    };

    return (
        <VStack
            mt={8}
            maxW={{ base: undefined, sm: '600px', md: '668px' }}
            spacing={4}
            mx='auto'
            alignItems='end'
        >
            <FormLabel
                m={0}
                textAlign='left'
                w='100%'
                fontWeight={600}
                fontSize={{ base: 'sm', md: 'md' }}
            >
                Добавьте шаги приготовления
            </FormLabel>
            {fields.map((_, index) => (
                <Card
                    w='100%'
                    maxH={{ base: undefined, sm: '180px' }}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    key={index}
                >
                    <Box position='relative' w={{ base: '100%', sm: '50%' }}>
                        <FileImagePreview
                            value={currentSteps?.[index]?.image || ''}
                            onChange={(url) => handleAddStepImage(url, index)}
                            isCardPreview
                            dataTestId={DATA_TEST_ID.RECIPE_STEP_IMAGE(index)}
                            dataTestIdModal={DATA_TEST_ID.RECIPE_STEP_IMAGE_INPUT(index)}
                            dataTestIdImage={DATA_TEST_ID.RECIPE_STEP_IMAGE_BLOCK(index)}
                        />
                    </Box>
                    <CardBody display='flex' gap={4} flexDirection='column'>
                        <HStack justifyContent='space-between'>
                            <Tag w='max-content'>
                                <TagLabel>Шаг {fields?.[index]?.stepNumber}</TagLabel>
                            </Tag>
                            {fields.length > 1 && index > 0 && (
                                <IconButton
                                    aria-label='Удалить'
                                    icon={<TrashIcon />}
                                    onClick={() => handleRemoveStep(index)}
                                    variant='ghost'
                                    colorScheme='lime'
                                    data-test-id={DATA_TEST_ID.RECIPE_STEP_REMOVE(index)}
                                />
                            )}
                        </HStack>
                        <FormControl isInvalid={!!errors?.steps?.[index]?.description}>
                            <Textarea
                                h={{ base: '84px', md: '100px' }}
                                {...register(`steps.${index}.description`)}
                                placeholder={PLACEHOLDERS.STEP}
                                data-test-id={DATA_TEST_ID.RECIPE_STEP_DESCRIPTION(index)}
                            />
                        </FormControl>
                    </CardBody>
                </Card>
            ))}
            <Button
                size={{ base: 'sm', sm: 'md' }}
                onClick={handleAddStep}
                rightIcon={<AddIconFilled />}
                variant='outline'
                colorScheme='dark'
            >
                Новый шаг
            </Button>
        </VStack>
    );
};
