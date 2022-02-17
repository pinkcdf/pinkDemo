<template>
  <div id="app">
    <div id="pixi" style="z-index:-1;"></div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
export default {
  name: "pixi",
  methods: {
    initPixi() {
      let app = new PIXI.Application({ width:1000,height:600,backgroundColor: 0xEF6644 });
      document.getElementById("pixi").appendChild(app.view);

    }
  },
  mounted: function() {
    this.initPixi();
  },

};
</script>

<style scoped>
#pixi{
  border: saddlebrown solid 1px;
}
</style>