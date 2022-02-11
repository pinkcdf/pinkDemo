<template>
  <div ref="box" class="box">
    <div class="tool">
      <button @click="tool = 1">直线</button>
      <button @click="tool = 2">矩形</button>
      <button @click="test">test</button>
    </div>
    <canvas id="canvas" ref="myCanvas" :width="width" :height="height"
            @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove" @mouseout="" />
    <div class="show" @mouseup="mouseup2" :style="showCss"></div>
  </div>
</template>

<script>
export default {
  name: "open",
  data() {
    return {
      tool:1,
      width: 400,
      height: 200,
      ctx: "",
      rang: [],
      showCss: {
        position: "absolute",
        left: "",
        top: "",
        border: "yellow solid 2px",
        width: "",
        height: "",
        drawDiv:false,
      }
    };
  },
  mounted() {
    let that = this;
    //创建画布并挂在ctx上
    const canvas = that.$refs.myCanvas;
    that.ctx = canvas.getContext("2d");
    // that.getSize();
    // //监控窗口变化
    // window.onresize = function() {
    //   that.getSize();
    // };
  },
//绘制内容前准备步骤
  methods: {
    beforeDraw() {
      this.ctx.beginPath();
      // this.ctx.clearRect(this.rang[0], this.rang[1], this.rang[2] - this.rang[0], this.rang[3] - this.rang[1]); // 清空之前的内容
      this.ctx.strokeStyle = "#c40b10"; //颜色
      this.ctx.lineWidth = 1; // 线宽
    },

    //绘制矩形
    drawRectangle() {
      this.beforeDraw();
      this.ctx.strokeRect(this.rang[0], this.rang[1], this.rang[2] - this.rang[0], this.rang[3] - this.rang[1]);
    },
    //绘制直线
    drawLine(){
      this.beforeDraw();
      this.ctx.moveTo(this.rang[0], this.rang[1]);
      this.ctx.lineTo(this.rang[2], this.rang[3]);
      this.ctx.closePath();
      this.ctx.stroke();
    },

    drawDiv() {
      this.showCss.width = this.rang[2] - this.rang[0] + "px";
      this.showCss.height = this.rang[3] - this.rang[1] + "px";
    },

    clearDiv() {
      this.showCss.drawDiv = false
      this.showCss.width = ''
      this.showCss.height = ''
      this.showCss.top = ''
      this.showCss.left = ''
    },

    getSize() {
      this.height = this.$refs.box.clientHeight;
      this.width = this.$refs.box.clientWidth - 40;
      console.log(this.width,this.height);
    },

    mousedown(e) {
      console.log(e.offsetX, e.offsetY);
      this.rang[0] = e.offsetX;
      this.rang[1] = e.offsetY;
      this.showCss.left = 40 + e.offsetX + "px";
      this.showCss.top = e.offsetY + "px";
      this.showCss.drawDiv = true
    },

    mousemove(e) {
      this.rang[2] = e.offsetX;
      this.rang[3] = e.offsetY;
      if ( this.showCss.drawDiv === true){
        this.drawDiv();
      }
    },

    mouseup(e) {
      console.log(e.offsetX, e.offsetY);
      this.rang[2] = e.offsetX;
      this.rang[3] = e.offsetY;
      // this.drawRectangle();
      // this.clearDiv()
    },
    mouseup2(e) {
      console.log(e.offsetX, e.offsetY);
      this.rang[2] = this.rang[0] + e.offsetX;
      this.rang[3] = this.rang[1] + e.offsetY;
      this.drawRectangle();
      this.clearDiv()
    },
  },

  beforeDestroy() {

  }

};
</script>

<style scoped>
.box {
  width: 600px;
  height: 700px;
  background-color: #070000;
  /*display: flex;*/
  /*position: relative;*/
  border: black solid 2px;
}

#canvas {
  background-color: #ffffff;
}

.tool {
  width: 40px;
  height: 100%;
  box-sizing: border-box;
}
</style>