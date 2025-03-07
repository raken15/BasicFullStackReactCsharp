export interface Message {
    id: number; // Unique identifier (assumed provided by the backend)
    text: string; // Required message content
    createdAt: Date; // Optional; if not provided, backend sets it to current date
}