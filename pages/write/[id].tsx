import React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {MainLayout} from '../../layouts/MainLayout';
import WriteForm from "../../components/WriteForm";
import {Api} from "../../components/utils/api";
import {PostItem} from "../../components/utils/api/types";

interface WritePageProps {
    pageProps: {
        post: PostItem
    }
}

const Write: NextPage<WritePageProps> = ({pageProps}) => {

    return (
        <MainLayout className='main-layout-white' hideComments hideMenu>
            <WriteForm data={pageProps.post}/>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id;
        const post = await Api(ctx).post.getOne(+id)
        const user = await Api(ctx).user.getMe()
        if (post.user.id !== user.id) {
            return {props: {}, redirect: {destination: '/', permanent: false}}
        }

        return {
            props: {
                post
            }
        }
    } catch (e) {
        console.warn('pagesssss error', e)
        return {
            props: {}, redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }
}

export default Write;