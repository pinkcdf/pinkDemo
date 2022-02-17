<template>
  <div id="app">
    <div id="pixi" style="z-index:-1;"></div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";

export default {
  name: "pixi",
  data() {
    return {
      pixi: null,
      pixiLoader: null,
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
      this.pixi.loader.add({name:'bunny',url:require("@/assets/img/business-3d-girl-with-phone-1.png")}).load((loader, resources) => {
        // This creates a texture from a 'bunny.png' image
        const bunny = new PIXI.Sprite(resources.bunny.texture);

        // Setup the position of the bunny
        bunny.x = 0;
        bunny.y = 0;

        // Rotate around the center
        // bunny.anchor.x = 0.5;
        // bunny.anchor.y = 0.5;

        // Add the bunny to the scene we are building
        this.pixi.stage.addChild(bunny);

        this.pixi.interactive = true

        // this.pixi.ticker.add(() => {
        //   bunny.rotation += 0.01;
        // });
      });

    },
  }
};
</script>

<style scoped>
#pixi {
  /*border: saddlebrown solid 1px;*/
}
</style>