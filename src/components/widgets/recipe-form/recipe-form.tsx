import { VStack } from '@chakra-ui/icons';
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { PATHS } from '~/app/routes/paths.ts';
import { RecipeIngredientsList } from '~/components/widgets/recipe-form/fields/recipe-ingredients-list.tsx';
import { RecipeMainFields } from '~/components/widgets/recipe-form/fields/recipe-main-fields.tsx';
import { RecipeStepsList } from '~/components/widgets/recipe-form/fields/recipe-steps-list.tsx';
import { SaveChangesModal } from '~/components/wrappers/result-modal/save-changes-modal/save-changes-modal';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { useUnsavedChanges } from '~/hooks/use-unsaved-changes.tsx';
import { DraftIcon } from '~/icons/recipe-page-icons/draft-icon';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import {
    useCreateRecipeMutation,
    useEditDraftMutation,
    useEditRecipeMutation,
    useSaveDraftMutation,
} from '~/query/services/recipes/recipes-api.ts';
import { useGetMeasureUnitsQuery } from '~/query/services/user/user-api.ts';
import { useAppSelector } from '~/redux/hooks.ts';
import { selectSubCategoriesOptions } from '~/redux/selectors.ts';
import { selectCategories, selectSubCategories } from '~/redux/slices/category-slice.ts';
import {
    createRecipeSchema,
    CreateRecipeSchemaType,
    draftRecipeSchema,
    DraftRecipeSchemaType,
} from '~/schemas/create-recipe.schema.ts';
import { cleanEmptyStrings } from '~/utils/clean-empty-strings';
import { getPathFromRecipe } from '~/utils/get-path-from-recipe.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

import { FileImagePreview } from '../file-image-preview/file-image-preview';
import { MultiSelect } from '../multi-select/multi-select';

type RecipeFormProps = Partial<{
    mode: 'create' | 'edit' | 'editDraft';
    initialData: CreateRecipeSchemaType | DraftRecipeSchemaType;
    recipeId: string;
}>;

