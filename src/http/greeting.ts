import { baseUrl } from "."
import { GreetingData } from "../types";
import { HTTP_CODES } from "./codes";

// class responsible for requests to /api/greeting
export class GreetingRequests {
    // GET /api/greeting/:id
    static async getGreeting(id: number): Promise<GreetingData> {
        const response = await fetch(`${baseUrl}greeting/${id}`, {
            method: "GET"
        })
        const data: GreetingData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success"
        }
        return data;
    } 
}