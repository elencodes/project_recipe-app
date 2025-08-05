import * as yup from 'yup';

import {
    CONFIRM_PASSWORD_INVALID,
    CONFIRM_PASSWORD_REQUIRED,
    DOESNT_MEET_FORMAT,
    MAX_LENGTH_REQUIRED,
    PASSWORD_REQUIRED,
} from '~/schemas/sign-up.schema.ts';

export const passwordChangeSchema = yup.object().shape({
    oldPassword: yup.string().required('Введите старый пароль'),
    password: yup
        .string()
        .required(PASSWORD_REQUIRED)
        .max(50, MAX_LENGTH_REQUIRED)
        .matches(
            /^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$&_+-.]{8,}$/,
            'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        )
        .min(8, DOESNT_MEET_FORMAT),
    passwordConfirm: yup
        .string()
        .required(CONFIRM_PASSWORD_REQUIRED)
        .oneOf([yup.ref('password')], CONFIRM_PASSWORD_INVALID),
});

export type PasswordChangeFormValues = yup.InferType<typeof passwordChangeSchema>;
