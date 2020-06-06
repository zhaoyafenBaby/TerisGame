/*
 * @Author: your name
 * @Date: 2020-06-03 20:23:14
 * @LastEditTime: 2020-06-03 20:24:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\src\core\util.ts
 */ 

/**
 * 根据最大值和最小值，得到该范围内的随机整数（取不到最大值）
 * @param min 
 * @param max 
 */
 export function getRandom(min:number,max:number){
     let dec = max - min;
     return Math.floor(Math.random() * dec + min);
 }