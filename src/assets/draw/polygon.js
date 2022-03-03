import * as PIXI from "pixi.js";

export function drawPolygon(color = '0xEF6644',app,pixi){
  const borderline = new PIXI.Graphics();
  const polygonLine = new PIXI.Graphics();
  const line = new PIXI.Graphics();
  let canDraw = false
  borderline.lineStyle(2,color,0.5)
  line.lineStyle(2,color,0.5)
  polygonLine.lineStyle(2, color, 0.5)

  function whenMouseDown(){
    canDraw = true
  }
  function whenMouseUp(e){
    console.log(e.offsetX,e.offsetY);
    app.polygon.push(e.offsetX,e.offsetY)
    console.log(this.polygon);
    if (Math.abs(e.offsetX - app.polygon[0])<= 10 &&  Math.abs(e.offsetY - app.polygon[1])<= 10 &&  app.polygon.length >4){
      app.polygon[app.polygon.length-2] = app.polygon[0]
      app.polygon[app.polygon.length-1] = app.polygon[1]
      app.canDraw = false
      drawPolygonLine()
    }
    if (app.polygon.length > 2){
      drawLine()
    }
  }
  function drawPolygonLine(){
    app.pixi.stage.removeChild(borderline)
    app.pixi.stage.removeChild(line)
    polygonLine.drawPolygon(this.polygon)
    app.pixi.stage.addChild(polygonLine);
    app.polygon = []
    app.canDraw = false
  }
  function mouseMove(e){
    if (canDraw) return
    console.log(app.polygon);
    borderline.clear()
    borderline.lineStyle(2,0xEF6644,0.5)
    borderline.moveTo(app.polygon[app.polygon.length-2], app.polygon[app.polygon.length-1]);//x,y 开始
    borderline.lineTo(e.offsetX,e.offsetY);
    app.pixi.stage.addChild(borderline);
  }
  function drawLine(){
    line.moveTo(app.polygon[app.polygon.length-4],app.polygon[app.polygon.length-3])
    line.lineTo(app.polygon[app.polygon.length-2],app.polygon[app.polygon.length-1])
    app.pixi.stage.addChild(line);
  }


  pixi.addEventListener('mousedown',whenMouseDown)
  pixi.addEventListener('mouseup',whenMouseUp)
  pixi.addEventListener('mousemove',mouseMove)
}