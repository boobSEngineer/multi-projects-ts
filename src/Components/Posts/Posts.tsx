import React from "react";
import p from "./ElementPost.module.css";
import {ElementsPosts} from "./ELementsPosts";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getPostsThunkCreate} from "../../Redux/Slice/post-slicle";
import {Settings} from "./Settings";

const Posts: React.FC = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);
    const status = useAppSelector(state => state.post.status);
    const error = useAppSelector(state => state.post.error);


        return (
            <div className={p.wrapper}>
                <button className={p.button} onClick={()=>{dispatch(getPostsThunkCreate())}}>getPosts
                </button>
                <Settings/>
                {status === 'pending' && <div className={p.error}><p>Loading....</p></div>}
                {error && <div>Ошибка типа: {error}</div>}
                {posts.length > 0 && posts.map(p => {
                    return  <ElementsPosts key={p.id} {...p}/>
                })}
            </div>
        )
}
export {Posts};
