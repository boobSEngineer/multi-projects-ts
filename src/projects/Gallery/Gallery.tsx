import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getAlbumsThunkCreate} from "../../Redux/Slice/gallery-slice";
import g from "./Album.module.css";
import {Link} from "react-router-dom";


const Gallery: React.FC = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(state => state.gallery.albums);


    useEffect(() => {
        dispatch(getAlbumsThunkCreate())
    }, [dispatch]);

    return (
        <div className={g.wrapper}>
            <div className={g.desc}>
                <h1>Albums</h1>
                <ul>
                    <nav>
                        {
                            albums && albums.map(a => {
                                return <Link className={g.link} to={`/gallery/${a.id}/photos`}><li key={a.id}>{a.id}. {a.title}</li></Link>
                            })
                        }
                    </nav>
                </ul>
            </div>

        </div>

    )
};

export {Gallery};
