<template>
  <div>
    <div ref="pixi" id="pixi" style="z-index:-1;background-color: #888888"></div>
    <button @click="test">123</button>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";


// polygonLine.beginFill(0xffffff)
export default {
  name: "pixiDraw",
  data() {
    return {
      pixi: null,
      canDraw: false,
      polygon: [1],
    }
  },
  mounted() {
    this.pixi = new PIXI.Application({
      width: 700,
      height: 700,
      backgroundColor: 0x000000
    });
    document.getElementById("pixi").appendChild(this.pixi.view);
    require("../assets/draw/polygon").drawPolygon('0xEF6644',this,this.$refs.pixi)
  },
  methods: {
    whenMouseDown(){
      this.canDraw = true
    },
    whenMouseUp(e){
      this.polygon.push(e.offsetX,e.offsetY)
      console.log(this.polygon);
      if (Math.abs(e.offsetX - this.polygon[0])<= 10 &&  Math.abs(e.offsetY - this.polygon[1])<= 10 &&  this.polygon.length >4){
        this.polygon[this.polygon.length-2] = this.polygon[0]
        this.polygon[this.polygon.length-1] = this.polygon[1]
        this.canDraw = false
        this.drawPolygonLine()
      }
      if (this.polygon.length > 2){
        this.drawLine()
      }
    },
    mouseMove(e){
      if (!this.canDraw) return
      borderline.clear()
      borderline.lineStyle(2,0xEF6644,0.5)
      borderline.moveTo(this.polygon[this.polygon.length-2], this.polygon[this.polygon.length-1]);//x,y 开始
      borderline.lineTo(e.offsetX,e.offsetY);
      this.pixi.stage.addChild(borderline);

    },
    drawLine(){
      line.moveTo(this.polygon[this.polygon.length-4],this.polygon[this.polygon.length-3])
      line.lineTo(this.polygon[this.polygon.length-2],this.polygon[this.polygon.length-1])
      this.pixi.stage.addChild(line);
    },
    drawPolygonLine(){
      this.pixi.stage.removeChild(borderline)
      this.pixi.stage.removeChild(line)
      polygonLine.drawPolygon(this.polygon)
      this.pixi.stage.addChild(polygonLine);
      this.polygon = []
      this.canDraw = false
    },
    doubleClick(){
      this.polygon.push(this.polygon[0])
      this.polygon.push(this.polygon[1])
      this.drawPolygonLine()
    },
    test() {


    },
    hello(){
      console.log(this.polygon);
    }
  }
}
</script>

<style scoped>

</style>