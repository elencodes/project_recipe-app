import * as yup from 'yup';

import {
    MAX_LENGTH_REQUIRED,
    NAME_REQUIRED,
    SHOULD_CONTAIN_CYRILLIC,
    STARTS_WITH_CYRILLIC,
    SURNAME_REQUIRED,
} from '~/schemas/sign-up.schema.ts';

export const userInfoSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(NAME_REQUIRED)
        .matches(/^[А-Яа-яЁё]/, STARTS_WITH_CYRILLIC)
        .matches(/^[А-Яа-яЁё-]+$/, SHOULD_CONTAIN_CYRILLIC)
        .max(50, MAX_LENGTH_REQUIRED),
    lastName: yup
        .string()
        .required(SURNAME_REQUIRED)
        .matches(/^[А-Яа-яЁё]/, STARTS_WITH_CYRILLIC)
        .matches(/^[А-Яа-яЁё-]+$/, SHOULD_CONTAIN_CYRILLIC)
        .max(50, MAX_LENGTH_REQUIRED),
});

export type UserInfoSchemaType = yup.InferType<typeof userInfoSchema>;
