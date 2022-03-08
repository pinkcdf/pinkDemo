import * as PIXI from "pixi.js";

export function drawPolygon(color, app, pixi) {
    clearEvent()
    let canMove = false
    let start = {x: 0, y: 0}
    let end = {x: 0, y: 0}
    let isFirst = true
    let moveX
    let moveY

    function whenMouseDown(e) {
        if (app.mode !== 'move') return
        start.x = e.offsetX
        start.y = e.offsetY
        canMove = true
    }

    function whenMouseUp(e) {
        if (app.mode !== 'move') return
        canMove = false
        end.x = moveX
        end.y = moveY
    }

    function mouseMove(e) {
        if (app.mode !== 'move') return
        if (!canMove) return;
        moveX = e.offsetX - start.x + end.x
        moveY = e.offsetY - start.y + end.y
        app.container.position.set(moveX, moveY)
        console.log(end.x, end.y)
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
