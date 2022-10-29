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
let pixelSize = 50;

//------------------------------------------------------------position

let getCursorPosition = (canvas: HTMLCanvasElement, e: any): { x: number, y: number } => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / rect.width * canvas.width);
    const y = Math.floor((e.clientY - rect.top) / rect.height * canvas.height);
    return {x: x, y: y}
}

//---------------------------------------------------------draw
let drawCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, r: number) => {
    //create gradient
    let gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
    gradient.addColorStop(1, color+'00');
    gradient.addColorStop(1- (Math.min(1, 150/pixelSize/r)), color+'ff');

    //draw
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    // ctx.fillStyle = `${color}`;
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.fill();
}

let circleAnimation = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, r: number) => {
    if (centerX && centerY) {
        drawCircle(ctx, centerX, centerY, color, r);
    }
}


let solveRadiusCircle = (): number => {
    return Math.sqrt(Math.pow((1920), 2) + Math.pow((1080), 2))/pixelSize;
}

let randomColor = () => {
    let string_color = [];
    let array_letter = ['a', 'b', 'c', 'd', 'e', 'f'];

    for (let i = 0; i < 6; i++) {
        if(Math.floor(Math.random()) < .6) {
            let number = Math.floor(Math.random() * 10);
            string_color.push(number)
        }
        else {
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
        width = Math.floor(width/pixelSize)
        height = Math.floor(height/pixelSize)
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
                if (o.r < solveRadiusCircle()) {
                    o.r += 6/pixelSize
                } else {
                    o.anim = false;
                }
            })

        }
    }

    const tick = () => {
        if (!canvasRef.current) return;
        circleFrame();
        updateCircle();
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
