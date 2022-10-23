import {OutputData} from "@editorjs/editorjs";

export type CreateUserDto = {
    fullName: string;
    email: string;
    password: string;
}

export type LoginDto = {
    email: string;
    password: string;
}

export type ResponseCreateUser = {
    createdAt: string;
    email: string;
    fullName: string;
    id: number;
    token: string;
    updatedAt: string;
    commentsCount?: number;
}

export type PostItem = {
    title: string;
    body: OutputData['blocks'];
    tag: null | string;
    id: number;
    views: number;
    user: ResponseCreateUser;
    createdAt: string;
    updatedAt: string;
    description: string;
}

export type CommentItem = {
    id: number;
    text: string;
    post: PostItem;
    user: ResponseCreateUser;
    commentsCount?: number;
    createdAt: string;
    updatedAt: string;
}