export const RecipeForm = ({ mode = 'create', initialData, recipeId }: RecipeFormProps) => {
    const { isTablet } = useScreenSize();
    const { data: measureUnits } = useGetMeasureUnitsQuery();
    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);
    const subCategoriesOptions = useAppSelector(selectSubCategoriesOptions);
    const { toast } = useCustomToast();
    const [createRecipe] = useCreateRecipeMutation();
    const [saveDraft] = useSaveDraftMutation();
    const [editRecipe] = useEditRecipeMutation();
    const [editDraft] = useEditDraftMutation();
    const navigate = useNavigate();

    const {
        register,
        control,
        setValue,
        watch,
        setError,
        clearErrors,
        getValues,
        formState: { errors, isDirty },
    } = useForm<CreateRecipeSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues: initialData ?? {
            title: '',
            description: '',
            portions: undefined,
            time: undefined,
            image: '',
            categoriesIds: [],
            ingredients: [{ title: '', count: undefined, measureUnit: '' }],
            steps: [{ stepNumber: 1, description: '', image: '' }],
        },
    });

    const { showModal, confirmLeave, cancelLeave, markAsSaved } = useUnsavedChanges(isDirty);

    const selectedSubCategories = watch('categoriesIds');

    const handleSubCategoryChange = (values: string[]) => {
        setValue('categoriesIds', values, { shouldDirty: true });
    };

    const handleImageChange = (url: string) => {
        setValue('image', url, { shouldDirty: true });
    };

    const validateAndSubmit = async (
        schema: yup.AnySchema,
        callback: (data: CreateRecipeSchemaType) => void,
    ): Promise<boolean> => {
        try {
            const values = getValues();
            const validatedData = await schema.validate(values, { abortEarly: false });
            callback(validatedData);
            return true;
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                clearErrors();
                err.inner.forEach((validationErr) => {
                    if (validationErr.path) {
                        setError(validationErr.path as keyof CreateRecipeSchemaType, {
                            type: 'manual',
                            message: validationErr.message,
                        });
                    }
                });
            }
            return false;
        }
    };

    const onSubmitDraft = async (formData: CreateRecipeSchemaType) => {
        const cleanedData = cleanEmptyStrings(formData);
        try {
            if (mode === 'editDraft' && recipeId) {
                await editDraft({ draftId: recipeId, body: cleanedData }).unwrap();
            } else {
                await saveDraft(cleanedData).unwrap();
            }
            const message = TOAST_MESSAGES.CreateDraftToast[StatusCodes.CREATED];
            toast({ ...message, status: Statuses.SUCCESS });
            confirmLeave();
            navigate(PATHS.ROOT);
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error?.status;
                const toastData =
                    TOAST_MESSAGES.CreateDraftToast[
                        status as keyof typeof TOAST_MESSAGES.CreateDraftToast
                    ];
                if (toastData) {
                    toast(toastData);
                }
            }
        }
    };

    const onSubmitPublish = async (formData: CreateRecipeSchemaType) => {
        const cleanedData = cleanEmptyStrings(formData);
        let recipePath;
        try {
            if (mode === 'edit' && recipeId) {
                const response = await editRecipe({ id: recipeId, body: cleanedData }).unwrap();
                const message = TOAST_MESSAGES.EditRecipeToast[StatusCodes.OK];
                recipePath = getPathFromRecipe(categories, subCategories, response);
                toast({ ...message, status: Statuses.SUCCESS });
            } else {
                const response = await createRecipe(cleanedData).unwrap();
                const message = TOAST_MESSAGES.CreateRecipeToast[StatusCodes.CREATED];
                recipePath = getPathFromRecipe(categories, subCategories, response);
                toast({ ...message, status: Statuses.SUCCESS });
            }
            confirmLeave();
            navigate(recipePath);
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const status = error?.status;
                const toastData =
                    TOAST_MESSAGES.CreateRecipeToast[
                        status as keyof typeof TOAST_MESSAGES.CreateRecipeToast
                    ];
                if (toastData) {
                    toast(toastData);
                }
            }
        }
    };

    const handleDraftSave = async () => {
        const isValid = await validateAndSubmit(draftRecipeSchema, (data) => {
            onSubmitDraft(data);
        });

        if (isValid) {
            confirmLeave();
        } else {
            cancelLeave();
        }
    };

    const handleDiscardChanges = () => {
        markAsSaved();
        confirmLeave();
    };

    return (
        <>
            <form data-test-id={DATA_TEST_ID.RECIPE_FORM}>
                <Flex gap={6} direction={{ base: 'column', sm: 'row' }}>
                    <FileImagePreview
                        value={watch('image')}
                        onChange={(url) => handleImageChange(url)}
                        isInvalid={!!errors.image}
                        dataTestId={DATA_TEST_ID.RECIPE_IMAGE_BLOCK}
                        dataTestIdModal={DATA_TEST_ID.RECIPE_IMAGE_BLOCK_INPUT}
                        dataTestIdImage={DATA_TEST_ID.RECIPE_PREVIEW_IMAGE}
                    />
                    <VStack maxW={{ sm: '480px', md: '560px', xl: '668px' }} w='100%' gap={6}>
                        <FormControl
                            display='flex'
                            gap={4}
                            maxH='40px'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <FormLabel m={0} fontWeight={600} fontSize={{ base: 'sm', md: 'md' }}>
                                Выберите не менее 3-х тегов
                            </FormLabel>
                            <MultiSelect
                                maxHeight='464px'
                                minWidth={{ base: '198px', sm: '232px', md: '350px' }}
                                selected={(selectedSubCategories as string[]) ?? []}
                                onChange={handleSubCategoryChange}
                                options={subCategoriesOptions}
                                maxVisibleTags={isTablet ? 1 : 2}
                                isInvalid={!!errors.categoriesIds}
                                dataTestId={DATA_TEST_ID.RECIPE_CATEGORIES}
                            />
                        </FormControl>
                        <RecipeMainFields control={control} register={register} errors={errors} />
                    </VStack>
                </Flex>
                <RecipeIngredientsList
                    control={control}
                    register={register}
                    errors={errors}
                    measureUnits={measureUnits}
                />
                <RecipeStepsList
                    control={control}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    clearErrors={clearErrors}
                />
                <Flex
                    flexWrap='wrap'
                    mt={8}
                    maxW={{ base: undefined, sm: '600px', md: '668px' }}
                    gap={6}
                    mx='auto'
                    justifyContent='center'
                >
                    <Button
                        width={{ base: '100%', sm: 'unset' }}
                        leftIcon={<DraftIcon />}
                        size='lg'
                        type='button'
                        variant='outline'
                        colorScheme='dark'
                        onClick={() => validateAndSubmit(draftRecipeSchema, onSubmitDraft)}
                        data-test-id={DATA_TEST_ID.RECIPE_SAVE_DRAFT}
                    >
                        Сохранить черновик
                    </Button>

                    <Button
                        width={{ base: '100%', sm: 'unset' }}
                        size='lg'
                        variant='dark'
                        type='button'
                        onClick={() => validateAndSubmit(createRecipeSchema, onSubmitPublish)}
                        data-test-id={DATA_TEST_ID.RECIPE_PUBLISH}
                    >
                        Опубликовать рецепт
                    </Button>
                </Flex>
            </form>
            <SaveChangesModal
                isOpen={showModal}
                onSaveDraft={handleDraftSave}
                onDiscardChanges={handleDiscardChanges}
                onCancel={cancelLeave}
            />
        </>
    );
};
