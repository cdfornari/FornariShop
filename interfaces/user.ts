export interface iUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'client';
    createdAt?: String;
    updatedAt?: String;
}