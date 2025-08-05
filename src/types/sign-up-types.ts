export const enum SignUpStep {
    PersonalInfo,
    AuthInfo,
}

export const SignUpLabels = {
    [SignUpStep.PersonalInfo]: 'Шаг 1. Личная информация',
    [SignUpStep.AuthInfo]: 'Шаг 2. Логин и пароль',
};

export const SignUpEmailVerifiedParam = 'emailVerified';
