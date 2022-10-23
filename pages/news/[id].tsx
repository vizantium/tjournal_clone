import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import { Comment } from '../../components/Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import {PostComments} from "../../components/PostComments";
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../components/utils/api";
import {PostItem} from "../../components/utils/api/types";

interface PostProps {
    pageProps: {
        post: PostItem
    }
}

const Post: NextPage<PostProps> = ({pageProps}) => {
    return (
        <MainLayout className="mb-50" contentFullWidth>
            <FullPost fullName={pageProps.post.user.fullName} userId={pageProps.post.user.id}
                      title={pageProps.post.title} blocks={pageProps.post.body} postId={pageProps.post.id} />
            <PostComments postId={pageProps.post.id}/>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id;
        const post = await Api(ctx).post.getOne(+id)

        return {
            props: {
                post
            }
        }
    } catch (e) {
        console.warn('fullPage error', e)
        return {
            props: {}, redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }
}

export default Post