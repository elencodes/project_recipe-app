import { StatusCodes } from '~/query/constants/status-codes';

export const TOAST_MESSAGES = {
    SignUpToast: {
        [StatusCodes.BAD_REQUEST]: {
            id: 'sign-up-bad-request',
        },
    },
    EmailVerifiedToast: {
        [StatusCodes.OK]: {
            title: 'Верификация прошла успешно',
            id: 'email-verification-success',
        },
    },
    SignInToast: {
        [StatusCodes.UNAUTHORIZED]: {
            title: 'Неверный логин или пароль',
            description: 'Попробуйте снова.',
            id: 'sign-in-unauthorized',
        },
        [StatusCodes.FORBIDDEN]: {
            title: 'E-mail не верифицирован',
            description: 'Проверьте почту и перейдите по ссылке',
            id: 'sign-in-forbidden',
        },
    },
    ForgotPasswordToast: {
        [StatusCodes.FORBIDDEN]: {
            title: 'Такого e-mail нет',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания',
            id: 'send-verification-code-forbidden',
        },
    },
    RestorePassword: {
        [StatusCodes.OK]: {
            title: 'Восстановление данных успешно',
            id: 'restore-credentials-success',
        },
    },
    FileUploadErrorToast: {
        title: 'Ошибка сервера',
        description: 'Попробуйте сохранить фото позже.',
        id: 'file-upload-error',
    },
    SearchErrorToast: {
        title: 'Ошибка сервера',
        description: 'Попробуйте поискать снова попозже',
        id: 'search-error',
    },
    CreateRecipeToast: {
        [StatusCodes.CREATED]: {
            title: 'Рецепт успешно опубликован',
            id: 'create-recipe-success',
        },
        [StatusCodes.CONFLICT]: {
            title: 'Ошибка',
            description: 'Рецепт с таким названием уже существует',
            id: 'create-recipe-conflict',
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            title: 'Ошибка сервера',
            description: 'Попробуйте пока сохранить в черновик',
            id: 'create-recipe-server-error',
        },
    },
    EditRecipeToast: {
        [StatusCodes.OK]: {
            title: 'Рецепт успешно опубликован',
            id: 'edit-recipe-success',
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            title: 'Ошибка сервера',
            description: 'Попробуйте пока сохранить в черновик',
            id: 'create-recipe-server-error',
        },
    },
    CreateDraftToast: {
        [StatusCodes.CREATED]: {
            title: 'Черновик успешно сохранен',
            id: 'create-draft-success',
        },
        [StatusCodes.CONFLICT]: {
            title: 'Ошибка',
            description: 'Рецепт с таким названием уже существует',
            id: 'create-draft-conflict',
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            title: 'Ошибка сервера',
            description: 'Не удалось сохранить черновик рецепта',
            id: 'create-draft-server-error',
        },
    },
    DeleteRecipeToast: {
        [StatusCodes.OK]: {
            title: 'Рецепт успешно удален',
            id: 'delete-recipe-conflict',
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            title: 'Ошибка сервера',
            description: 'Не удалось удалить рецепт',
            id: 'delete-recipe-server-error',
        },
    },
    CreateNoteToast: {
        [StatusCodes.OK]: {
            title: 'Заметка удалена',
            id: 'delete-note-success',
        },
        [StatusCodes.CREATED]: {
            title: 'Заметка опубликована',
            id: 'create-note-success',
        },
        [StatusCodes.INTERNAL_SERVER_ERROR]: {
            title: 'Ошибка сервера',
            description: 'Попробуйте позже.',
            id: 'create-note-error',
        },
    },
    UpdateUserInfoToast: {
        [StatusCodes.OK]: {
            title: 'Изменения сохранены',
            id: 'update-user-info-success',
        },
    },
    UpdatePasswordToast: {
        [StatusCodes.OK]: {
            title: 'Пароль успешно изменен',
            id: 'update-password-success',
        },
        [StatusCodes.BAD_REQUEST]: {
            title: 'Неверный старый пароль',
            id: 'update-password-bad-request',
        },
    },
    DeleteAccountToast: {
        [StatusCodes.OK]: {
            title: 'Аккаунт успешно удален.',
            id: 'delete-account-success',
        },
    },
    ServerErrorToast: {
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже.',
        id: 'server-error',
    },
} as const;
