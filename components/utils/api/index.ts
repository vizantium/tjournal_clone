import Cookies, {parseCookies} from 'nookies'
import {UserApi} from "./user";
import {GetServerSidePropsContext, NextPageContext} from "next";
import axios from "axios";
import {PostApi} from "./post";
import {CommentApi} from "./comment";

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>;
    post: ReturnType<typeof PostApi>;
    comment: ReturnType<typeof CommentApi>
}

export const Api = (ctx? : NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.rtoken;

    console.log(ctx, token)

    const instance = axios.create({
        baseURL: 'http://localhost:4444/',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const apis = {
        user: UserApi,
        post: PostApi,
        comment: CommentApi,
    }

    const result = Object.entries(apis).reduce((prev: any, [key, f]) => {
        return {
            ...prev,
            [key]: f(instance)
        }
    }, {} as ApiReturnType)

    return result

}

