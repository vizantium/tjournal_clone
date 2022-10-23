import {AxiosInstance} from 'axios';
import {CommentItem, CreateUserDto, LoginDto, PostItem, ResponseCreateUser} from "./types";
import {OutputData} from "@editorjs/editorjs";

type CreateCommentDto = {
    postId: number;
    text: string;
}
type UpdateCommentDto = {
    text: string;
}



export const CommentApi = (instance: AxiosInstance) => ({
    async getAll(id:number) {
        const {data} = await instance.get<CommentItem[]>(`/comments?postId=${id}`)
        return data
    },
    async getComByUserId(id:number) {
        const {data} = await instance.get<CommentItem[]>(`/comments?userId=${id}`)
        return data
    },
    async create(dto: CreateCommentDto) {
        const {data} = await instance.post<CreateCommentDto, { data: CommentItem }>('/comments', dto)
        return data
    },
    async update(id: number, dto: UpdateCommentDto) {
        const {data} = await instance.patch<UpdateCommentDto, { data: CommentItem }>(`/comments/${id}`, dto)
        return data
    },
    async remove(id: number) {
        return  await instance.delete('/comments/' + id)
    },
})