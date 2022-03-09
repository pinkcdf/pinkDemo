<template>
  <div style="width: 100%;height: 100%">
    <div style="width: 100%;background-color: #070000;border-bottom: #888888 solid 1px;box-sizing: border-box;padding: 4px 4px">
      <el-radio-group @change="changeMode" v-model="mode" size="mini" fill="white" text-color="black">
        <el-radio-button label="move">移动</el-radio-button>
        <el-radio-button label="polygon">多边形</el-radio-button>
        <el-radio-button label="rect">矩形</el-radio-button>
      </el-radio-group>
    </div>

    <div ref="pixi" id="pixi"></div>

  </div>
</template>

<script>
import * as PIXI from "pixi.js";

export default {
  name: "pixiDraw",
  data() {
    return {
      pixi: null,
      container: null,
      canDraw: false,
      polygon: [1],
      mode: 'move',
      img: require('../assets/img/people.png'),
      sprite: null,
      zoom: 1,
      move: {x: 0, y: 0}

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
    this.changeMode()
  },

  methods: {

    changeWH() {
      this.pixi.renderer.autoResize = true;
      this.pixi.renderer.resize(this.$refs.pixi.clientWidth, this.$refs.pixi.clientHeight);
    },

    changeMode() {
      require(`../assets/draw/${this.mode}`).drawPolygon('0xFFFFFF', this, this.$refs.pixi)
    },

    getPoints(val) {
      this.polygon = val
    },

    loadImg() {
      this.pixi.loader.add(this.img).load(() => {
        this.sprite = new PIXI.Sprite(this.pixi.loader.resources[this.img].texture)
        this.container.addChild(this.sprite)
        this.pixi.stage.addChild(this.container)
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
/deep/ .el-radio-button .el-radio-button__inner{
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}
/deep/.el-radio-button:first-child .el-radio-button__inner{
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}
/deep/.el-radio-button:last-child .el-radio-button__inner{
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}
</style>