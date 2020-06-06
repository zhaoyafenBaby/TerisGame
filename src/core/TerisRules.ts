/*
 * @Author: your name
 * @Date: 2020-06-03 20:59:09
 * @LastEditTime: 2020-06-05 21:18:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\TerisRules.ts
 */
import { SquareGroup } from "./SquareGroup";
import { Point, Shape, MoveDirection } from "./Type";
import pageConfig from "./viewer/pageConfig";
import { Square } from "./Square";

//是否为Point类型（可启动类型保护函数）
function isPoint(target:any):target is Point{
    if(target.x === undefined){
        return false;
    }
    return true;
}

/**
 * 小方块的移动规则
 */
 export class TerisRules{
     
     //小方块是否可以移动到目标位置
     static canIMove(shape:Shape,targetPoint:Point,existSquare:Square[]):boolean{
        let targetPoints:Point[]= shape.map(item => {
            return {
                x:item.x + targetPoint.x,
                y:item.y + targetPoint.y
            }
        })
        //边界问题
        const result = targetPoints.some(point => {
            return point.x < 0 || point.x > pageConfig.wrapperSize.width - 1 ||
                   point.y < 0 || point.y > pageConfig.wrapperSize.height - 1;
        })
        if(result){
            return false;
        }
        //与已存在的小方块重叠问题
        if(existSquare.some(square => targetPoints.some(point => point.x == square.point.x && point.y == square.point.y))){
            return false;
        }
        return true;
     }
     
     //移动小方块，返回是否移动成功
     static move(teris:SquareGroup,targetPoint:Point,existSquare:Square[]):boolean;
     static move(teris:SquareGroup,direction:MoveDirection,existSquare:Square[]):boolean;
     static move(teris:SquareGroup,targetPointOrDirection:Point|MoveDirection,existSquare:Square[]):boolean{
         if(isPoint(targetPointOrDirection)){
             //是Point类型
            if(this.canIMove(teris.shape,targetPointOrDirection,existSquare)){
                teris.centerPoint = targetPointOrDirection;
                return true;
            }
            return false;
         }else{
             let targetPoint;
            //方向类型
            switch(targetPointOrDirection){
                case MoveDirection.left:
                    targetPoint = {
                        x:teris.centerPoint.x - 1,
                        y:teris.centerPoint.y
                    };
                    break;
                case MoveDirection.right:
                    targetPoint = {
                        x:teris.centerPoint.x + 1,
                        y:teris.centerPoint.y
                    };
                    break;
                case MoveDirection.down:
                    targetPoint = {
                        x:teris.centerPoint.x,
                        y:teris.centerPoint.y + 1
                    };
                    break;
            }
            return this.move(teris,targetPoint,existSquare);
         }
     }

     //径直一次性移动到目标方向的最大位置
     static moveDirectly(teris:SquareGroup,direction:MoveDirection,existSquare:Square[]){
         while(this.move(teris,direction,existSquare)){
             
         }
     }

     //旋转规则，防止旋转出界
     static rotate(teris:SquareGroup,existSquare:Square[]):boolean{
         const newShape = teris.getRotateShape();
         if(this.canIMove(newShape,teris.centerPoint,existSquare)){
             teris.rotate();
             return true;
         }else{
             return false;
         }
     }
 }