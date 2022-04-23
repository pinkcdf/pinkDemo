<template>
  <div ref="box" style="width: 100%;height: 100%;">
    <div id="tool">
      <div style="display: flex;align-items: center">
        <el-color-picker :predefine="predefineColors" class="color" size="mini" color-format="hex" v-model="color"
                         @change="choseColor()"></el-color-picker>
        <el-radio-group @change="changeMode" v-model="mode" size="mini" fill="white" text-color="black">
                    <el-radio-button label="move">移动</el-radio-button>
                    <el-radio-button label="polygon">多边形</el-radio-button>
          <!--          <el-radio-button label="rect">矩形</el-radio-button>-->
        </el-radio-group>
        <div class="clear">
          <el-select size="mini" style="width: 100px;line-height: 20px;" v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-radio-group @change="clear" v-model="clearMode" size="mini" fill="white" text-color="black">
            <el-radio-button label="polygon">清空区域</el-radio-button>
<!--            <el-radio-button label="rect">清除矩形</el-radio-button>-->
          </el-radio-group>
        </div>
      </div>
      <!--      <el-button size="mini" type="info" @click="downLoadImg">下载</el-button>-->
      <div>
        <el-button style="margin-right: 10px" size="mini" type="info" @click="upImg">获取截图</el-button>
        <el-button style="margin-right: 10px" size="mini" type="info" @click="delChose">删除选中</el-button>
        <el-button size="mini" type="info" @click="drawPolygonOnline">重新渲染</el-button>
        <!--        <el-button size="mini" type="info" @click="clearImg">test</el-button>-->
        <!--        <el-button size="mini" type="info" @click="drawPolygonOnline">test</el-button>-->
      </div>
    </div>

    <div ref="pixi" id="pixi"></div>

  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import {polygonChoseLineDraw, polygonLineDraw,} from "../assets/draw/polygon";

