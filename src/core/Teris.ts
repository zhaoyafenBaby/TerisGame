/*
 * @Author: your name
 * @Date: 2020-06-03 20:15:04
 * @LastEditTime: 2020-06-06 14:44:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\teries.ts
 */
import { Shape, Point } from "./Type";
import { getRandom } from "./util";
import { SquareGroup } from "./SquareGroup";

 export class TShape extends SquareGroup{
     constructor( 
        _centerPoint:Point,
        _color:string){
            super([{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:-1}],_centerPoint,_color);
        }
 }

 export class LShape extends SquareGroup{
    constructor( 
       _centerPoint:Point,
       _color:string){
           super([{x:-2,y:0},{x:-1,y:0},{x:0,y:0},{x:0,y:-1}],_centerPoint,_color);
       }
}

export class LMirrorShape extends SquareGroup{
    constructor( 
       _centerPoint:Point,
       _color:string){
           super([{x:2,y:0},{x:1,y:0},{x:0,y:0},{x:0,y:-1}],_centerPoint,_color);
       }
}

export class SShape extends SquareGroup{
    constructor( 
       _centerPoint:Point,
       _color:string){
           super([{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:-1,y:1}],_centerPoint,_color);
       }

    rotate(){
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class SMirrorShape extends SquareGroup{
    constructor( 
       _centerPoint:Point,
       _color:string){
           super([{x:0,y:0},{x:-1,y:0},{x:0,y:1},{x:1,y:1}],_centerPoint,_color);
       }

    rotate(){
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class SquareShape extends SquareGroup{
    constructor( 
       _centerPoint:Point,
       _color:string){
           super([{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}],_centerPoint,_color);
       }

    getRotateShape(){
        return this.shape;
    }
}

export class LineShape extends SquareGroup{
    constructor( 
       _centerPoint:Point,
       _color:string){
           super([{x:-2,y:0},{x:-1,y:0},{x:0,y:0},{x:1,y:0}],_centerPoint,_color);
       }

    rotate(){
        super.rotate();
        this.isClock = !this.isClock;
    }
}


export const ShapeGroup = [
    TShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape
]

export const colors = [
    "red","yellow","green","blue","orange"
]

export function createNewShape(centerPoint:Point){
    let index = getRandom(0,ShapeGroup.length);
    let shape = ShapeGroup[index];
    index = getRandom(0,colors.length);
    let color = colors[index];
    return new shape(centerPoint,color);
}