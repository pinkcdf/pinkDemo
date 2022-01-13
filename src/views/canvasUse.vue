<template>
<div>
  <canvas id="canvas" ref="myCanvas" :width="width" :height="height" />
</div>
</template>

<script>
export default {
  name: "open",
  data() {
    return {
      width: 400,
      height: 200,
      ctx: '',
    }
  },
  mounted(){
    const canvas = this.$refs.myCanvas;
    this.ctx = canvas.getContext("2d");//创建画布并挂在ctx上
  },
//绘制内容前准备步骤
  methods:{
    draw() {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, 10000, 10000); // 清空之前的内容
      this.ctx.strokeStyle = '#c40b10'; //颜色
      this.ctx.lineWidth = 1; // 线宽
    },
  },

}
</script>

<style scoped>
#canvas{
  background-color: black;
}
</style>