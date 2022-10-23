import React from 'react'
import {Button, Input} from "@material-ui/core";
import styles from './AddCommentForm.module.scss'
import {Api} from "../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {CommentItem} from "../utils/api/types";

interface AddCommentFormInt {
    postId: number;
    onSuccessAdd: (obj: CommentItem) => void
}

export const AddCommentForm: React.FC<AddCommentFormInt> = ({postId, onSuccessAdd}) => {
    const [clicked, setClicked] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [text, setText] = React.useState('')

    const onAddComment = async () => {
        try {
            setIsLoading(true)
            const comment = await Api().comment.create({
                postId,
                text
            })
            onSuccessAdd(comment)
            setClicked(false)
            setText('')
        } catch (e) {
            console.warn('AddComment error', e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.form}>
            <Input onFocus={() => setClicked(true)} disabled={isLoading}
                   minRows={clicked ? 5 : 1} classes={{root: styles.fieldRoot}}
                   placeholder={'Написать комментарий ...'} fullWidth multiline value={text}
                   onChange={(e) => setText(e.target.value)}/>
            {clicked &&
                <Button disabled={isLoading} onClick={onAddComment} className={styles.addButton} variant="contained"
                        color="primary">
                    Опубликовать
                </Button>}
        </div>
    )
}

