import * as yup from 'yup';

const LOGIN_REQUIRED = 'Введите логин';
const PASSWORD_REQUIRED = 'Введите пароль';
const MAX_LENGTH_REQUIRED = 'Максимальная длина 50 символов';

export const loginSchema = yup.object().shape({
    login: yup.string().required(LOGIN_REQUIRED).max(50, MAX_LENGTH_REQUIRED),
    password: yup.string().required(PASSWORD_REQUIRED).max(50, MAX_LENGTH_REQUIRED),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
