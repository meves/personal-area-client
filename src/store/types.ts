export type ErrorMessage = { 
    message: string 
}

export type GreetingData = {
    greeting: {
        id: number
        message: string
    } | null   
    error: any
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