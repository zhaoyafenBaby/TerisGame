/*
 * @Author: your name
 * @Date: 2020-06-02 21:44:22
 * @LastEditTime: 2020-06-04 22:56:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\SquareGroup.ts
 */
import { Square } from "./Square";
import { Shape, Point } from "./Type";
import { SquarePageViewer } from "./viewer/SquarePageViewer";
import $ from "jquery";

 


export class SquareGroup{
    private _groupSquares:readonly Square[] = [];
    //设置旋转方向：顺时针
    protected isClock = true;

    private setShapePoint(){
        this._shape.forEach((shape,index) => {
            this._groupSquares[index].point = {
                x:this._centerPoint.x + shape.x,
                y:this._centerPoint.y + shape.y
            }
        })
    }

    public set centerPoint(val:Point){
        this._centerPoint = val;
        this.setShapePoint();
    }

    public get centerPoint():Point{
        return this._centerPoint;
    }

    public get shape(){
        return this._shape;
    }

    public get squares(){
        return this._groupSquares;
    }

    constructor(
        private _shape:Shape,
        private _centerPoint:Point,
        private _color:string
    ){
        //初始化组合
        const groupArrs:Square[] = [];
        this._shape.forEach(shape => {
            let square = new Square();
            square.color = this._color;
            
            // square.viewer = new SquarePageViewer(square,$("#root"));
            groupArrs.push(square);
        })
        this._groupSquares = groupArrs;
        this.setShapePoint();
        
    }
    //获得旋转过后的小方块的坐标点集合
    public getRotateShape():Shape{
        if(this.isClock){
            return this._shape.map(shape => {
                const newShape:Point = {
                    x:-shape.y,
                    y:shape.x
                }
                return newShape;
            })
        }else{
            return this._shape.map(shape => {
                const newShape:Point = {
                    x:shape.y,
                    y:-shape.x
                }
                return newShape;
            })
        }
    }

    //旋转
    public rotate(){
        const newShape = this.getRotateShape();
        this._shape = newShape;
        this.setShapePoint();
    }

}