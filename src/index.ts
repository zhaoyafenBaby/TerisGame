/*
 * @Author: your name
 * @Date: 2020-06-01 21:54:18
 * @LastEditTime: 2020-06-05 20:29:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\index.ts
 */
import { Square } from "./core/Square"
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";
import { SquareGroup } from "./core/SquareGroup";
import { createNewShape } from "./core/Teris";
import { TerisRules } from "./core/TerisRules";
import { MoveDirection } from "./core/Type";
import { Games } from "./core/Games";
import { GamePageViewer } from "./core/viewer/GamePageViewer";

// const group = createNewShape({x:4,y:4});
// const game = new GamePageViewer();
// game.showNext()

const game = new Games(new GamePageViewer());


 $(".downBtn").click(function(){
    game.moveDown();
 })

 $(".leftBtn").click(function(){
    game.moveLeft();
 })
 
 $(".rightBtn").click(function(){
    game.moveRight();
 })

 $(".rotateBtn").click(function(){
   game.rotate();
 })

 $(".startBtn").click(()=>{
    game.start();
 })

 $(".pauseBtn").click(()=>{
   game.pause();
})

