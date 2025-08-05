import * as yup from 'yup';

export const createRecipeSchema = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(500).required(),
    portions: yup.number().positive().required(),
    time: yup.number().positive().max(10000).required(),
    ingredients: yup
        .array()
        .of(
            yup.object().shape({
                title: yup.string().max(50).required(),
                count: yup.number().min(0.01).required(),
                measureUnit: yup.string().required(),
            }),
        )
        .required(),
    image: yup.string().required(),
    categoriesIds: yup.array().of(yup.string()).min(3).required(),
    steps: yup
        .array()
        .of(
            yup.object().shape({
                stepNumber: yup.number().min(1).required(),
                description: yup.string().max(300).required(),
                image: yup.string().optional(),
            }),
        )
        .required(),
});

export const draftRecipeSchema = yup.object().shape({
    title: yup.string().max(50).required(),
    description: yup.string().max(500),
    portions: yup.number().positive(),
    time: yup.number().positive().max(10000),
    ingredients: yup.array().of(
        yup.object().shape({
            title: yup.string().max(50),
            count: yup.number().min(0.01),
            measureUnit: yup.string(),
        }),
    ),
    image: yup.string(),
    categoriesIds: yup.array().of(yup.string()),
    steps: yup.array().of(
        yup.object().shape({
            stepNumber: yup.number().min(1),
            description: yup.string().max(300),
            image: yup.string(),
        }),
    ),
});

export type CreateRecipeSchemaType = yup.InferType<typeof createRecipeSchema>;
export type DraftRecipeSchemaType = yup.InferType<typeof draftRecipeSchema>;
