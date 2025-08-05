import { FormHelperText } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { PasswordInput } from '~/components/ui/password-input/password-input.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { AuthInfoSchemaType, SignUpSchemaType } from '~/schemas/sign-up.schema.ts';

type AuthRegistrationFormProps = {
    register: UseFormRegister<SignUpSchemaType>;
    errors: FieldErrors<SignUpSchemaType>;
    onBlur: (field: keyof AuthInfoSchemaType, value: string) => void;
    isFormSubmitting: boolean;
};

export const AuthRegistrationForm = ({
    register,
    errors,
    onBlur,
    isFormSubmitting,
}: AuthRegistrationFormProps) => (
    <>
        <VStack spacing={4} align='stretch'>
            <FormControl isInvalid={!!errors.login}>
                <FormLabel>Логин входа на сайт</FormLabel>
                <Input
                    size='lg'
                    variant='auth'
                    {...register('login')}
                    placeholder={PLACEHOLDERS.SIGN_UP_LOGIN}
                    onBlur={(e) => onBlur('login', e.target.value)}
                    data-test-id={DATA_TEST_ID.FORM_LOGIN_INPUT}
                />
                <FormHelperText fontSize='xs'>
                    Логин не менее 5 символов, только латиница
                </FormHelperText>
                <FormErrorMessage>{String(errors.login?.message)}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
                <FormLabel>Пароль</FormLabel>
                <PasswordInput
                    input={{
                        ...register('password'),
                        variant: 'auth',
                        placeholder: PLACEHOLDERS.PASSWORD,
                    }}
                    dataTestId={DATA_TEST_ID.FORM_PASSWORD_INPUT}
                />
                <FormHelperText fontSize='xs'>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </FormHelperText>
                <FormErrorMessage>{String(errors.password?.message)}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.passwordConfirm}>
                <FormLabel>Повторите пароль</FormLabel>
                <PasswordInput
                    input={{
                        ...register('passwordConfirm'),
                        variant: 'auth',
                        placeholder: PLACEHOLDERS.REPEAT_PASSWORD,
                    }}
                    dataTestId={DATA_TEST_ID.SIGN_UP_CONFIRM_PASSWORD}
                />
                <FormErrorMessage>{String(errors.passwordConfirm?.message)}</FormErrorMessage>
            </FormControl>
        </VStack>
        <Button
            w='full'
            isLoading={isFormSubmitting}
            mt={8}
            variant='dark'
            size='lg'
            type='submit'
            data-test-id={DATA_TEST_ID.FORM_SUBMIT_BUTTON}
        >
            Зарегистрироваться
        </Button>
    </>
);
