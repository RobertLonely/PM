// /*
// * @Author: Lee
// * @Date:   2019-04-20 11:58:34
// * @Last Modified by:   Lee
// * @Last Modified time: 2019-04-20 16:54:59
// */
// var nextData = [
//   [2, 2, 0, 0],
//   [0, 2, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ];
// var gameData = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
//   [0, 0, 0, 2, 2, 2, 1, 1, 0, 0],
//   [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
// ];
// var nextDivs = [];//用来保存div
// var gameDivs = [];
// var initGame = function() {//创建div并保存到gameDivs数组中
//   for(var i=0; i<gameData.length; i++){
//   	var gameDiv = [];
//   	for(var j=0; j<gameData[0].length; j++){
//   		var newNode = document.createElement('div');
//   		newNode.className = 'none';
//   		newNode.style.top = (i*20) + 'px';
//   		newNode.style.left = (j*20) + 'px';
//   		document.getElementById('game').appendChild(newNode);
//   		gameDiv.push(newNode);
//   	}
//   	gameDivs.push(gameDiv);
//   }
// }
// var initNext = function() {//创建div并保存到nextDivs数组中
//   for(var i=0; i<nextData.length; i++){
//   	var nextDiv = [];
//   	for(var j=0; j<nextData[0].length; j++){
//   		var newNode = document.createElement('div');
//   		newNode.className = 'none';
//   		newNode.style.top = (i*20) + 'px';
//   		newNode.style.left = (j*20) + 'px';
//   		document.getElementById('next').appendChild(newNode);
//   		nextDiv.push(newNode);
//   	}
//   	nextDivs.push(nextDiv);
//   }
// }
// var refreshGame = function() {//根据gameData数组里面的数据去改变gameDivs数组里面的class
// 	for(var i=0; i<gameData.length; i++) {
// 		for(var j=0; j<gameData[0].length; j++) {
// 			if(gameData[i][j] === 0) {
// 				gameDivs[i][j].className = 'none';
// 			}else if(gameData[i][j] === 1) {
// 				gameDivs[i][j].className = 'done';
// 			}else if(gameData[i][j] === 2) {
// 				gameDivs[i][j].className = 'current';
// 			}
// 		}
// 	}
// }
// var refreshNext = function() {//根据gameData数组里面的数据去改变gameDivs数组里面的class
// 	for(var i=0; i<nextData.length; i++) {
// 		for(var j=0; j<nextData[0].length; j++) {
// 			if(nextData[i][j] === 0) {
// 				nextDivs[i][j].className = 'none';
// 			}else if(nextData[i][j] === 1) {
// 				nextDivs[i][j].className = 'done';
// 			}else if(nextData[i][j] === 2) {
// 				nextDivs[i][j].className = 'current';
// 			}
// 		}
// 	}
// }
// initGame();
// initNext();
// refreshGame();
// refreshNext();
var local = new Local();
local.start();