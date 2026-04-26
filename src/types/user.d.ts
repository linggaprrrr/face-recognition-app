declare namespace User {
    interface UserResponse {
        id: string
        name: string
        email: string
        phone: string
        address: string
        picture: string
        created_at: string
    }

    interface UserUpdatePayload {
        name: string
        email: string
        phone: string
        address: string
    }
}