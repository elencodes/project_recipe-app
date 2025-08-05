import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { PersonalInfoSchemaType, SignUpSchemaType } from '~/schemas/sign-up.schema.ts';

type PersonalInfoFormProps = {
    register: UseFormRegister<SignUpSchemaType>;
    errors: FieldErrors<SignUpSchemaType>;
    onBlur: (field: keyof PersonalInfoSchemaType, value: string) => void;
    isFormSubmitting: boolean;
};

export const PersonalInfoForm = ({
    register,
    errors,
    onBlur,
    isFormSubmitting,
}: PersonalInfoFormProps) => (
    <>
        <VStack spacing={4} align='stretch'>
            <FormControl isInvalid={!!errors.firstName}>
                <FormLabel>Ваше имя</FormLabel>
                <Input
                    size='lg'
                    variant='auth'
                    {...register('firstName')}
                    onBlur={(e) => onBlur('firstName', e.target.value)}
                    placeholder={PLACEHOLDERS.NAME}
                    data-test-id={DATA_TEST_ID.SIGN_UP_FIRST_NAME}
                />
                <FormErrorMessage>{String(errors.firstName?.message)}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
                <FormLabel>Ваша фамилия</FormLabel>
                <Input
                    size='lg'
                    variant='auth'
                    {...register('lastName')}
                    onBlur={(e) => onBlur('lastName', e.target.value)}
                    placeholder={PLACEHOLDERS.SURNAME}
                    data-test-id={DATA_TEST_ID.SIGN_UP_LAST_NAME}
                />
                <FormErrorMessage>{String(errors.lastName?.message)}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
                <FormLabel>Ваш e-mail</FormLabel>
                <Input
                    size='lg'
                    variant='auth'
                    {...register('email')}
                    onBlur={(e) => onBlur('email', e.target.value)}
                    placeholder={PLACEHOLDERS.EMAIL}
                    data-test-id={DATA_TEST_ID.SIGN_UP_EMAIL}
                />
                <FormErrorMessage>{String(errors.email?.message)}</FormErrorMessage>
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
            Дальше
        </Button>
    </>
);
