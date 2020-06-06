/*
 * @Author: your name
 * @Date: 2020-06-04 22:32:41
 * @LastEditTime: 2020-06-06 16:37:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\viewer\GamePageViewer.ts
 */
import { GameVierer, GameStatus } from "../Type";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery";
import { Games } from "../Games";
import pageConfig from "./pageConfig";

 

 export class GamePageViewer implements GameVierer{
     
     
     private _curPanel = $("#curPanel");
     private _nextPanel = $("#nextPanel");
     private _scorePanel = $("#score");
     private _msgPanel = $("#msg");

    onStart(): void {
        this._msgPanel.hide();
    }
    onPause(): void {
        this._msgPanel.css({
            display:"flex"
        })
        this._msgPanel.find("p").html("游戏暂停");
    }
    onOver(): void {
        this._msgPanel.css({
            display:"flex"
        })
        this._msgPanel.find("p").html("游戏结束");
    }

    showScore(score: Number): void {
        this._scorePanel.html(score.toString());
    }

     //游戏界面初始化
     init(game: Games): void {
         this._curPanel.css({
             width:pageConfig.wrapperSize.width * pageConfig.squareSize.width,
             height:pageConfig.wrapperSize.height * pageConfig.squareSize.height,
         })

         this._nextPanel.css({
            width:pageConfig.nextPanelSize.width * pageConfig.squareSize.width,
            height:pageConfig.nextPanelSize.height * pageConfig.squareSize.height,
        })

        $(document).keydown((e) => {
            if(e.keyCode == 32){
                //空格：开始/暂停/恢复
                if(game.gameStatus == GameStatus.playing){
                    game.pause();
                }else{
                    game.start();
                }
            }else if(e.keyCode == 37){
                //向左
                game.moveLeft();
            }else if(e.keyCode == 38){
                //向上：旋转
                game.rotate();
            }else if(e.keyCode == 39){
                //向右
                game.moveRight();
            }else if(e.keyCode == 40){
                game.moveDown();
            }
        })
     }
     showNext(teris: SquareGroup): void {
         teris.squares.forEach(square => {
             square.viewer = new SquarePageViewer(square,this._nextPanel);
         })
     }
     switchSquare(teris: SquareGroup): void {
         teris.squares.forEach(square => {
             square.viewer!.remove();
             square.viewer = new SquarePageViewer(square,this._curPanel);
         })
     }
 }