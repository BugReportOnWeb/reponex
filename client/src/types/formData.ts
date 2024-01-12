type RegisterFormData = {
    username: string;
    password: string;
    confirmPassword: string;
}

type LoginFormData = Omit<RegisterFormData, 'confirmPassword'>;

export type { RegisterFormData, LoginFormData };
