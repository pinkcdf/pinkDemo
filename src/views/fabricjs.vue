<template>
  <div style="width: 100%; height: 100%; box-sizing: border-box; border: saddlebrown solid 1px">
    <canvas  ref="canvas" id="canvas" style="border: saddlebrown solid 1px"></canvas>
  </div>
</template>

<script>
export default {
  name: "fabricjs",
  data(){
    return{

    }
  },
  methods: {
    initCanvas() {
      let canvas = new fabric.Canvas('canvas')
      canvas.setBackgroundImage(require('../assets/img/people.png'))


      // canvas.isDrawingMode = true //开启随意绘制
      // let rect = new fabric.Rect({
      //   left: 10,
      //   top: 10,
      //   fill: 'red',
      //   width: 200,
      //   height: 200,
      // });
      // canvas.add(rect);
      //
      // rect.set('fill', 'red');
      // rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
      // // rect.set('angle', 15).set('flipY', true);
      //
      // console.log(canvas.item(0));
      // console.log( canvas.getObjects());
      // canvas.remove(rect);

      // rect.animate('angle', 145, {
      //   onChange: canvas.renderAll.bind(canvas)
      // });

      // rect.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas) });

      // rect.animate('left', 500, {
      //   onChange: canvas.renderAll.bind(canvas),
      //   duration: 1000,
      //   easing: fabric.util.ease.easeOutCubic
      // });

      // let circle = new fabric.Circle({
      //   radius: 20, fill: 'green', left: 100, top: 100
      // });
      //
      // let triangle = new fabric.Triangle({
      //   width: 20, height: 30, fill: 'blue', left: 50, top: 50
      // });
      // canvas.add(circle, triangle);
      //
      // let text1 = 'this is\na multiline\ntext\naligned right!';
      // let text = new fabric.Text(text1, {
      //   left: 100,
      //   top: 130,
      //   fontSize: 40,
      //   fontWeight:'bold',
      //   shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      //   fontFamily: 'Impact',
      //   stroke: '#c3bfbf',
      //   strokeWidth: 3,
      //   textAlign: 'right',
      //   lineHeight: 1,
      //   textBackgroundColor: 'rgb(0,7,0)'
      // });
      // canvas.add(text);

      // canvas.on('mouse:down', function(options) {
      //   console.log(options.e.offsetX, options.e.offsetY);
      // });

      // rect.on('mouse:down', function(e) {
      //   console.log('选择了一个矩形');
      //   console.log(rect)
      //   console.log(e, e);
      // });

      // var circle2 = new fabric.Circle({
      //   radius: 100,
      //   fill: '#eef',
      //   scaleY: 0.5,
      //   originX: 'center',
      //   originY: 'center'
      // });
      //
      // var text2 = new fabric.Text('hello world', {
      //   fontSize: 30,
      //   originX: 'center',
      //   originY: 'center'
      // });
      //
      // var group = new fabric.Group([ circle2, text2 ], {
      //   left: 150,
      //   top: 100,
      //   angle: -10,
      // });
      //
      // canvas.add(group);
      //
      canvas.on('mouse:wheel', function(opt) {

        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      })

      canvas.on('mouse:down', function(opt) {
        let ponint = canvas.getPointer(opt.e)
        console.log(ponint)
        var evt = opt.e;
        if (evt.altKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
      canvas.on('mouse:move', function(opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
      canvas.on('mouse:up', function(opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });


    }
  },
  created() {
  },
  mounted() {
    this.initCanvas();
  }
}
</script>

<style scoped>

</style>