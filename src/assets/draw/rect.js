import * as PIXI from "pixi.js";

export function drawPolygon(color,app,pixi){
    const rectLine = new PIXI.Graphics();
    rectLine.lineStyle(2,color)
    let canDraw = false
    let polygon = [0,0,0,0]

    function whenMouseDown(e){
        canDraw = true
        polygon[0] = e.offsetX
        polygon[1] = e.offsetY
    }
    function whenMouseUp(e){
        canDraw = false
        polygon = [0,0,0,0]
    }
    function mouseMove(e){
        if (!canDraw)return
        rectLine.clear()
        rectLine.lineStyle(2,color)
        polygon[2] = e.offsetX
        polygon[3] = e.offsetY
        rectLine.drawRect(polygon[0],polygon[1],polygon[2]-polygon[0],polygon[3]-polygon[1]);
        console.log(e.offsetX,polygon)
        rectLine.endFill();
        app.pixi.stage.addChild(rectLine);
    }

    pixi.addEventListener('mousedown',whenMouseDown)
    pixi.addEventListener('mouseup',whenMouseUp)
    pixi.addEventListener('mousemove',mouseMove)
}