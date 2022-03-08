<template>
  <div>
<!--    <div @click="changPosition"> 111</div>-->
    <el-radio-group @change="changeMode" v-model="mode">
      <el-radio-button label="move">移动</el-radio-button>
      <el-radio-button label="polygon">多边形</el-radio-button>
      <el-radio-button label="rect">矩形</el-radio-button>
    </el-radio-group>
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
      mode: '',
      img: require('../assets/img/people.png'),
      sprite: null,
      zoom: 1,
      move:{x:0,y:0}

    }
  },
  mounted() {
    console.log(this.$refs.pixi)
    this.pixi = new PIXI.Application({
      width: this.$refs.pixi.clientWidth,
      height: this.$refs.pixi.clientHeight,
      backgroundColor: 0x000000,
      resolution:1,
    });
    this.container = new PIXI.Container();
    document.getElementById("pixi").appendChild(this.pixi.view)
    window.onresize = () => {
      this.changeWH()
    }
    this.loadImg()
    this.$refs.pixi.addEventListener('wheel',this.eventWheel)
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
      if (e.deltaY > 0 && this.zoom > 0.1) {
        this.zoom = this.zoom - 0.02
        this.changeZoom()
      } else if(e.deltaY < 0 && this.zoom < 1.9) {
        this.zoom = this.zoom + 0.02
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
  height: 500px;
  overflow: hidden;
}
</style>