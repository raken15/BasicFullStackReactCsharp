import { Message } from "../types/Message";

// Configure your API URL using a Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5194/api";

export const useApi = () => {
    // GET: Retrieve all messages
    const getAllMessages = async (): Promise<Message[]> => {
        const response = await fetch(`${API_BASE_URL}/messages`);
        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }
        return response.json();
    };
    // GET: Retrieve a single message by ID
    const getSingleMessage = async (id: number): Promise<Message> => {
        const response = await fetch(`${API_BASE_URL}/messages/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch single message for id: ${id}`);
        }
        return response.json();
    };
    // POST: Create a new message
    const addMessage = async (newMessage: Partial<Message>): Promise<Message> => {
        const response = await fetch(`${API_BASE_URL}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        });
        if (!response.ok) {
            throw new Error("Failed to add new message");
        }
        return response.json();
    };
    // PUT: Update an existing message by ID
    const updateMessage = async (id: number, modifiedMessage: Partial<Message>): Promise<Message> => {
        const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
            method: "PUT",
            headers: {
                "CONTENT-Type" : "application/json"
            },
            body: JSON.stringify(modifiedMessage)
        });
        if (!response.ok) {
            throw new Error(`Failed to update message for id: ${id}`);
        }
        return response.json();
    };
    // DELETE: Delete a message by ID
    const deleteMessage = async (id: number): Promise<{ message: string }> => {
        const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete message with id ${id}`);
        }
        return response.json();
    };

    return { getAllMessages, getSingleMessage, addMessage, updateMessage, deleteMessage };
};