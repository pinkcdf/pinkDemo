<template>
  <div style="width: 100%;height: 100%">
    <div id="tool">
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

    }
  },
  mounted() {
    console.log(this.$refs.pixi)
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
      if (this.clearMode !== ''){
        require(`../assets/draw/${this.clearMode}`).clearDraw('0xFFFFFF')
        this.clearMode = ''
      }
    },

    getPoints(val) {
      console.log(this.container)
    },

    loadImg() {
      this.pixi.loader.add(this.img).load(() => {
        this.sprite = new PIXI.Sprite(this.pixi.loader.resources[this.img].texture)
        this.container.position.set(this.$refs.pixi.clientWidth / 2 - this.sprite.width / 2, this.$refs.pixi.clientHeight / 2 - this.sprite.height / 2)
        this.move.x = this.$refs.pixi.clientWidth / 2 - this.sprite.width / 2
        this.move.y = this.$refs.pixi.clientHeight / 2 - this.sprite.height / 2
        console.log(this.move)
        this.sprite.interactive = true//响应交互
        this.sprite.buttonMode = true
        this.container.addChild(this.sprite)
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
    clearPolygonLine() {
      require(`../assets/draw/polygon`).clearPolygonLine('0xFFFFFF')
    },
    clearRectLine() {
      require(`../assets/draw/rect`).clearRectLineDraw('0xFFFFFF')
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
  width: 100%;
  background-color: #070000;
  border-bottom: #888888 solid 1px;
  box-sizing: border-box;
  padding: 4px 4px;
  display: flex;
}

.clear{
  margin-left: 10px;
  border-left: #f5eded solid 1px;
  padding:0 10px;
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
  border-radius: 0;
}
</style>