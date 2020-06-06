/*
 * @Author: your name
 * @Date: 2020-06-02 20:29:32
 * @LastEditTime: 2020-06-02 21:05:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\viewer\viewer.ts
 */
import { IViewer } from "../Type";
import { Square } from "../Square";
import $ from "jquery";
import PageConfig from "./pageConfig"

 

export class SquarePageViewer implements IViewer{
    public dom?:JQuery<HTMLElement>
    public isRemoved?:boolean
    constructor(
        private square:Square,
        private container:JQuery<HTMLElement>
    ){}
    show(): void {
        if(this.isRemoved){
            return;
        }
        if(!this.dom){
            this.dom = $("<div>").css({
                width:PageConfig.squareSize.width,
                height:PageConfig.squareSize.height,
                border:"1px solid #ccc",
                position:"absolute",
                boxSizing:"border-box"
            }).appendTo($(this.container))
        }
        this.dom.css({
            background:this.square.color,
            left:this.square.point.x * PageConfig.squareSize.width,
            top:this.square.point.y * PageConfig.squareSize.height
        })
    }
    remove(): void {
        if(this.dom && !this.isRemoved){
            this.dom.remove();
            this.isRemoved = true;
        }
    }
}