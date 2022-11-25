/**
 * types for datas received from server response
 */
// greeting-api
export type GreetingData = {
    greeting: {
        id: number
        message: string
    } | null   
    error: any
    code?: "Success"
}
// users-api
export type User = {
    id: number
    firstname: string
    lastname: string
    createdAt: string
    updatedAt: string
}
export type UsersData = {
    users: User []
    message: string
    error: any
    code?: "Success"
}
// auth-api
export type AuthData = {
    token: string
    message: string
    error: any
    code?: "Success"
}

// other types
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