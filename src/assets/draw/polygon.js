// import * as PIXI from "pixi.js";
//
// const line = new PIXI.Graphics()
// const borderline = new PIXI.Graphics()
// const polygonLine = new PIXI.Graphics()
// const polygonChoseLine = new PIXI.Graphics()
//
// let move = false
// let polygon = []
// let keyDownPoint = []
// let keyUpPoint = []
//
// export function clearDraw(color) {
//     polygonLine.clear()
//     polygonLine.lineStyle(2, color)
//     borderline.clear()
//     borderline.lineStyle(2, color)
//     line.clear()
//     line.lineStyle(2, color)
//     polygonChoseLine.clear()
//     polygonChoseLine.lineStyle(2, 0x15EF09)
// }
//
// //重新渲染图形
// export function polygonLineDraw(app,polygonArr,imgW,imgH,color){
//     app.pixi.stage.removeChild(borderline)
//     app.pixi.stage.removeChild(line)
//     app.pixi.stage.removeChild(polygonLine)
//     app.pixi.stage.removeChild(polygonChoseLine)
//     clearDraw(color)
//     for (let k in polygonArr){
//         for (let i in polygonArr[k]) {
//             if (i % 2 === 0) {
//                 polygonArr[k][i] = polygonArr[k][i] - imgW / 2
//             } else {
//                 polygonArr[k][i] = polygonArr[k][i] - imgH / 2
//             }
//         }
//         polygonLine.drawPolygon(polygonArr[k])
//         app.container.addChild(polygonLine)
//         app.pixi.stage.addChild(app.container);
//     }
// }
//
// //高亮选中已存在的图形
// export function polygonChoseLineDraw(app,polygonArr,imgW,imgH,){
//     app.pixi.stage.removeChild(polygonChoseLine)
//     polygonChoseLine.clear()
//     polygonChoseLine.lineStyle(2, 0x15EF09)
//         for (let i in polygonArr) {
//             if (i % 2 === 0) {
//                 polygonArr[i] = polygonArr[i] - imgW / 2
//             } else {
//                 polygonArr[i] = polygonArr[i] - imgH / 2
//             }
//
//         polygonChoseLine.drawPolygon(polygonArr)
//         app.container.addChild(polygonChoseLine)
//         app.pixi.stage.addChild(app.container);
//     }
// }
//
// export function drawPolygon(color, app, pixi) {
//     let canMove = false
//     let start = {x: 0, y: 0}
//     let end = {x: 0, y: 0}
//     let moveX = app.move.x
//     let moveY = app.move.y
//     end.x = app.move.x
//     end.y = app.move.y
//
//     let canDraw = false
//
//     clearEvent()
//     borderline.lineStyle(2, color)
//     line.lineStyle(2, color)
//     polygonLine.lineStyle(2, color)
//
//     function whenMouseDown(e) {
//         if (move === true) {
//             start.x = e.offsetX
//             start.y = e.offsetY
//             keyDownPoint[0] = e.offsetX
//             keyDownPoint[1] = e.offsetY
//             canMove = true
//         } else {
//             //启用就只可以显示一个图形
//             // if (polygon.length === 0) {
//                 // if (app.container.children.length > 2) {
//                 //   app.container.removeChildren(1)
//                 // }
//                 // app.polygonArr = []
//                 // polygonLine.clear()
//                 // polygonLine.lineStyle(2, color)
//             // }
//             if (e.button === 2) return
//             canDraw = true
//         }
//     }
//
//     function mouseMove(e) {
//         if (move === true) {
//             if (!canMove) return;
//             moveX = e.offsetX - start.x + end.x
//             moveY = e.offsetY - start.y + end.y
//             app.container.position.set(moveX, moveY)
//         } else {
//             if (e.button === 2) return
//             if (!canDraw) return
//             borderline.clear()
//             borderline.lineStyle(2, color)
//             borderline.moveTo(polygon[polygon.length - 2], polygon[polygon.length - 1]);//x,y 开始
//             borderline.lineTo(e.offsetX, e.offsetY);
//             app.pixi.stage.addChild(borderline);
//         }
//     }
//
//     function whenMouseUp(e) {
//         if (move === true) {
//             canMove = false
//             end.x = moveX
//             end.y = moveY
//             keyUpPoint[0] = e.offsetX
//             keyUpPoint[1] = e.offsetY
//             app.move.x = end.x
//             app.move.y = end.y
//             if (keyDownPoint[0] - keyUpPoint[0] <= 3 && keyDownPoint[1] - keyUpPoint[1] <= 3){
//                 keyDownPoint[0] = (keyDownPoint[0] - app.move.x) / app.zoom
//                 keyDownPoint[1] = (keyDownPoint[1] - app.move.y) / app.zoom
//                 app.chosePolygon(keyDownPoint)
//
//             }
//         } else {
//             polygon.push(e.offsetX, e.offsetY)
//             if (e.button === 2 && polygon.length > 6) {
//                 polygon[polygon.length - 2] = polygon[0]
//                 polygon[polygon.length - 1] = polygon[1]
//                 canDraw = false
//                 drawPolygonLine()
//             } else if (e.button === 0 && Math.abs(e.offsetX - polygon[0]) <= 10 && Math.abs(e.offsetY - polygon[1]) <= 10 && polygon.length > 5) {
//                 polygon[polygon.length - 2] = polygon[0]
//                 polygon[polygon.length - 1] = polygon[1]
//                 canDraw = false
//                 drawPolygonLine()
//             }
//             if (polygon.length > 2) {
//                 drawLine()
//             }
//         }
//     }
//
//     function drawPolygonLine() {
//         app.pixi.stage.removeChild(borderline)
//         app.pixi.stage.removeChild(line)
//         polygon = polygon.splice(0,polygon.length-2)
//         for (let i in polygon) {
//             if (i % 2 === 0) {
//                 polygon[i] = (polygon[i] - app.move.x) / app.zoom
//             } else {
//                 polygon[i] = (polygon[i] - app.move.y) / app.zoom
//             }
//         }
//         polygonLine.drawPolygon(polygon)
//         console.log(polygon)
//         app.container.addChild(polygonLine)
//         app.pixi.stage.addChild(app.container);
//         app.getPoints(polygon)
//         line.clear()
//         line.lineStyle(2, color)
//         polygon = []
//         canDraw = false
//     }
//
//     function drawLine() {
//         line.moveTo(polygon[polygon.length - 4], polygon[polygon.length - 3])
//         line.lineTo(polygon[polygon.length - 2], polygon[polygon.length - 1])
//         app.pixi.stage.addChild(line);
//     }
//
//     function keydown(e) {
//         if (e.keyCode === 32) {
//             move = true
//         }
//     }
//
//     function keyup(e) {
//         if (e.keyCode === 32) {
//             move = false
//         }
//     }
//
//     function clearEvent() {
//         pixi.removeEventListener('mousedown', whenMouseDown)
//         pixi.removeEventListener('mouseup', whenMouseUp)
//         pixi.removeEventListener('mousemove', mouseMove)
//         document.removeEventListener('keydown', keydown)
//         document.removeEventListener('keyup', keyup)
//     }
//
//     if (app.mode !== 'polygon') {
//         return
//     }
//     pixi.addEventListener('mousedown', whenMouseDown)
//     pixi.addEventListener('mouseup', whenMouseUp)
//     pixi.addEventListener('mousemove', mouseMove)
//     document.addEventListener('keydown', keydown)
//     document.addEventListener('keyup', keyup)
// }