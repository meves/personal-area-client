export type ErrorMessage = { 
    message: string 
}

export type AuthToken = { 
    token: string 
}

export type UserFromList = {
    id: number
    firstname: string
    lastname: string
    createdAt: string
    updatedAt: string
}

export type DataWithUsers = {
    users: UserFromList[]
}

export type DataGreeting = {
    data: {
        greeting: {
            id: number
            greeting: string
        }
    }
}