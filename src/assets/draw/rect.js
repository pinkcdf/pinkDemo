import * as PIXI from "pixi.js";

const rectLine = new PIXI.Graphics();
const rectLineDraw = new PIXI.Graphics();

export function clearDraw(color) {
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
        polygon[0] = e.offsetX
        polygon[1] = e.offsetY
    }

    function whenMouseUp(e) {
        if (app.mode !== 'rect') return
        if (polygon[0] === e.offsetX && polygon[1] === e.offsetY) {
            canDraw = false
            return;
        }
        rectLineDraw.drawRect(countPoint(polygon[0]), countPoint(polygon[1]), countPoint(polygon[2] - polygon[0]), countPoint(polygon[3] - polygon[1]));
        rectLineDraw.endFill();
        console.log(countPoint(polygon[0]), countPoint(polygon[1]), countPoint(polygon[2] - polygon[0]), countPoint(polygon[3] - polygon[1]))
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
        rectLine.drawRect(countPoint(polygon[0]), countPoint(polygon[1]), countPoint(polygon[2] - polygon[0]), countPoint(polygon[3] - polygon[1]))
        rectLine.endFill();
        app.container.addChild(rectLine)
        app.pixi.stage.addChild(app.container);
    }

    function countPoint(val){
        return (val - app.move.x) / app.zoom
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
