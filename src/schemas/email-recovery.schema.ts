import * as yup from 'yup';

const EMAIL_REQUIRED = 'Введите e-mail';
const MAX_LENGTH_REQUIRED = 'Максимальная длина 50 символов';
const EMAIL_INCORRECT = 'Введите корректный e-mail';

export const emailRecoverySchema = yup.object().shape({
    email: yup
        .string()
        .required(EMAIL_REQUIRED)
        .max(50, MAX_LENGTH_REQUIRED)
        .matches(/^[a-zA-Z0-9._%+-]+@(?!(xn--))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, EMAIL_INCORRECT),
});

export type EmailRecoverySchemaType = yup.InferType<typeof emailRecoverySchema>;
