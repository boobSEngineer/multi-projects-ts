import React, {useState} from "react";
import p from "./ElementPhoto.module.css";
import g from "./Album.module.css"
import {motion, AnimatePresence} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../hook";
import {changeIdNext, changeIdBack, setCurrentId} from "../../Redux/Slice/gallery-slice";

interface IPhoto {
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

const variantsImg = {
    enter: (direction: string) => {
        return {
            x: direction === 'next' ? 1000 : -1000,
            y: -300,
            opacity: 1
        };
    },
    center: {
        zIndex: 1,
        x: -300,
        y: -300,
        opacity: 1
    },
    exit: (direction: string) => {
        return {
            opacity: 1,
            x: direction === 'next' ? -1000 : 1000,
            y: -300,
            transition: {duration: 0.25}
        }
    }
}

const variantsPhoto = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0, transition: {duration: 0.25}}
};

const Photo: React.FC<IPhoto> = (props) => {
    const selectedId = useAppSelector(state => state.gallery.currentId);
    const direction = useAppSelector(state => state.gallery.direction);

    const dispatch = useAppDispatch();
    let {id, url, thumbnailUrl, albumId, title} = props


    return (
        <>
            <motion.div className={p.grid_box} onClick={() => {
                dispatch(setCurrentId(id))
            }}>
                <motion.div className={p.grid_cover_for_img}>
                    <img src={thumbnailUrl}/>
                </motion.div>
                <motion.p className={p.grid_text_title}>{id}. {title}</motion.p>
            </motion.div>

            <AnimatePresence>
                {selectedId === id && (
                    <motion.div className={g.box_wrapper} initial={'hidden'} animate={'visible'} exit={'exit'}
                                variants={variantsPhoto}
                                onDoubleClick={() => dispatch(setCurrentId(null))}>
                        <motion.div className={g.popup}>
                            <motion.div className={g.popup_photo}>

                                <button className={p.button + ' ' + p.left}  onClick={() => {dispatch(changeIdBack())}}>⇦</button>
                                <motion.img src={url}
                                    custom={direction}
                                    initial={direction === null? {opacity: 1, x: -300, y: -300}: "enter"}
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        y: { type: "spring", stiffness: 300, damping: 20 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    variants={variantsImg}
                                />
                                <button className={p.button + ' ' + p.right} onClick={() => {dispatch(changeIdNext())}}>⇨</button>

                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>


    )
}

export {Photo};
