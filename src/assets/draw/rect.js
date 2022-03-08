import * as PIXI from "pixi.js";

export function drawPolygon(color, app, pixi) {
    clearEvent()
    const rectLine = new PIXI.Graphics();
    const rectLineDraw = new PIXI.Graphics();
    rectLine.lineStyle(2, color)
    rectLineDraw.lineStyle(2, color)
    let canDraw = false
    let polygon = [0, 0, 0, 0]

    function whenMouseDown(e) {
        if (app.mode !== 'rect') return
        canDraw = true
        polygon[0] = e.offsetX
        polygon[1] = e.offsetY
    }

    function whenMouseUp(e) {
        if (app.mode !== 'rect') return
        rectLineDraw.drawRect(polygon[0], polygon[1], polygon[2] - polygon[0], polygon[3] - polygon[1]);
        rectLineDraw.endFill();
        app.container.addChild(rectLineDraw)
        app.pixi.stage.addChild(app.container);
        canDraw = false
        polygon = [0, 0, 0, 0]
        rectLine.clear()
    }

    function mouseMove(e) {
        console.log(1111)
        if (app.mode !== 'rect') return
        if (!canDraw) return
        rectLine.clear()
        rectLine.lineStyle(2, color)
        polygon[2] = e.offsetX
        polygon[3] = e.offsetY
        rectLine.drawRect(polygon[0], polygon[1], polygon[2] - polygon[0], polygon[3] - polygon[1])
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
