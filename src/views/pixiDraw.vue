<template>
  <div style="width: 100%;height: 100%">

    <div id="tool">
      <div style="display: flex">
        <el-radio-group @change="changeMode" v-model="mode" size="mini" fill="white" text-color="black">
          <el-radio-button label="move">移动</el-radio-button>
          <el-radio-button label="polygon">多边形</el-radio-button>
          <el-radio-button label="rect">矩形</el-radio-button>
        </el-radio-group>
        <div class="clear">
          <el-radio-group @change="clear" v-model="clearMode" size="mini" fill="white" text-color="black">
            <el-radio-button label="polygon">清除多边形</el-radio-button>
            <el-radio-button label="rect">清除矩形</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <el-button size="mini" type="info" @click="downLoadImg">下载</el-button>
    </div>
<!--    <button @click="drawPolygonOnline"> 123</button>-->
<!--    <button @click="drawRectOnline"> 123</button>-->

    <div ref="pixi" id="pixi"></div>

  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import {clearDraw, clearLine} from "../assets/draw/polygon";

export default {
  name: "pixiDraw",
  data() {
    return {
      pixi: null,
      container: null,
      canDraw: false,
      mode: 'move',
      clearMode: '',
      img: require('../assets/img/people.png'),
      sprite: null,
      rectLineDraw: null,
      zoom: 1,
      move: {x: 0, y: 0},
      //测试
      polygonArr:[[181, 223, 257, 223, 225, 328.5, 151.5, 330.5, 181, 223],[147, 81, 227, 82, 216, 115, 140, 114, 147, 81]],
      rectArr:[[173, 219, 75, 113],[21 ,58 ,208 ,64]]
    }
  },
  mounted() {
    this.pixi = new PIXI.Application({
      width: this.$refs.pixi.clientWidth,
      height: this.$refs.pixi.clientHeight,
      backgroundColor: 0x000000,
      resolution: 1,
      autoDensity: true,
      antialias: true
    });
    this.container = new PIXI.Container();

    document.getElementById("pixi").appendChild(this.pixi.view)
    window.onresize = () => {
      this.changeWH()
    }
    this.loadImg()
    this.$refs.pixi.addEventListener('wheel', this.eventWheel)
  },

  methods: {

    changeWH() {
      this.pixi.renderer.autoResize = true;
      this.pixi.renderer.resize(this.$refs.pixi.clientWidth, this.$refs.pixi.clientHeight);
    },

    changeMode() {
      require(`../assets/draw/${this.mode}`).drawPolygon('0xFFFFFF', this, this.$refs.pixi)
    },

    clear() {
      if (this.clearMode !== '') {
        require(`../assets/draw/${this.clearMode}`).clearDraw('0xFFFFFF')
        this.clearMode = ''
      }
    },

    getPoints(val) {
      console.log(val)
    },

    loadImg() {
      this.pixi.loader.add(this.img).load(() => {
        this.sprite = new PIXI.Sprite(this.pixi.loader.resources[this.img].texture)
        this.container.position.set(this.$refs.pixi.clientWidth / 2 - this.sprite.width / 2, this.$refs.pixi.clientHeight / 2 - this.sprite.height / 2)
        this.move.x = this.$refs.pixi.clientWidth / 2 - this.sprite.width / 2
        this.move.y = this.$refs.pixi.clientHeight / 2 - this.sprite.height / 2

        // this.sprite.interactive = true//响应交互
        // this.sprite.buttonMode = true

        this.container.addChild(this.sprite)
        console.log(this.sprite.x)
        this.pixi.stage.addChild(this.container)
        this.changeMode()
      })
    },

    changeZoom() {
      this.container.scale.set(this.zoom, this.zoom)
    },

    eventWheel(e) {
      if (e.deltaY > 0) {
        this.zoom = this.zoom - 0.05
        this.changeZoom()
      } else if (e.deltaY < 0) {
        this.zoom = this.zoom + 0.05
        this.changeZoom()
      }
      if (this.zoom > 2) {
        this.zoom = 2
        this.changeZoom()
      }
      if (this.zoom < 0.5) {
        this.zoom = 0.5
        this.changeZoom()
      }
    },

    drawPolygonOnline() {
      const polygonLineDraw = new PIXI.Graphics();
      polygonLineDraw.lineStyle(2, 0xffffff)
      for (let i in this.polygonArr){
        polygonLineDraw.drawPolygon(...this.polygonArr[i]);
        this.container.addChild(polygonLineDraw)
      }
      this.pixi.stage.addChild( this.container)
    },

    drawRectOnline() {
      const rectLineDraw = new PIXI.Graphics();
      rectLineDraw.lineStyle(2, 0xffffff)
      for (let i in this.rectArr){
        rectLineDraw.drawRect(...this.rectArr[i]);
        rectLineDraw.endFill();
        this.container.addChild(rectLineDraw)
      }
      this.pixi.stage.addChild( this.container)
    },

    downLoadImg(){
      const image = this.pixi.renderer.plugins.extract.base64(this.pixi.stage);
      console.log(image)
      if (window.navigator.msSaveOrOpenBlob) {
        let bstr = atob(image.split(',')[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, 'download' + '.' + 'png');
      } else {
        const a = document.createElement('a');
        a.href = image;
        a.setAttribute('download', 'download');
        a.click();
      }
    }
  }
}
</script>

<style scoped>
#pixi {
  background-color: #888888;
  width: 100%;
  height: calc(100% - 100px);
  overflow: hidden;
}

#tool {
  position: static;
  width: 100%;
  background-color: #070000;
  border-bottom: #888888 solid 1px;
  box-sizing: border-box;
  padding: 4px 4px;
  display: flex;
  justify-content: space-between;
}

.clear {
  margin-left: 10px;
  border-left: #cec6c6 solid 1px;
  padding: 0 10px;
}

/deep/ .el-radio-button .el-radio-button__inner {
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}

/deep/ .el-radio-button:first-child .el-radio-button__inner {
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}

/deep/ .el-radio-button:last-child .el-radio-button__inner {
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}

/deep/ .el-button{
  border: none;
  background-color: #282626;
  color: #888888;
}

/deep/ .el-button--mini {
  padding: 0 6px;
}
</style>