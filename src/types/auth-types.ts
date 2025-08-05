import { EmailRecoverySchemaType } from '~/schemas/email-recovery.schema.ts';
import { LoginSchemaType } from '~/schemas/sign-in.schema.ts';
import { AuthInfoSchemaType, SignUpSchemaType } from '~/schemas/sign-up.schema.ts';

export type AuthResponse = {
    message: string | string[];
    statusText?: string;
    error?: string;
    statusCode: number;
};

export type SignInBody = LoginSchemaType;

export type SignUpBody = Omit<SignUpSchemaType, 'passwordConfirm'>;

export type VerifyOtpBody = {
    email: string;
    otpToken: string;
};

export type ForgotPasswordBody = EmailRecoverySchemaType;

export type ResetPasswordBody = { email: string } & AuthInfoSchemaType;
