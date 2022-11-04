import { baseUrl } from ".";

export const usersRequests = {
    getAllUsers: async function() {
        const response = await fetch(`${baseUrl}users`, {
            method: "GET"
        });
        return response;
    }
}