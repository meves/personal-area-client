import { baseUrl } from ".";

export const authRequests = {
    // /api/auth
    auth: async function (token: string | null) {
        const response = await fetch(`${baseUrl}auth`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    },
    // /api/signup
    signup: async function(email: string, password: string) {
        const response = await fetch(`${baseUrl}signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return response;
    },
    // /api/signin
    signin: async function(email: string, password: string) {
        const response = await fetch(`${baseUrl}signin`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({email, password})
        });
        return response;
    }
}
