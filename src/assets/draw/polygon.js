import * as PIXI from "pixi.js";

export function drawPolygon(color,app,pixi){
  const borderline = new PIXI.Graphics();
  const polygonLine = new PIXI.Graphics();
  const line = new PIXI.Graphics();
  let canDraw = false
  let polygon = []
  borderline.lineStyle(2,color)
  line.lineStyle(2,color)
  polygonLine.lineStyle(2, color)

  function whenMouseDown(){
    canDraw = true
  }
  function mouseMove(e){
    if (!canDraw) return
    borderline.clear()
    borderline.lineStyle(2,color)
    borderline.moveTo(polygon[polygon.length-2], polygon[polygon.length-1]);//x,y 开始
    borderline.lineTo(e.offsetX,e.offsetY);
    app.pixi.stage.addChild(borderline);
  }
  function whenMouseUp(e){
    console.log(e.offsetX,e.offsetY);
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
    polygonLine.drawPolygon(polygon)
    app.pixi.stage.addChild(polygonLine);
    app.getPoints(polygon)
    polygon = []
    canDraw = false
  }

  function drawLine(){
    line.moveTo(polygon[polygon.length-4],polygon[polygon.length-3])
    line.lineTo(polygon[polygon.length-2],polygon[polygon.length-1])
    app.pixi.stage.addChild(line);
  }



  pixi.addEventListener('mousedown',whenMouseDown)
  pixi.addEventListener('mouseup',whenMouseUp)
  pixi.addEventListener('mousemove',mouseMove)
}