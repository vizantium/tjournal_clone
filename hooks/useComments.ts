import {CommentItem} from "../components/utils/api/types";
import React from "react";
import {Api} from "../components/utils/api";

type UseCommentsProps = {
    setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>;
    comments: CommentItem[];
}

export const useComments = (postId?: number): UseCommentsProps => {
    const [comments, setComments] = React.useState<CommentItem[]>([])

    React.useEffect(() => {
        (async () => {
            try {
                const arr = await Api().comment.getAll(postId)
                setComments(arr)
            } catch (e) {
                console.warn('comments error getAll', e)
            }
        })();
    }, [])

    return {comments, setComments}
}