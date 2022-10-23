import {Avatar, Button, Paper, Typography} from '@material-ui/core';
import React from 'react';
import {PostActions} from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import Link from 'next/link';

import styles from './FullPost.module.scss';
import {OutputData} from "@editorjs/editorjs";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";

interface FullPostProps {
    title: string;
    blocks: OutputData['blocks']
    fullName: string;
    userId: number;
    postId: number;
}

export const FullPost: React.FC<FullPostProps> = ({title, blocks,
                                                      postId, fullName, userId}) => {
    const {id} = useAppSelector(selectUserData)
    console.log(userId, id)
    return (
        <Paper elevation={0} className={styles.paper}>
            <div className={'container'}>
                <Typography variant="h4" className={styles.title}>
                    {title}
                </Typography>
                <div className={styles.text}>
                    {
                        blocks.map((obj) => (
                            <Typography key={obj.id} dangerouslySetInnerHTML={{__html: obj.data.text}}/>))
                    }
                    <div style={{width: 250, marginLeft: -14}}>
                        <PostActions/>
                    </div>
                    <div className="d-flex justify-between align-center mt-30 mb-30">
                        <div className={styles.userInfo}>
                            <Avatar>{fullName[0]}</Avatar>
                            <b>{fullName}</b>
                        </div>
                        <div>
                            <Button variant="contained" className="mr-15">
                                <MessageIcon/>
                            </Button>
                            <Button variant="contained">
                                <UserAddIcon/>
                                <b className="ml-10">Подписаться</b>
                            </Button>
                            {id === userId && <Button  className="ml-10" variant="contained">
                                <Link href={`/write/${postId}`}>
                                    <a>
                                        Редактировать
                                    </a>
                                </Link>
                            </Button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};