export default {
  name: "pixiDraw",
  props: {
    points: undefined
  },
  data() {
    return {
      predefineColors: ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585',],
      color: '#ffffff',
      pixi: null,
      container: null,
      canDraw: false,
      mode: 'polygon',
      clearMode: '111',
      // img: require('../assets/images/people.png'),
      img: 'gallery/229/522/20220325/229_522_20220325080917_thum.jpg',
      imgW: 0,
      imgH: 0,
      sprite: null,
      rectLineDraw: null,
      zoom: 1,
      move: {x: 0, y: 0},
      chosePolygonIndex: '',
      polygonArr: [
        [215.5, 259.5, 218.5, 516.5, 352.5, 488.5, 325.5, 258.5],
      ],
      // rectArr: [[173, 219, 75, 113], [21, 58, 208, 64]],
      options: [{
        value: 1,
        label: '屏蔽区'
      }, {
        value: 2,
        label: '检测区'
      }],
      value: 1,
      style: {
        height: '0px',
        width: '100%'
      }
    }
  },
  watch: {
    points: function (val) {
      console.log(val);
      this.drawPolygonOnline(val)
    }
  },
  mounted() {
    this.pixi = new PIXI.Application({
      width: this.$refs.pixi.clientWidth,
      height: this.$refs.pixi.clientHeight,
      backgroundColor: 0x000000,
      resolution: 1,
      autoDensity: true,
      antialias: true
    });
    this.container = new PIXI.Container();

    document.oncontextmenu = function (e) {
      return false;
    };

    document.getElementById("pixi").appendChild(this.pixi.view)

    this.loadImg()
    this.$refs.pixi.addEventListener('wheel', this.eventWheel)

    window.onresize = () => {
      this.changeWH()
    }
  },

  methods: {
    changeWH() {
      console.log(this.$refs.pixi.clientWidth, this.$refs.pixi.clientHeight)
      this.pixi.renderer.autoResize = true;
      this.pixi.renderer.resize(this.$refs.pixi.clientWidth, this.$refs.pixi.clientHeight);
    },

    changeMode() {
      require(`../assets/draw/${this.mode}`).drawPolygon(this.colorTo(this.color), this, this.$refs.pixi)
    },

    choseColor() {
      this.changeMode()
    },

    colorTo() {
      let color = this.color.substring(1, this.color.length)
      console.log(color)
      return ('0x' + color)
    },

    clear() {
      if (this.clearMode !== '') {
        require(`../assets/draw/${this.clearMode}`).clearDraw(this.colorTo(this.color))
        this.polygonArr = []
        this.clearMode = ''
      }
    },

    // getPoints(val) {
    //   // 修正点位数据
    //   let arr = JSON.stringify(val)
    //   this.polygonArr = JSON.parse(arr)
    //   for (let i in this.polygonArr) {
    //     if (i % 2 === 0) {
    //       this.polygonArr[i] = this.polygonArr[i] + this.imgW / 2
    //     } else {
    //       this.polygonArr[i] = this.polygonArr[i] + this.imgH / 2
    //     }
    //   }
    //   this.$emit('sendPoints', this.polygonArr)
    // },

    getPoints(val) {
      // 修正点位数据
      let arr = JSON.stringify(val)
      let polygon = JSON.parse(arr)
      for (let i in polygon) {
        if (i % 2 === 0) {
          polygon[i] = polygon[i] + this.imgW / 2
        } else {
          polygon[i] = polygon[i] + this.imgH / 2
        }
      }
      console.log(polygon)
      this.polygonArr.push(polygon)
      console.log(this.polygonArr)
      // this.$emit('sendPoints', this.polygonArr)
    },

    loadImg() {
      this.pixi.loader.add(this.img).load(() => {
        this.sprite = new PIXI.Sprite(this.pixi.loader.resources[this.img].texture)
        this.container.position.set(this.$refs.pixi.clientWidth / 2, this.$refs.pixi.clientHeight / 2)
        this.move.x = this.$refs.pixi.clientWidth / 2
        this.move.y = this.$refs.pixi.clientHeight / 2

        this.imgW = this.sprite.width
        this.imgH = this.sprite.height

        // this.sprite.interactive = true//响应交互
        // this.sprite.buttonMode = true
        this.sprite.anchor.set(0.5, 0.5)

        this.container.addChild(this.sprite)
        this.pixi.stage.addChild(this.container)
        this.changeMode()

      })
    },

    clearImg() {
      this.zoom = 1
      this.changeZoom()
      this.img = '/gallery/229/494/20220325/229_494_20220325124735.jpg'
      this.container.removeChildren()
      this.loadImg()
    },

    changeZoom() {
      this.container.scale.set(this.zoom, this.zoom)
    },

    eventWheel(e) {
      if (e.deltaY > 0) {
        this.zoom = this.zoom - 0.02
        this.changeZoom()
      } else if (e.deltaY < 0) {
        this.zoom = this.zoom + 0.02
        this.changeZoom()
      }
      if (this.zoom > 3) {
        this.zoom = 3
        this.changeZoom()
      }
      if (this.zoom < 0.2) {
        this.zoom = 0.2
        this.changeZoom()
      }
    },

    //已知点位绘制多边形或重新绘制
    drawPolygonOnline() {
      let polygonArr = JSON.stringify(this.polygonArr)
      polygonLineDraw(this, JSON.parse(polygonArr), this.imgW, this.imgH, this.colorTo(this.color))
    },

    //已知点位绘制矩形
    drawRectOnline() {
      const rectLineDraw = new PIXI.Graphics();
      rectLineDraw.lineStyle(2, 0xffffff)
      for (let i in this.rectArr) {
        rectLineDraw.drawRect(...this.rectArr[i]);
        rectLineDraw.endFill();
        this.container.addChild(rectLineDraw)
      }
    },

    //选中已存在的图形
    chosePolygon(point) {
      let arr = JSON.parse(point)
      arr[0] = arr[0] + this.imgW / 2
      arr[1] = arr[1] + this.imgH / 2
      for (let i in this.polygonArr) {
        let newArr = this.oneToTwo(this.polygonArr[i], this.polygonArr[i].length)
        this.inside(arr, newArr, i)
      }
    },
    polygonChoseLine(num) {
      this.chosePolygonIndex = num
      let polygon = JSON.stringify(this.polygonArr[num])
      polygonChoseLineDraw(this, JSON.parse(polygon), this.imgW, this.imgH)
    },
    //选中已存在的图形



    upImg() {

    },

    downLoadImg() {
      const image = this.pixi.renderer.plugins.extract.base64(this.pixi.stage);
      console.log(image)
      if (window.navigator.msSaveOrOpenBlob) {
        let bstr = atob(image.split(',')[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, 'download' + '.' + 'png');
      } else {
        const a = document.createElement('a');
        a.href = image;
        a.setAttribute('download', 'download');
        a.click();
      }
    },

    //一维数组转二维
    oneToTwo(arr, length) {
      let newArr = []
      let num = 0
      let start = 0
      for (let i = 0; i < length / 2; i++) {
        newArr.push([])
      }
      for (let i in arr) {
        if (num > 1) {
          num = 0
          start++
        }
        newArr[start].push(arr[i])
        num++
      }
      return newArr
    },

    //点是否在多边形内
    inside(point, vs, num) {
      if (this.chosePolygonIndex !== '') return
      let x = point[0], y = point[1]
      let inside = false
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1]
        let xj = vs[j][0], yj = vs[j][1]
        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside;
      }
      if (inside) {
        this.polygonChoseLine(num)
      } else {
        this.chosePolygonIndex = ''
      }
    },
  },


  beforeDestroy() {
    window.onresize = null
    this.container = null
    this.pixi = null
    require(`../assets/draw/rect`).clearDraw(this.colorTo(this.color))
    require(`../assets/draw/polygon`).clearDraw(this.colorTo(this.color))
    document.oncontextmenu = function (e) {
      return true;
    };
  }
}
</script>

<style scoped>
#pixi {
  background-color: #000000;
  width: 100%;
  height: calc(100% - 37px);
  overflow: hidden;
}

#tool {
  position: static;
  width: 100%;
  background-color: #070000;
  border-bottom: #888888 solid 1px;
  box-sizing: border-box;
  padding: 4px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 600px;
}

.clear {
  /*margin-left: 10px;*/
  /*border-left: #cec6c6 solid 1px;*/
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.clear > * {
  margin-right: 20px;
}

.color {
  margin-right: 10px;
}

/deep/ .el-radio-button .el-radio-button__inner {
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}

/deep/ .el-radio-button:first-child .el-radio-button__inner {
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}

/deep/ .el-radio-button:last-child .el-radio-button__inner {
  background-color: #282626;
  border-radius: 0 0 0 0;
  border: none;
  color: #888888;
}

/deep/ .el-button {
  border: none;
  background-color: #282626;
  color: #888888;
}

/deep/ .el-button--mini {
  padding: 7px 6px;
}

/deep/ .el-color-picker__trigger {
  border: none;
}

/deep/ .el-select .el-input .el-select__caret {
  line-height: 20px;
}
</style>