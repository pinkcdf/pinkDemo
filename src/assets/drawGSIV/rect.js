import * as PIXI from "pixi.js";

let haveOn = false //判断是否注册过on事件
const rectLine = new PIXI.Graphics()
const rectLineDraw = new PIXI.Graphics();
rectLine.lineStyle(1, 0xffffff)
rectLineDraw.lineStyle(1, 0xffffff)
let rect = [0,0,0,0]
let canDraw = false

let downPoint = [0,0]
let upPoint = [0,0]


export function init(app, pixi) {
  clearEvent()
  function mousedown(event) {
    if (app.mode !== 'rect') return
    canDraw = true
    const point = event.data.getLocalPosition(app.sprite);
    rect[0] = point.x
    rect[1] = point.y


  }

  function mouseup(event) {
    if (app.mode !== 'rect') return
    canDraw = false
    const point = event.data.getLocalPosition(app.sprite);
    if (point.x === rect[0] && point.y === rect[1]) return;
    app.container.removeChild(rectLine);
    rectLineDraw.drawRect(...rect)
    rectLineDraw.endFill();
    app.container.addChild(rectLineDraw);
    console.log(rect)
  }

  function mousemove(event) {
    if (app.mode !== 'rect') return
    if (canDraw !== true) return
    const point = event.data.getLocalPosition(app.sprite);
    rectLine.clear()
    rectLine.lineStyle(1, 0xffffff)
    rect[2] = point.x - rect[0]
    rect[3] = point.y - rect[1]
    rectLine.drawRect(...rect)
    rectLine.endFill();
    app.container.addChild(rectLine);
  }


  function mouseMove() {
    if (haveOn === true) return
    if (app.sprite === null) return;
    app.sprite
        .on('mousedown', mousedown)
        .on('mouseup', mouseup)
        .on('mousemove', mousemove)
    haveOn = true
  }


  function clearEvent() {
    pixi.removeEventListener('mousemove', mouseMove)
  }

  pixi.addEventListener('mousemove', mouseMove)
}

export function clearAllRectLine(app) {
  app.container.removeChild(rectLine);
  rectLine.clear()
  rectLineDraw.clear()
  rectLine.lineStyle(1, 0xffffff)
  rectLineDraw.lineStyle(1, 0xffffff)
}

export function resetRectOn(){
  haveOn = false
}

