import React, {useEffect, useState} from "react";
import {Photo} from "./Photo";
import i from "./Album.module.css";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getPhotosAlbumByIdThunkCreate} from "../../Redux/Slice/gallery-slice";
import {useParams} from "react-router-dom";


const InputAlbum: React.FC = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector(state => state.gallery.photos);
    const fetching = useAppSelector(state => state.gallery.fetching)

    let params = useParams();

    useEffect(() => {
        if (params.idAlbum != null) {
            dispatch(getPhotosAlbumByIdThunkCreate((parseInt(params.idAlbum))))
        }
    }, [params.idAlbum])

    return (
        <div className={i.wrapper}>
            {fetching ? <div className={i.load}><p>LOADING</p></div> :
                <div className={i.desc}>
                    <div className={i.grid}>
                        {photos && photos.map(p => {
                            return <Photo key={p.id} {...p} />
                        })}
                    </div>
                </div>
            }

        </div>
    )
};

export {InputAlbum};
