import * as PIXI from "pixi.js";

let haveOn = false //判断是否注册过on事件
const line = new PIXI.Graphics()
const borderline = new PIXI.Graphics()
const polygonLine = new PIXI.Graphics()
const polygonChoseLine = new PIXI.Graphics()
polygonLine.lineStyle(1, 0xffffff)
polygonChoseLine.lineStyle(1, 0x15EF09)
borderline.lineStyle(1, 0xffffff)
line.lineStyle(1, 0xffffff)
let polygon = []

export function init(app, pixi) {
  clearEvent()

  function mousedown(event) {

  }

  function mouseup(event) {
    if (app.mode !== 'polygon') return
    const point = event.data.getLocalPosition(app.sprite);
    line.lineStyle(1, 0xffffff)
    if (point.x === polygon[polygon.length - 2] && point.y === polygon[polygon.length - 1]){

    }
    polygon.push(point.x, point.y)
    if (Math.abs(point.x - polygon[0]) <= 5 && Math.abs(point.y - polygon[1]) <= 5 && polygon.length > 5) {
      polygon[polygon.length - 2] = polygon[0]
      polygon[polygon.length - 1] = polygon[1]
      drawPolygonLine()
    }
    if (polygon.length > 2) {
      drawLine()
    }
  }

  function mousemove(event) {
    if (app.mode !== 'polygon') return
    const point = event.data.getLocalPosition(app.sprite);
    borderline.clear()
    borderline.lineStyle(1, 0xffffff)
    borderline.moveTo(polygon[polygon.length - 2], polygon[polygon.length - 1]);//x,y 开始
    borderline.lineTo(point.x, point.y);
    app.container.addChild(borderline);
  }

  function rightClick(event) {
    if (app.mode !== 'polygon') return
    const point = event.data.getLocalPosition(app.sprite);
    polygon.push(point.x, point.y)
    if (polygon.length > 6) {
      polygon[polygon.length - 2] = polygon[0]
      polygon[polygon.length - 1] = polygon[1]
      drawPolygonLine()
    } else {
      polygon = polygon.splice(0, polygon.length - 2)
    }
  }

  function drawLine() {
    line.moveTo(polygon[polygon.length - 4], polygon[polygon.length - 3])
    line.lineTo(polygon[polygon.length - 2], polygon[polygon.length - 1])
    app.container.addChild(line);
  }

  function drawPolygonLine() {
    app.container.removeChild(borderline)
    app.container.removeChild(line)
    polygon = polygon.splice(0, polygon.length - 2)
    polygonLine.drawPolygon(polygon)
    app.container.addChild(polygonLine)
    let points = JSON.stringify(polygon)
    app.getPolygonPoints(points)
    line.clear()
    line.lineStyle(1, 0xffffff)
    polygon = []
  }

  function registerOn() {
    if (haveOn === true) return
    if (app.sprite === null) return;
    app.sprite
        .on('mousedown', mousedown)
        .on('mouseup', mouseup)
        .on('mousemove', mousemove)
        .on('rightclick', rightClick);
    haveOn = true
  }


  function clearEvent() {
    pixi.removeEventListener('mousemove', registerOn)
  }

  pixi.addEventListener('mousemove', registerOn)
}

//重新渲染图形
export function polygonLineDraw(app, points,imgW,imgH) {
  let polygonArr = JSON.parse(points)
  clearAllPolygonLine(app)
  clearPolygonDraw(0xffffff)
  //修正中心点
  for (let k in polygonArr) {
    for (let i in polygonArr[k]) {
      if (i % 2 === 0) {
        polygonArr[k][i] = polygonArr[k][i] - imgW / 2
      } else {
        polygonArr[k][i] = polygonArr[k][i] - imgH / 2
      }
    }
    polygonLine.drawPolygon(polygonArr[k])
    app.container.addChild(polygonLine)
  }
}

//撤销
export function revoke(app, color) {
  if (polygon.length > 1) {
    polygon = polygon.splice(0, polygon.length - 2)
    borderline.clear()
    borderline.lineStyle(1, color)
    line.clear()
    line.lineStyle(1, color)

    for (let i = 0; i < polygon.length - 2; i = i + 2) {
      line.moveTo(polygon[i], polygon[i + 1])
      line.lineTo(polygon[i + 2], polygon[i + 3])
      app.container.addChild(line);
    }
    borderline.moveTo(polygon[polygon.length - 2], polygon[polygon.length - 1]);
  }
}

//高亮选中已存在的图形
export function polygonChoseLineDraw(app, polygonArr, imgW, imgH,) {
  app.container.removeChild(polygonChoseLine)
  polygonChoseLine.clear()
  polygonChoseLine.lineStyle(2, 0x15EF09)
  for (let i in polygonArr) {
    if (i % 2 === 0) {
      polygonArr[i] = polygonArr[i] - imgW / 2
    } else {
      polygonArr[i] = polygonArr[i] - imgH / 2
    }

    polygonChoseLine.drawPolygon(polygonArr)
    app.container.addChild(polygonChoseLine)
  }
}

export function clearAllPolygonLine(app){
  app.container.removeChild(borderline)
  app.container.removeChild(line)
  app.container.removeChild(polygonLine)
  clearPolygonDraw(0xffffff)
}

export function clearPolygonDraw(color) {
  polygonLine.clear()
  polygonLine.lineStyle(1, color)
  polygonChoseLine.clear()
  polygonChoseLine.lineStyle(1, 0x15EF09)
  borderline.clear()
  borderline.lineStyle(1, color)
  line.clear()
  line.lineStyle(1, color)
}

export function resetPolygonOn(){
  haveOn = false
}

