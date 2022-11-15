import { baseUrl } from ".";

export class UsersRequests {
    static async getAllUsers() {
        return await fetch(`${baseUrl}users`, {
            method: "GET"
        });
    }
    static async getUser(id: number) {
        return await fetch(`${baseUrl}users/${id}`, {
            method: "GET"
        });
    }
    static async createUser(firstname: string, lastname: string) {
        return await fetch(`${baseUrl}users`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ firstname, lastname })
        });
    }
    static async deleteUser(id: number) {
        return await fetch(`${baseUrl}users/${id}`, {
            method: "DELETE",
        });
    }
    static async updateUser(id: number, firstname: string, lastname: string) {
        return await fetch(`${baseUrl}users/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ firstname, lastname })
        });
    }
}