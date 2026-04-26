declare namespace Auth {
    interface LoginPayload {
        email: string;
        password: string;
    }

    interface LoginResponse {
        access_token: string;
        user: {
            id: string
            name: string
            email: string
        }
    }

    interface RegisterPayload {
        name: string
        email: string
        password: string
    }

    interface RegisterResponse {
        access_token: string;
        user: {
            id: string
            name: string
            email: string
        }
    }

    interface GoogleLoginRequest {
        token: string | null | undefined;
    }
}