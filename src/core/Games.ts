/*
 * @Author: your name
 * @Date: 2020-06-04 21:53:33
 * @LastEditTime: 2020-06-06 16:37:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\Games.ts
 */

import { GameStatus, MoveDirection } from "./Type";
import { SquareGroup } from "./SquareGroup";
import { createNewShape } from "./Teris";
import { TerisRules } from "./TerisRules";
import { GamePageViewer } from "./viewer/GamePageViewer";
import pageConfig from "./viewer/pageConfig";
import { Square } from "./Square";

export class Games{
    private _gameStatus:GameStatus = GameStatus.init;

    public get gameStatus(){
        return this._gameStatus;
    }
    private _nextSquare:SquareGroup = createNewShape({x:0,y:0});
    private _curSquare?:SquareGroup;
    private _timer?:number;
    private _duration:number = 1000;
    private _existSquares:Square[] = [];
    private _score:number = 0;

    public get score(){
        return this._score;
    }

    public set score(val){
        this._score = val;
        this._viewer.showScore(val);
        const level = pageConfig.scoreLevel.filter(_level => {
            return this._score >= _level.score;
        }).pop();
        this._duration = level!.duration;
        clearInterval(this._timer);
        this._timer = undefined;
        this.autoDrop();
    }
    constructor(private _viewer:GamePageViewer){
        this.createNextSquare();
        this._viewer.init(this);
    }

    //游戏初始化
    public init(){
        this._curSquare = undefined;
        this._gameStatus = GameStatus.init;
        this.createNextSquare();
        this._existSquares.forEach(square => {
            if(square.viewer){
                square.viewer.remove();
            }
        })
        this._existSquares = [];
        this.score = 0;
    }

    public createNextSquare(){
        
        this._nextSquare = createNewShape({x:0,y:0});
        this.resetCenterPoint(pageConfig.nextPanelSize.width,this._nextSquare);
        this._viewer.showNext(this._nextSquare);
        this._viewer.showScore(this._score);
    }

    //游戏开始
    public start(){
        if(this._gameStatus == GameStatus.playing){
            return;
        }
        if(this._gameStatus == GameStatus.over){
            this.init();
        }
        this._gameStatus = GameStatus.playing;
        if(!this._curSquare){
            this.switchSquare();
        }
        this.autoDrop()
        this._viewer.onStart();
    }

    //向下移动
    public moveDown(){
        if(this._gameStatus != GameStatus.playing || !this._curSquare){
            return;
        }
        if(!TerisRules.move(this._curSquare as SquareGroup,MoveDirection.down,this._existSquares)){
            //触底了
            this.arriveBottom();
        }
    }

    //向左移动
    public moveLeft(){
        if(this._gameStatus != GameStatus.playing || !this._curSquare){
            return;
        }
        TerisRules.move(this._curSquare as SquareGroup,MoveDirection.left,this._existSquares);
    }

    //向右移动
    public moveRight(){
        if(this._gameStatus != GameStatus.playing || !this._curSquare){
            return;
        }
        TerisRules.move(this._curSquare as SquareGroup,MoveDirection.right,this._existSquares);
    }

    //方块旋转
    public rotate(){
        if(this._gameStatus != GameStatus.playing || !this._curSquare){
            return;
        }
        TerisRules.rotate(this._curSquare,this._existSquares);
    }

    //自由下落（界面用户没有任何操作，则自由下落）
    public autoDrop(){
        if(this._gameStatus != GameStatus.playing || !this._curSquare){
            return;
        }
        this._timer = setInterval(() => {
            if(!TerisRules.move(this._curSquare as SquareGroup,MoveDirection.down,this._existSquares)){
                //触底了
                this.arriveBottom();
            }
        },this._duration)
    }

    /**
     * 切换小方块，将下一个方块切换为当前方块，新建下一个方块
     */
    public switchSquare(){
        this._curSquare = this._nextSquare;
        this._nextSquare.squares.forEach(square => {
            if(square.viewer){
                square.viewer.remove();
            }
        })
        this.resetCenterPoint(pageConfig.wrapperSize.width,this._curSquare);
        if(!TerisRules.canIMove(this._curSquare.shape,this._curSquare.centerPoint,this._existSquares)){
            //游戏结束
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onOver();
            return;
        }
        
        this.createNextSquare();
        this._viewer.switchSquare(this._curSquare);
    }

    //游戏暂停
    public pause(){
        if(this._gameStatus == GameStatus.playing){
            this._gameStatus = GameStatus.pause;
        }
        clearInterval(this._timer);
        this._timer = undefined;
        this._viewer.onPause();
    }

    //重新计算当前方块应该在的位置（所在面板的中心位置）
    public resetCenterPoint(width:number,teris:SquareGroup){
        const x = Math.floor(width /2) - 1;
        const y = 0;
        teris.centerPoint = {x,y};
        while(teris.squares.some(square => square.point.y < 0)){
            teris.centerPoint = {
                x:teris.centerPoint.x,
                y:teris.centerPoint.y +1
            }
        }
    }

    //方块触底后
    public arriveBottom(){
        //将触底的小方块加入到已经到达的小方块数组中
        this._existSquares = this._existSquares.concat(this._curSquare?.squares as Square[]);
        //移除已经凑满一行的方块
        const num = this.removeBottomSquares();
        this.addScore(num);
        this.switchSquare();
    }

    public addScore(numLine:number){
        if(numLine == 0){
            return;
        }
        if(numLine == 1){
            this.score += 10;
        }else if(numLine == 2){
            this.score += 15;
        }else if(numLine == 3){
            this.score += 20;
        }else{
            this.score += 30;
        }
    }

    /**
     * 消除已经铺满一行的小方块
     * 返回消除了几行
     */
    private removeBottomSquares():number{
        const yArrs:number[] = [];
        this._existSquares.forEach(square => {
            yArrs.push(square.point.y);
        })
        const minY = Math.min(...yArrs);
        const maxY = Math.max(...yArrs);
        let num = 0;
        for(let y = minY; y <= maxY; y ++){
            if(this.removeYSquares(this._existSquares,y)){
                num ++;
            }
        }
        return num;
    }

    /**
     * 消除该行的小方块们
     * 返回是否消除成功（没有占满时不需要消除）
     * @param _existSquares 已存在的小方块合集
     * @param y 要消除的某一行
     */
    private removeYSquares(_existSquares:Square[],y:number):boolean{
        const squareRow = _existSquares.filter(square => square.point.y == y);
        if(squareRow.length == pageConfig.wrapperSize.width){
            //这一行可以消除
            squareRow.forEach(square => {
                //1.从界面上移除小方块
                if(square.viewer){
                    square.viewer.remove();
                    
                }
                // 2. 从已有的所有小方块的合集中，删除该小方块
                const index = _existSquares.indexOf(square);
                _existSquares.splice(index,1);
            })
            //3.留下的小方块，y坐标小于该行y值的，y+1
            _existSquares.filter(sq => sq.point.y < y).forEach(sq => {
                sq.point = {
                    x:sq.point.x,
                    y:sq.point.y + 1
                }
            })
            return true;
            
        }
        return false;
    }
}
