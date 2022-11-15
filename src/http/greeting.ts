import { baseUrl } from "."

export class GreetingRequests {
    static async getGreeting(id: number) {
        return await fetch(`${baseUrl}greeting/${id}`, {
            method: "GET"
        })
    } 
}