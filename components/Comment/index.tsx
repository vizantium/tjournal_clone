import React from 'react';
import {Typography, IconButton, MenuItem, Menu, Avatar, Input, Button} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import {ResponseCreateUser} from "../utils/api/types";
import {Api} from "../utils/api";

interface CommentPostProps {
    user: ResponseCreateUser
    text: string;
    createdAt: string;
    currentUserData: number;
    id: number;
    onRemove: (id: number) => void;
    onUpdate: (id: number, textComment: string) => void;
}

export const Comment: React.FC<CommentPostProps> = ({
                                                        id, user, text,
                                                        createdAt, currentUserData, onRemove, onUpdate
                                                    }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [commentEdit, setCommentEdit] = React.useState(false)
    const [textComment, setText] = React.useState(text)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickRemove = async () => {
        if (window.confirm('Удалить комментарий?')) {
            try {
                await Api().comment.remove(id)
                onRemove(id)
            } catch (e) {
                console.warn('delete comment error', e)
            } finally {
                handleClose();
            }
        }
    }

    const handleClickUpdate = async () => {
        try {
            const comment = await Api().comment.update(id, {
                text: textComment,
            })
            onUpdate(id, textComment)
            setCommentEdit(false)
        } catch (e) {
            console.warn('UPDATE COMMENT ERROR', e)
            alert('update com error')
        }
    }

    return (
        <div className={styles.comment}>
            <div className={styles.userInfo}>
                <Avatar style={{marginRight: 10}}>{user.fullName[0]}</Avatar>
                <b>{user.fullName}</b>
                <span>{createdAt}</span>
            </div>
            {commentEdit ? <div className={styles.form}>
                <Input
                    classes={{root: styles.fieldRoot}}
                    placeholder={'Написать комментарий ...'} fullWidth multiline value={textComment}
                    onChange={(e) => setText(e.target.value)}/>
                <Button onClick={handleClickUpdate} className={styles.addButton} variant="contained"
                        color="primary">
                    Сохранить
                </Button>
            </div> : <Typography className={styles.text}>
                {text}
            </Typography>}
            <span className={styles.replyBtn}>Ответить</span>

            {user.id === currentUserData &&
                <>
                    <IconButton onClick={handleClick}>
                        <MoreIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        elevation={2}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        keepMounted>
                        <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
                        <MenuItem onClick={() => setCommentEdit(true)}>Редактировать</MenuItem>
                    </Menu>
                </>
            }
        </div>
    );
};
