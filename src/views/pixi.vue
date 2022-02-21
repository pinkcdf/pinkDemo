<template>
  <div id="app">
    <div id="pixi" style="z-index:-1;" @mousedown="beforeMove" @mouseup="moving"></div>
    <button @click="scale">缩小</button>
    <button @click="back">还原</button>
    <button @click="big">放大</button>
    <button @click="del">删除精灵</button>
    <button @click="add">精灵</button>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";

export default {
  name: "pixi",
  data() {
    return {
      pixi: null,
      pic:null,
      // info:{name:'bunny',url:require("@/assets/img/business-3d-girl-with-phone-1.png")},
      info:{name:'bunny',url:require("@/assets/img/goutou.gif")},
      zoom:1,
      movex:0,
      movey:0,
      movex2:0,
      movey2:0,
    };
  },
  mounted() {
    this.pixi = new PIXI.Application({
      width: 1000,
      height: 600,
      backgroundColor: 0xEF6644
    });
    this.initState();
  },
  methods: {
    initState() {
      document.getElementById("pixi").appendChild(this.pixi.view);
      this.add()
    },
    add(){
      this.pixi.loader.add(this.info).load((loader, resources) => {
        let bunny = new PIXI.Sprite(resources.bunny.texture);

        bunny.x = this.pixi.renderer.width/2;
        bunny.y = this.pixi.renderer.height/2;

        bunny.width = 100
        bunny.height = 80

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        this.pixi.stage.addChild(bunny);

        this.pixi.interactive = true

        // this.pixi.ticker.add(() => {
        //   bunny.rotation += 0.01;
        // });
        this.pic = bunny
      });
    },
    scale(){
      this.zoom = this.zoom - 0.1
      this.pic.scale.set(this.zoom,this.zoom)
    },
    back(){
      this.pic.scale.set(1,1)
      this.zoom = 1
    },
    big(){
      this.zoom = this.zoom + 0.1
      this.pic.scale.set(this.zoom,this.zoom)
    },
    beforeMove(e){
      this.movex = e.offsetX
      this.movey = e.offsetY
    },
    moving(e){
      this.movex2 = e.offsetX
      this.movey2 = e.offsetY
      let x = this.movex2 - this.movex
      let y = this.movey2 - this.movey
      console.log( this.movey2 , this.movey);
      console.log(x,y);
      if (Math.abs(this.movex2 - this.movex) > 10){
        this.pic.position.set(this.pixi.renderer.width/2+x, this.pixi.renderer.height/2+y)
        console.log(this.pixi.renderer.width/2+x, this.pixi.renderer.height/2+y);
        this.pic.x =this.pixi.renderer.width/2+x
        this.pic.y = this.pixi.renderer.height/2+y
      }
    },
    doSomething(){
      let rectangle = new PIXI.Graphics();
      rectangle.lineStyle(4, 0xFF3300, 1);
      rectangle.beginFill(0x66CCFF);
      rectangle.drawRect(0, 0, 64, 64);
      rectangle.endFill();
      rectangle.x = 170;
      rectangle.y = 170;
      this.pixi.stage.addChild(rectangle);
    },
    del(){
      this.pixi.stage.removeChild(this.pic)
      this.pic = null
    }
  }
};
</script>

<style scoped>
#pixi {
  /*border: saddlebrown solid 1px;*/
}
</style>