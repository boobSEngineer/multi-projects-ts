import React from "react";
import e from "./ElementPost.module.css";
import {motion} from "framer-motion";
import {useAppDispatch} from "../../hook";
import {deletePostThunkCreate} from "../../Redux/Slice/post-slicle";

const variantsPost = {
    hidden: {
        y: -1000,
        opacity: 0
    },

    visible: {
        y: 0,
        opacity: 1,
        transition: ({
            delay: 0.2,
            duration: 1,
            type: 'tween'
        })
    },
};

interface IElementsPostsProps {
    id: number,
    userId: number,
    title: string,
    body: string,
}

const ElementsPosts: React.FC<IElementsPostsProps> = (props) => {
    const dispatch = useAppDispatch();

    const {title, id, userId, body} = props;

    return (
        <div>
            <motion.li className={e.item} initial={'hidden'} animate={'visible'} variants={variantsPost}
                onDoubleClick={()=>{dispatch(deletePostThunkCreate(id))}}
            >
                <h1>{title}</h1>
                <h2>POST: {id}</h2>
                <h2>User: {userId}</h2>
                <p>{body}</p>
            </motion.li>
        </div>
    )
}
export {ElementsPosts};
