import { baseUrl } from ".";
import { UsersData } from "../types";
import { HTTP_CODES } from "./codes";

// class responsible for requests to /api/users
export class UsersRequests {
    // GET /api/users
    static async getAllUsers() {
        const response = await fetch(`${baseUrl}users`, {
            method: "GET"
        });
        const data: UsersData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success";
        }
        return data;
    }
    // GET /api/users/:id
    static async getUser(id: number) {
        const response =  await fetch(`${baseUrl}users/${id}`, {
            method: "GET"
        });
        const data: UsersData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success"
        }
        return data;
    }
    // POST /api/users
    static async createUser(firstname: string, lastname: string) {
        const response = await fetch(`${baseUrl}users`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ firstname, lastname })
        });
        const data: UsersData = await response.json();
        if (response.status === HTTP_CODES.CREATED_201) {
            data.code = "Success"
        }
        return data;
    }
    // PUT /api/users/:id
    static async updateUser(id: number, firstname: string, lastname: string) {
        const response = await fetch(`${baseUrl}users/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ firstname, lastname })
        });
        const data: UsersData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success"
        }
        return data;
    }
    // DELETE /api/users/:id
    static async deleteUser(id: number) {
        const response = await fetch(`${baseUrl}users/${id}`, {
            method: "DELETE",
        });
        const data: UsersData = await response.json();
        if (response.status === HTTP_CODES.OK_200) {
            data.code = "Success"
        }
        return data;
    }
}