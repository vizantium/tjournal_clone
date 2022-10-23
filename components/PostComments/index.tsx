import React from "react";
import {Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {Comment} from "../Comment";
import {AddCommentForm} from "../AddCommentForm";
import data from '../../data'
import {Api} from "../utils/api";
import {CommentItem} from "../utils/api/types";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {useComments} from "../../hooks/useComments";

interface PostCommentsProps {
    postId: number
}

export const PostComments: React.FC<PostCommentsProps> = ({postId}) => {
    const userData = useAppSelector(selectUserData)
    const [activeTab, setActiveTab] = React.useState(0)
    const {comments, setComments} = useComments(postId)
    // const comments = data.comments[activeTab === 0 ? 'popular' : 'new']
    const [commentLength, setCommentLength] = React.useState(0)

    React.useEffect(() => {
        (async () => {
            try {
                const arr = await Api().comment.getAll(postId)
                setComments(arr)
                setCommentLength(arr.length)
            } catch (e) {
                console.warn('comments error getAll', e)
            }
        })();
    }, [])

    const onUpdateComment = async (id: number, textComment: string) => {
        const comment = comments.filter(obj => obj.id === id)
        comment[0].text = textComment
        const commentsArr = comments.map(obj => obj.id === id ? comment[0] : obj)
        console.log(commentsArr)
        // commentsArr.push(comment[0])

        setComments(commentsArr)
    }

    const onAddComment = (obj: CommentItem) => {
        setComments(prev => [...prev, obj])
    }
    const onRemoveComment = (id: number) => {
        setComments(prev => prev.filter(obj => obj.id !== id))
    }

    return (
        <Paper elevation={0} className="mt-40 p-30">
            <div className={'container'}>
                <Typography variant="h6" className="mb-20">
                    {commentLength} комментария
                </Typography>
                <Tabs onChange={(_, newValue) => setActiveTab(newValue)} className="mt-20" value={activeTab}
                      indicatorColor="primary" textColor="primary">
                    <Tab label="Популярные"/>
                    <Tab label="По порядку"/>
                </Tabs>
                <Divider/>
                {userData && <AddCommentForm onSuccessAdd={onAddComment} postId={postId}/>}
                <div className="mb-20"/>
                {comments.map(obj => <Comment key={obj.id} user={obj.user}
                                              text={obj.text} createdAt={obj.createdAt}
                                              currentUserData={userData?.id} id={obj.id}
                                              onRemove={onRemoveComment} onUpdate={onUpdateComment}/>)}
            </div>
        </Paper>
    )
}
