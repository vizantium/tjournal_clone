import {AxiosInstance} from 'axios';
import {CreateUserDto, LoginDto, ResponseCreateUser} from "./types";

export const UserApi = (instance: AxiosInstance) => ({
    async getAll() {
        const {data} = await instance.get<ResponseCreateUser[]>('/users')
        return data
    },
    async getOne(id: number) {
        const {data} = await instance.get<ResponseCreateUser>(`/users/${id}`)
        return data
    },
    async register(dto: CreateUserDto) {
        const {data} = await instance.post<CreateUserDto, { data: ResponseCreateUser }>('/auth/register', dto)
        return data
    },
    async login(dto: LoginDto) {
        const {data} = await instance.post<LoginDto, {data : ResponseCreateUser}>('/auth/login', dto)
        return data
    },

    async getMe() {
        const {data} = await instance.get< ResponseCreateUser >('/users/me')
        return data
    }
})