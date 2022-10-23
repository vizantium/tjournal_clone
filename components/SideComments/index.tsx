import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import data from '../../data'
import clsx from 'clsx'
import styles from './SideComments.module.scss';
import Link from "next/link";
import {useComments} from "../../hooks/useComments";
import {PostItem, ResponseCreateUser} from "../utils/api/types";
import {Avatar} from "@material-ui/core";


interface CommentItemProps {
    user: ResponseCreateUser;
    text: string;
    post: PostItem;
}

const CommentItem: React.FC<CommentItemProps> = ({user, text, post}) => {

    return (
        <div className={styles.commentItem}>
            <div className={styles.userInfo}>
                <Avatar style={{marginRight: 10}}>{user.fullName[0]}</Avatar>
                <Link href={`/profile/${user.id}`}>
                    <a>
                        <b>{user.fullName}</b>
                    </a>
                </Link>
            </div>
            <p className={styles.text}>{text}</p>
            <Link href={`/news/${post.id}`}>
                <a>
                    <span className={styles.postTitle}>{post.title}</span>
                </a>
            </Link>
        </div>
    );
};

export const SideComments = () => {
    const [visible, setVisible] = React.useState(true)
    const {comments} = useComments()

    const toggleVisible = () => {
        setVisible(!visible)
    }

    return (
        <div className={clsx(styles.root, !visible && styles.rotated)}>
            <h3 onClick={toggleVisible}>
                Комментарии <ArrowRightIcon/>
            </h3>
            {visible && comments.map((obj) => (
                <CommentItem key={obj.id} {...obj} />
            ))}
        </div>
    );
};
