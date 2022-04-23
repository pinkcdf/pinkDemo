let moveX = 0
let moveY = 0
let end = {x: 0, y: 0}
let downPoint = []
let upPoint = []
let haveOn = false //判断是否注册过on事件

export function setNowPosition(app) {
  moveX = app.move.x
  moveY = app.move.y
  end.x = app.move.x
  end.y = app.move.y
}

export function init(color, app, pixi) {
  clearEvent()
  let canMove = false
  let start = {x: 0, y: 0}
  moveX = app.move.x
  moveY = app.move.y
  console.log(end)

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
    app.move.x = end.x
    app.move.y = end.y
    if (downPoint[0] - e.offsetX <= 3 && downPoint[1] -  e.offsetY <= 3) {
      console.log(downPoint)
      app.chosePolygon(JSON.stringify(downPoint))
    }
  }

  function mouseMove(e) {
    registerOn()
    if (app.mode !== 'move') return
    if (!canMove) return;
    moveX = e.offsetX - start.x + end.x
    moveY = e.offsetY - start.y + end.y
    app.container.position.set(moveX, moveY)

  }

  function registerOn() {
    if (haveOn === true) return
    if (app.sprite === null) return;
    app.sprite
        .on('mousedown', clickDown)
        .on('mouseup', clickUp)
    haveOn = true
  }

  function clickDown(event) {
    if (app.mode !== 'move') return
    const point = event.data.getLocalPosition(app.sprite);
    upPoint[0] = point.x
    upPoint[1] = point.y
  }

  function clickUp(event) {
    if (app.mode !== 'move') return
    const point = event.data.getLocalPosition(app.sprite);
    downPoint[0] = point.x
    downPoint[1] = point.y
    if (upPoint[0] ===  downPoint[0] && upPoint[1] ===  downPoint[1]){
      app.chosePolygon(JSON.stringify(upPoint))
    }
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

export function resetMoveOn(){
  haveOn = false
}
