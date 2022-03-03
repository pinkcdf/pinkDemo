<template>
  <div>
    <el-radio-group @change="changeMode" v-model="mode">
      <el-radio-button label="polygon"></el-radio-button>
      <el-radio-button label="rect"></el-radio-button>
    </el-radio-group>
    <div ref="pixi" id="pixi" style="z-index:-1;background-color: #888888"></div>

  </div>
</template>

<script>
import * as PIXI from "pixi.js";

export default {
  name: "pixiDraw",
  data() {
    return {
      pixi: null,
      canDraw: false,
      polygon: [1],
      mode:'polygon'
    }
  },
  mounted() {
    this.pixi = new PIXI.Application({
      width: 700,
      height: 700,
      backgroundColor: 0x000000
    });
    document.getElementById("pixi").appendChild(this.pixi.view);
  },
  methods: {
    changeMode(){
      console.log(`../assets/draw/${this.mode}`)
      require(`../assets/draw/${this.mode}`).drawPolygon('0xFFFFFF',this,this.$refs.pixi)
    },
    getPoints(val){
      this.polygon = val
      console.log(this.polygon)
    }
  }
}
</script>

<style scoped>

</style>