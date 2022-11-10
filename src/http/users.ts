import { baseUrl } from ".";

export const usersRequests = {
    getAllUsers: async function() {
        return await fetch(`${baseUrl}users`, {
            method: "GET"
        });
    },
    getUser: async function(id: number) {
        return await fetch(`${baseUrl}users/${id}`, {
            method: "GET"
        });
    },
    createUser: async function(firstname: string, lastname: string) {
        return await fetch(`${baseUrl}users`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ firstname, lastname })
        });
    },
    deleteUser: async function(id: number) {
        return await fetch(`${baseUrl}users/${id}`, {
            method: "DELETE",
        });
    },
    updateUser: async function(id: number, firstname: string, lastname: string) {
        return await fetch(`${baseUrl}users/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ firstname, lastname })
        });
    }
}