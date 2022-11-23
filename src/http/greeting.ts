import { baseUrl } from "."
import { GreetingData } from "../store/types";

// class responsible for requests to /api/greeting
export class GreetingRequests {
    // GET /api/greeting/:id
    static async getGreeting(id: number): Promise<GreetingData> {
        const response = await fetch(`${baseUrl}greeting/${id}`, {
            method: "GET"
        })
        const data: GreetingData = await response.json();
        return data;
    } 
}