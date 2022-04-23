import {resetMoveOn} from "./move";
import {clearAllPolygonLine, resetPolygonOn} from "./polygon";
import {clearAllRectLine, resetRectOn} from "./rect";


//重新组册图片on事件
export function resetOn(){
  resetMoveOn()
  resetPolygonOn()
  resetRectOn()
}

//清空已经绘制的图形并且移除
export function clearAll(app){
  clearAllPolygonLine(app)
  clearAllRectLine(app)
}