<template>
  <div id="app">
    <div id="pixi" style="z-index:-1;" @mousedown="beforeMove" @mouseup="moving"></div>
    <button @click="add2">新人入场</button>
    <button @click="shout">mac喊麦</button>
    <button @click="remove">清空喊麦</button>
    <button @click="shoutSomeone">固定某人发言</button>
    <button @click="change">固定某人发言</button>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import picture from "@/assets/img/goutou.gif";
import soundBox from "@/assets/img/sound.png";

let img = PIXI.Texture.from(picture);
let soundBoxImg = PIXI.Texture.from(soundBox);

export default {
  name: "pixi",
  data() {
    return {
      pixi: null,
      pic: null,
      text: null,
      // info:{name:'bunny',url:require("@/assets/img/business-3d-girl-with-phone-1.png")},
      info: { name: "bunny", url: require("@/assets/img/goutou.gif") },
      zoom: 0.2,
      movex: 0,
      movey: 0,
      movex2: 0,
      movey2: 0,
      num: 0,
      move: 50,
      time: null,
      pics: [],
      sound1: null,
      sound2: null,
      position: []
    };
  },
  mounted() {
    this.pixi = new PIXI.Application({
      width: 1400,
      height: 700,
      backgroundColor: 0xEF6644
    });
    this.text = new PIXI.Container();
    this.initState();
  },
  methods: {
    initState() {
      document.getElementById("pixi").appendChild(this.pixi.view);
      this.add2();
      this.addSound();
    },
    addSound() {
      let bunny = PIXI.Sprite.from(soundBoxImg);
      let bunny2 = PIXI.Sprite.from(soundBoxImg);
      bunny.x = this.pixi.renderer.width / 3;
      bunny.y = 100;
      bunny.width = 100;
      bunny.height = 80;
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;
      bunny2.x = this.pixi.renderer.width / 3 * 2;
      bunny2.y = 100;
      bunny2.width = 80;
      bunny2.height = 60;
      bunny2.anchor.x = 0.5;
      bunny2.anchor.y = 0.5;
      this.pixi.stage.addChild(bunny);
      this.pixi.stage.addChild(bunny2);
      this.pixi.interactive = true;
      this.sound1 = bunny;
      this.sound2 = bunny2;
      this.soundActive();
    },
    soundActive() {
      setInterval(() => {
        this.scale(this.sound2);
        this.scale(this.sound1);
        setTimeout(() => {
          this.big(this.sound1);
          this.big(this.sound2);
        }, 100);
      }, 250);
    },
    add() {
      this.pixi.loader.add(this.info).load((loader, resources) => {
        let bunny = new PIXI.Sprite(resources.bunny.texture);
        bunny.x = this.pixi.renderer.width / 2;
        bunny.y = this.pixi.renderer.height / 2;
        bunny.width = 100;
        bunny.height = 80;
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        this.pixi.stage.addChild(bunny);
        this.pixi.interactive = true;
        this.pic = bunny;
      });
    },
    add2() {
      let bunny = PIXI.Sprite.from(img);
      bunny.x = this.randomNum(100, 1300);
      bunny.y = this.randomNum(280, 520);
      this.position.push({ x: bunny.x, y: bunny.y });
      console.log(this.position);
      bunny.width = 100;
      bunny.height = 80;
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      this.pixi.stage.addChild(bunny);
      this.pixi.interactive = true;

      let image;
      image = bunny;
      this.pics.push(image);
      this.move = this.move + 50;
      // this.activity()
    },
    scale(shuju) {
      this.zoom = this.zoom - 0.01;
      shuju.scale.set(this.zoom, this.zoom);
    },
    big(shuju) {
      this.zoom = this.zoom + 0.01;
      shuju.scale.set(this.zoom, this.zoom);
    },

    beforeMove(e) {
      this.movex = e.offsetX;
      this.movey = e.offsetY;
    },
    moving(e) {
      this.movex2 = e.offsetX;
      this.movey2 = e.offsetY;
      let x = this.movex2 - this.movex;
      let y = this.movey2 - this.movey;
      console.log(this.movey2, this.movey);
      console.log(x, y);
      if (Math.abs(this.movex2 - this.movex) > 10) {
        this.pic.position.set(this.pixi.renderer.width / 2 + x, this.pixi.renderer.height / 2 + y);
        console.log(this.pixi.renderer.width / 2 + x, this.pixi.renderer.height / 2 + y);
        this.pic.x = this.pixi.renderer.width / 2 + x;
        this.pic.y = this.pixi.renderer.height / 2 + y;
      }
    },
    doSomething() {
      let rectangle = new PIXI.Graphics();
      rectangle.lineStyle(4, 0xFF3300, 1);
      rectangle.beginFill(0x66CCFF);
      rectangle.drawRect(0, 0, 64, 64);
      rectangle.endFill();
      rectangle.x = 170;
      rectangle.y = 170;
      this.pixi.stage.addChild(rectangle);
    },
    del() {
      this.pixi.stage.removeChild(this.pic);
      this.pic = null;
    },
    //生成随机数
    randomNum(Min, Max) {
      let Range = Max - Min;
      let Rand = Math.random();
      if (Math.round(Rand * Range) == 0) {
        return Min + 1;
      } else if (Math.round(Rand * Max) == Max) {
        index++;
        return Max - 1;
      } else {
        let num = Min + Math.round(Rand * Range) - 1;
        return num;
      }
    },
    shout() {
      this.text = new PIXI.Container();
      for (let i in this.position) {
        let message = new PIXI.Text("嗨起来！！！");
        message.position.set(this.position[i].x - 40, this.position[i].y - 60);
        this.text.addChild(message);
      }
      this.pixi.stage.addChild(this.text);
    },
    shoutSomeone() {
      let message = new PIXI.Text("我是一号！！！");
      message.position.set(this.position[0].x - 40, this.position[0].y - 60);
      this.text.addChild(message);
      this.pixi.stage.addChild(this.text);
      console.log(this.text);
      this.text.children[0]._text = 'wwwwwww'
    },
    remove() {
      this.pixi.stage.removeChild(this.text);
      this.text = null;
    },
    change(){
      console.log(1111);

      console.log(this.text.children[0]);
    }
  }
}
;
</script>

<style scoped>
#pixi {
  /*border: saddlebrown solid 1px;*/
}
</style>