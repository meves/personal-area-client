import { baseUrl } from ".";
import { AuthData } from "../types";
import { HTTP_CODES } from "./codes";

export class AuthRequests {
    // /api/auth
    static async auth(token: string | null) {
        const response = await fetch(`${baseUrl}auth`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data: AuthData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success";
        }
        return data;
    }
    // /api/signup
    static async signup(email: string, password: string) {
        const response = await fetch(`${baseUrl}signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data: AuthData = await response.json();
        if (response.status === HTTP_CODES.CREATED_201) {
            data.code = "Success";
        } 
        return data;
    }
    // /api/signin
    static async signin(email: string, password: string) {
        const response = await fetch(`${baseUrl}signin`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({email, password})
        });
        const data: AuthData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success";
        }
        return data;
    }
}
