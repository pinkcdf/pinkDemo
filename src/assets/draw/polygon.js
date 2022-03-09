import * as PIXI from "pixi.js";

export function drawPolygon(color,app,pixi){
  clearEvent()
  const borderline = new PIXI.Graphics();
  const polygonLine = new PIXI.Graphics();
  const line = new PIXI.Graphics();
  let canDraw = false
  let polygon = []
  borderline.lineStyle(2,color)
  line.lineStyle(2,color)
  polygonLine.lineStyle(2, color)

  function whenMouseDown(){
    if (app.mode !== 'polygon' ) return
    canDraw = true
  }
  function mouseMove(e){
    if (app.mode !== 'polygon' ) return
    if (!canDraw) return
    borderline.clear()
    borderline.lineStyle(2,color)
    borderline.moveTo(polygon[polygon.length-2], polygon[polygon.length-1]);//x,y 开始
    borderline.lineTo(e.offsetX,e.offsetY);
    app.pixi.stage.addChild(borderline);
  }
  function whenMouseUp(e){
    if (app.mode !== 'polygon' ) return
    polygon.push(e.offsetX,e.offsetY)
    if (Math.abs(e.offsetX - polygon[0])<= 10 &&  Math.abs(e.offsetY - polygon[1])<= 10 &&  polygon.length >4){
      polygon[polygon.length-2] = polygon[0]
      polygon[polygon.length-1] = polygon[1]
      canDraw = false
      drawPolygonLine()
    }
    if (polygon.length > 2){
      drawLine()
    }
  }
  function drawPolygonLine(){
    app.pixi.stage.removeChild(borderline)
    app.pixi.stage.removeChild(line)
    for (let i in polygon){
      if (i % 2 === 0){
        polygon[i] = (polygon[i] - app.move.x)/app.zoom
      }else {
        polygon[i] = (polygon[i] - app.move.y)/app.zoom
      }
    }
    polygonLine.drawPolygon(polygon)
    app.container.addChild(polygonLine)
    app.pixi.stage.addChild(app.container);
    app.getPoints(polygon)
    line.clear()
    line.lineStyle(2,color)
    polygon = []
    canDraw = false
  }

  function drawLine(){
    line.moveTo(polygon[polygon.length-4],polygon[polygon.length-3])
    line.lineTo(polygon[polygon.length-2],polygon[polygon.length-1])
    app.pixi.stage.addChild(line);
  }

  function clearEvent(){
    pixi.removeEventListener('mousedown',whenMouseDown)
    pixi.removeEventListener('mouseup',whenMouseUp)
    pixi.removeEventListener('mousemove',mouseMove)
  }

  pixi.addEventListener('mousedown',whenMouseDown)
  pixi.addEventListener('mouseup',whenMouseUp)
  pixi.addEventListener('mousemove',mouseMove)
}