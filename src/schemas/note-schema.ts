import * as yup from 'yup';

export type NoteFormData = {
    description: string;
};

export const noteSchema = yup.object({
    description: yup
        .string()
        .required('Обязательное поле')
        .min(10, 'Минимум 10 символов')
        .max(160, 'Максимум 160 символов'),
});
