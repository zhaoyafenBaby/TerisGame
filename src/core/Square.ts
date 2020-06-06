/*
 * @Author: your name
 * @Date: 2020-06-01 22:34:17
 * @LastEditTime: 2020-06-02 21:11:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\Square.ts
 */
import { Point, IViewer } from "./Type";


export class Square{
    private _viewer?:IViewer
    private _point:Point = {
        x:0,
        y:0
    }
    private _color:string = ""

    public set point(val){
        this._point = val;
        if(this._viewer){
            this._viewer.show();
        }
    }

    public set viewer(val){
        this._viewer = val;
        if(val && this._viewer){
            this._viewer.show();
        }
    }

    public get viewer(){
        return this._viewer
    }
    
    public get point(){
        return this._point;
    }

    public get color(){
        return this._color;
    }

    public set color(val){
        this._color = val;
    }

    public constructor(){}
 }
 
 