/*
 * @Author: your name
 * @Date: 2020-06-01 22:35:10
 * @LastEditTime: 2020-06-06 16:06:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\Type.ts
 */
import { Square } from "./Square"
import { SquareGroup } from "./SquareGroup"
import { Games } from "./Games"

 


 export interface Point{
     readonly x:number
     readonly y:number
 }

 export interface IViewer{
     show():void
     remove():void
 }

 export type Shape = Point[]

 export enum MoveDirection{
     left,
     right,
     down
 }

 export enum GameStatus{
     init,
     playing,
     pause,
     over
 }

 export interface GameVierer{
     /**
      * 
      * @param teris 下一个小方块
      */
     showNext(teris:SquareGroup):void;
     /**
      * 切换方块
      * teris:当前小方块
      */
     switchSquare(teris:SquareGroup):void;
     init(game:Games):void;
     showScore(score:Number):void;
     onStart():void;
     onPause():void;
     onOver():void;
 }