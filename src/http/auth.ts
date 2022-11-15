import { baseUrl } from ".";

export class AuthRequests {
    // /api/auth
    static async auth(token: string | null) {
        const response = await fetch(`${baseUrl}auth`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    }
    // /api/signup
    static async signup(email: string, password: string) {
        const response = await fetch(`${baseUrl}signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return response;
    }
    // /api/signin
    static async signin(email: string, password: string) {
        const response = await fetch(`${baseUrl}signin`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({email, password})
        });
        return response;
    }
}
