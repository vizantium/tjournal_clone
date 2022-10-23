import Link from 'next/link';
import {Paper, Avatar, Typography, Button, Tabs, Tab} from '@material-ui/core';
import {
    SettingsOutlined as SettingsIcon,
    TextsmsOutlined as MessageIcon,
} from '@material-ui/icons';

import {Post} from '../../components/Post';
import {MainLayout} from '../../layouts/MainLayout';
import {Api} from "../../components/utils/api";
import {NextPage} from "next";
import {CommentItem, PostItem, ResponseCreateUser} from "../../components/utils/api/types";
import React from "react";
import styles from "../../components/SideComments/SideComments.module.scss";

interface ProfileProps {
    pageProps: {
        user: ResponseCreateUser;
        posts: PostItem[];
        comments: CommentItem[];
    }
}

const Profile: NextPage<ProfileProps> = ({pageProps}) => {
    const [activeTab, setActiveTab] = React.useState(0)

    console.log(pageProps)
    return (
        <MainLayout contentFullWidth hideComments>
            <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
                <div className="d-flex justify-between">
                    <div>
                        <Avatar
                            style={{width: 120, height: 120, borderRadius: 6}}
                        >{pageProps.user.fullName[0]}</Avatar>
                        <Typography style={{fontWeight: 'bold'}} className="mt-10" variant="h4">
                            {pageProps.user.fullName}
                        </Typography>
                    </div>
                    <div>
                        <Link href="/profile/settings">
                            <Button
                                style={{height: 42, minWidth: 45, width: 45, marginRight: 10}}
                                variant="contained">
                                <SettingsIcon/>
                            </Button>
                        </Link>
                        <Button style={{height: 42}} variant="contained" color="primary">
                            <MessageIcon className="mr-10"/>
                            Написать
                        </Button>
                    </div>
                </div>
                <div className="d-flex mb-10 mt-10">
                    <Typography style={{fontWeight: 'bold', color: '#35AB66'}} className="mr-15">
                        +208
                    </Typography>
                    <Typography>2 подписчика</Typography>
                </div>
                <Typography>На проекте с {pageProps.user.createdAt}</Typography>

                <Tabs onChange={(_, newValue) => setActiveTab(newValue)} className="mt-20" value={activeTab}
                      indicatorColor="primary" textColor="primary">
                    <Tab label="Статьи"/>
                    <Tab label="Комментарии"/>
                </Tabs>
            </Paper>
            <div className="d-flex align-start">
                <div className="mr-20 flex">
                    {activeTab === 0 &&
                        pageProps.posts.map((obj) => (
                            <Post key={obj.id} id={obj.id} title={obj.title} description={obj.description}/>
                        ))
                    }
                    {activeTab === 1 &&
                        pageProps.comments.map((obj) => (
                            <Paper elevation={0} className="p-20 mb-20" classes={{root: styles.paper}}>
                                <div className={styles.commentProfileItem}>
                                    <div className={styles.userInfo}>
                                        <Avatar style={{marginRight: 10}}>{obj.user.fullName[0]}</Avatar>
                                        <Link href={`/profile/${obj.user.id}`}>
                                            <a>
                                                <b>{obj.user.fullName}</b>
                                            </a>
                                        </Link>
                                    </div>
                                    <p className={styles.text}>{obj.text}</p>
                                    <Link href={`/news/${obj.post.id}`}>
                                        <a>
                                            <span className={styles.postTitle}>{obj.post.title}</span>
                                        </a>
                                    </Link>
                                </div>
                            </Paper>
                        ))

                    }
                </div>
                {/*<Paper style={{width: 300}} className="p-20 mb-20" elevation={0}>*/}
                {/*    <b>Подписчики</b>*/}
                {/*    <div className="d-flex mt-15">*/}
                {/*        <Avatar*/}
                {/*            className="mr-10"*/}
                {/*            src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"*/}
                {/*        />*/}
                {/*        <Avatar*/}
                {/*            className="mr-10"*/}
                {/*            src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</Paper>*/}
            </div>
        </MainLayout>
    );
}
export const getServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id;
        const user = await Api().user.getOne(+id)
        const posts = await Api().post.getByUserId(+id)
        const comments = await Api().comment.getComByUserId(+id)
        return {
            props: {
                user,
                posts,
                comments,
            }
        }
    } catch (e) {
        console.log(e)
    }
    return {
        props: {
            users: null,
            posts: null,
            // comments: null,
        }
    }
}

export default Profile