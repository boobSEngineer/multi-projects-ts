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
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `${color}`;
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.fill();
}

let circleAnimation = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, r: number) => {
    if (centerX && centerY) {
        //drawCircle(ctx, centerX, centerY, 'blue', r - 5);
        drawCircle(ctx, centerX, centerY, color, r);
    }

}

let solveRadiusCircle = (w: number, h: number): number => {
    return Math.sqrt(Math.pow((w), 2) + Math.pow((h), 2));
}

let randomColor = (): string => {
    let string_color = [];
    let array_letter = ['a', 'b', 'c', 'd', 'e', 'f'];

    for (let i = 0; i < 6; i++) {
        if (Math.floor(Math.random()) < .6) {
            let number = Math.floor(Math.random() * 10);
            string_color.push(number)
        } else {
            let index_letter = Math.floor(Math.random() * 6);
            string_color.push(array_letter[index_letter]);
        }
    }
    console.log(string_color);
    return '#' + string_color.join('');
}


//------------------------------------------------------------COMPONENT
const GridEffect: React.FC = () => {

    let circleRef = useRef<ICircle[]>([])
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

    let circleFrame = () => {
        if (canvasRef.current !== null) {
            let canvas = canvasRef.current;
            let ctx = canvas.getContext('2d');

            if (ctx !== null) {
                if (circleRef.current !== null) {
                    circleRef.current.forEach(c => {
                        if (c.position.x2 && c.position.y2) {
                            if (ctx !== null) {
                                if (c.anim) {
                                    circleAnimation(ctx, c.position.x2, c.position.y2, c.color, c.r);
                                } else {
                                    circleRef.current = circleRef.current.filter(f => {
                                        if (f.anim) return f
                                    })
                                }

                            }
                        }

                    })
                }
            } else {
                console.log('NULLLL ctx')
            }
        }
    }

    let updateCircle = () => {
        if (circleRef.current !== null) {
            circleRef.current.forEach(o => {
                if (width !== undefined && height !== undefined) {
                    if (o.r < solveRadiusCircle(width, height)) {
                        o.r += 3
                    } else {
                        o.anim = false;
                    }
                }
            })

        }
    }

    const tick = () => {
        if (!canvasRef.current) return;
        updateCircle();
        circleFrame();
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
                        circleRef.current.push({
                            id: new Date().getMilliseconds(),
                            r: 1,
                            anim: true,
                            color: randomColor(),
                            position: {x1: null, y1: null, x2: position.x, y2: position.y}
                        })
                    }}
            >
            </canvas>
        </div>
    )
};

export {GridEffect};
