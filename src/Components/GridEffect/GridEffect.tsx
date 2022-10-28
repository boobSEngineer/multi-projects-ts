import React, {useEffect, useRef, useState} from "react";
import g from "./GridEffect.module.css";
import {useResizeDetector} from 'react-resize-detector';

//---------------------------------------------------------interface
interface IPosition {
    x1: number | null,
    y1: number | null,
    x2: number | null,
    y2: number | null,
}

interface ICircle {
    position: IPosition,
    id: number,
    anim: boolean,
    color: string,
    r: number
}


//------------------------------------------------------------positon

let getCursorPosition = (canvas: HTMLCanvasElement, e: any): { x: number, y: number } => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / rect.width * canvas.width);
    const y = Math.floor((e.clientY - rect.top) / rect.height * canvas.height);
    return {x: x, y: y}
}

//---------------------------------------------------------draw

// let drawLine = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
//     ctx.fillStyle = 'red'
//     ctx.lineWidth = 2;
//     let begin_x = 0;
//     let begin_y = 0;
//     let to_x = width;
//     let to_y = 0;
//     for (let i = 0; i < 25; i++) {
//         ctx.beginPath();
//         ctx.moveTo(begin_x, begin_y);
//         ctx.lineTo(to_x, to_y);
//         ctx.stroke();
//         begin_y = begin_y + 50;
//         to_y = to_y + 50;
//     }
//     begin_x = 0;
//     begin_y = 0;
//     to_x = 0;
//     to_y = height;
//     for (let i = 0; i < 35; i++) {
//         ctx.beginPath();
//         ctx.moveTo(begin_x, begin_y);
//         ctx.lineTo(to_x, to_y);
//         ctx.stroke();
//         begin_x = begin_x + 25;
//         to_x = to_x + 25;
//     }
// }
// let eraserCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
//     ctx.beginPath();
//     ctx.lineWidth = 10;
//     ctx.globalCompositeOperation = 'destination-out';
//     let r = 10
//     ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
//     ctx.stroke();
// }

let drawCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, r: number) => {
    // let r = Math.sqrt(Math.pow((centerX), 2) + Math.pow((centerY), 2));
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = `${color}`;
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.stroke();
}

let circleAnimation = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, r: number) => {
    if (centerX && centerY) {
        drawCircle(ctx, centerX, centerY, 'blue', r - 10);
        drawCircle(ctx, centerX, centerY, 'green', r);
    }

}

//------------------------------------------------------------COMPONENT
const GridEffect: React.FC = () => {
    let [clickPosition, setClickPosition] = useState<IPosition>({x1: null, y1: null, x2: null, y2: null});
    let [arrayCircle, setArrayCircle] = useState<ICircle[]>([]);

    let canvasRef = useRef<HTMLCanvasElement>(null);
    let requestIdRef = useRef<number>(0);

    let {width, height} = useResizeDetector({targetRef: canvasRef});


    if (canvasRef.current !== null && width !== undefined && height !== undefined) {
        width = Math.floor(width)
        height = Math.floor(height)
        if (Math.abs(width - canvasRef.current.width) > 100 || Math.abs(height - canvasRef.current.height) > 100) {
            canvasRef.current.width = width
            canvasRef.current.height = height
        }
    }

    let draw = () => {
        if (canvasRef.current !== null) {
            let canvas = canvasRef.current;
            let ctx = canvas.getContext('2d');

            if (ctx !== null) {

                ctx.clearRect(-1, -1, canvasRef.current.width, canvasRef.current.height);


                arrayCircle.map(c => {
                    if (ctx !== null) {
                        if (c.position.x2 && c.position.y2) {
                            if (c.anim) {
                                circleAnimation(ctx, c.position.x2, c.position.y2, c.r);
                            } else {
                                drawCircle(ctx, c.position.x2, c.position.y2, c.color, c.r);
                            }
                        }
                    }
                })
            } else {
                console.log('NULLLL ctx')
            }
        }
    }

    const tick = () => {
        if (!canvasRef.current) return;
        setArrayCircle(arrayCircle.map<ICircle>(o => {
            if (o.r < 150) {
                return {...o, r: o.r + 30}
            } else {
                return {...o, anim: false}
            }
        }))
        draw();
        requestIdRef.current = requestAnimationFrame(tick);
    }

    useEffect(() => {
        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);


    return (
        <div>
            <canvas ref={canvasRef} className={g.canvas}
                    onClick={(e) => {
                        let position = getCursorPosition(e.target as HTMLCanvasElement, e);
                        setClickPosition({
                            ...clickPosition,
                            x1: clickPosition.x2,
                            y1: clickPosition.y2,
                            x2: position.x,
                            y2: position.y,
                        })
                        setArrayCircle([...arrayCircle, {
                            position: {
                                x1: clickPosition.x2,
                                y1: clickPosition.y2,
                                x2: position.x,
                                y2: position.y,
                            }, color: 'red', r: 50, id: new Date().getMilliseconds(), anim: true,
                        }])
                    }}
            >
            </canvas>
        </div>
    )
}

export {GridEffect};
