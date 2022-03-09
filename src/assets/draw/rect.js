import * as PIXI from "pixi.js";

const rectLine = new PIXI.Graphics();
const rectLineDraw = new PIXI.Graphics();

export function clearDraw(color){
    rectLineDraw.clear()
    rectLine.lineStyle(2, color)
    rectLineDraw.lineStyle(2, color)
}

export function drawPolygon(color, app, pixi) {
    clearEvent()
    rectLine.lineStyle(2, color)
    rectLineDraw.lineStyle(2, color)
    let canDraw = false
    let polygon = [0, 0, 0, 0]

    function whenMouseDown(e) {
        if (app.mode !== 'rect') return
        canDraw = true
        console.log(app.zoom)
        polygon[0] = e.offsetX
        polygon[1] = e.offsetY
    }

    function whenMouseUp(e) {
        if (app.mode !== 'rect') return
        rectLineDraw.drawRect((polygon[0] - app.move.x)/app.zoom, (polygon[1] - app.move.y)/app.zoom, (polygon[2] - polygon[0])/app.zoom, (polygon[3] - polygon[1])/app.zoom);
        rectLineDraw.endFill();
        app.container.addChild(rectLineDraw)
        app.pixi.stage.addChild(app.container);
        canDraw = false
        polygon = [0, 0, 0, 0]
        rectLine.clear()
    }

    function mouseMove(e) {
        if (app.mode !== 'rect') return
        if (!canDraw) return
        rectLine.clear()
        rectLine.lineStyle(2, color)
        polygon[2] = e.offsetX
        polygon[3] = e.offsetY
        rectLine.drawRect((polygon[0] - app.move.x)/app.zoom, (polygon[1] - app.move.y)/app.zoom, (polygon[2] - polygon[0])/app.zoom, (polygon[3] - polygon[1])/app.zoom)
        rectLine.endFill();
        app.container.addChild(rectLine)
        app.pixi.stage.addChild(app.container);
    }

    function clearEvent() {
        pixi.removeEventListener('mousedown', whenMouseDown)
        pixi.removeEventListener('mouseup', whenMouseUp)
        pixi.removeEventListener('mousemove', mouseMove)
    }

    pixi.addEventListener('mousedown', whenMouseDown)
    pixi.addEventListener('mouseup', whenMouseUp)
    pixi.addEventListener('mousemove', mouseMove)
}
