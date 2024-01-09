type User = {
    id: string;
    username: string;
    password: string;
}

type SafeUser = Omit<User, "password">;

export { User, SafeUser };
