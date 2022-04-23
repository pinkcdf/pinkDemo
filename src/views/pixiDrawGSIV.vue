<template>
  <div ref="box" style="width: 100%;height: 100%;">
    <div id="tool">
      <el-button size="mini" type="info" @click="startLoadImg">
        <Icon type="md-camera"/>
      </el-button>
      <div style="display: flex;align-items: center">
        <el-radio-group v-model="mode" size="mini" fill="white" text-color="black">
          <el-radio-button label="move">移动</el-radio-button>
          <el-radio-button label="polygon">多边形</el-radio-button>
          <el-radio-button label="rect">矩形</el-radio-button>
        </el-radio-group>
      </div>
      <div class="tool-right">
        <el-button size="mini" type="info" @click="revokePolygon">
          <span>撤销</span>
        </el-button>
        <el-button size="mini" type="info" @click="delChose">
          <span>删除选中</span>
        </el-button>
        <el-button size="mini" type="info" @click="ratioCalculation">
          <span>居中</span>
        </el-button>
        <el-button size="mini" type="info" @click="drawPolygons">重新渲染</el-button>
        <!--        <el-button size="mini" type="info" @click="clearAll">-->
        <!--        <Icon type="md-refresh-circle"/>-->
        <!--        </el-button>-->

        <el-upload
            style="margin-left: 10px"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list=false
            :limit="1">
          <el-button size="mini" type="info" @click="">
            <Icon type="ios-cloud-upload"/>
          </el-button>
        </el-upload>
      </div>
    </div>

    <div ref="pixi" id="pixi"></div>

  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import {setNowPosition} from "../assets/drawGSIV/move";
import {polygonChoseLineDraw, polygonLineDraw, revoke} from "../assets/drawGSIV/polygon";
import {clearAll, resetOn} from "../assets/drawGSIV/GraphicCommon";

export default {
  name: "pixiDrawGSIV",
  props: {
    points: undefined
  },
  data() {
    return {
      predefineColors: ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585',],
      color: '#ffffff',
      mode: 'polygon',

      pixi: null,
      container: null,
      sprite: null,
      zoom: 1,

      img: 'gallery/229/522/20220325/229_522_20220325080917_thum.jpg',
      imgW: 0,
      imgH: 0,

      polygonArr: [],//已绘制的点位集
      move: {x: 0, y: 0},

      chosePolygonIndex: '',
    }
  },
  watch: {},

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
    this.resetSize()
    this.loadImg()
    this.$refs.pixi.addEventListener('wheel', this.eventWheel)

    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)

    require(`../assets/drawGSIV/move`).init(this.colorTo(this.color), this, this.$refs.pixi)
    require('../assets/drawGSIV/polygon').init(this, this.$refs.pixi)
    require('../assets/drawGSIV/rect').init(this, this.$refs.pixi)
  },

  methods: {
    resetSize() {
      this.pixi.renderer.autoResize = true;
      this.pixi.renderer.resize(this.$refs.pixi.clientWidth, this.$refs.pixi.clientHeight);
    },

    changeZoom() {
      this.container.scale.set(this.zoom, this.zoom)
    },

    //放大缩小
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

    colorTo() {
      let color = this.color.substring(1, this.color.length)
      return ('0x' + color)
    },

    startLoadImg() {
      resetOn()
      clearAll(this)
      this.pixi.loader.reset()
      this.polygonArr = []
      this.container.removeChildren()
      this.sprite = null
      this.loadImg()
    },

    loadImg() {
      this.pixi.loader.add(this.img).load(() => {
        this.sprite = new PIXI.Sprite(this.pixi.loader.resources[this.img].texture)
        this.container.position.set(this.$refs.pixi.clientWidth / 2, this.$refs.pixi.clientHeight / 2)
        this.sprite.anchor.set(0.5, 0.5)
        this.sprite.interactive = true
        this.sprite.buttonMode = true
        this.move.x = this.$refs.pixi.clientWidth / 2
        this.move.y = this.$refs.pixi.clientHeight / 2
        this.imgW = this.sprite.width
        this.imgH = this.sprite.height
        this.container.addChild(this.sprite)
        this.pixi.stage.addChild(this.container)

        this.ratioCalculation()
        setNowPosition(this)
      })
    },

    keydown(e) {
      if (this.mode === 'move') return
      if (e.keyCode === 32) {
        this.mode = 'move'
        // this.pixiStyle.cursor = 'move'
      }
      if (e.ctrlKey && e.code === 'KeyZ') {
        console.log('撤销')
        this.revokePolygon()
      }
    },

    keyup(e) {
      if (e.keyCode === 32) {
        this.mode = 'polygon'
        // this.pixiStyle.cursor = 'default'
      }
    },

    //渲染图形
    drawPolygons() {
      let points = JSON.stringify(this.polygonArr)
      polygonLineDraw(this, points, this.imgW, this.imgH)
    },

    //获取多边形点位
    getPolygonPoints(points) {
      let polygon = JSON.parse(points)
      //修正中心点
      for (let i in polygon) {
        if (i % 2 === 0) {
          polygon[i] = polygon[i] + this.imgW / 2
        } else {
          polygon[i] = polygon[i] + this.imgH / 2
        }
      }
      this.polygonArr.push(polygon)
    },

    //使图像填充满画图区域
    ratioCalculation() {
      let box = this.$refs.pixi.clientHeight / this.$refs.pixi.clientWidth
      let img = this.imgH / this.imgW
      if (box < img) {
        this.zoom = this.$refs.pixi.clientHeight / this.imgH
      }
      if (box > img) {
        this.zoom = this.$refs.pixi.clientWidth / this.imgW
      }
      this.changeZoom()
      this.container.position.set(this.$refs.pixi.clientWidth / 2, this.$refs.pixi.clientHeight / 2)
    },

    //撤销多边形
    revokePolygon() {
      revoke(this, this.colorTo(this.color))
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

    //选中已存在的图形
    chosePolygon(point) {
      this.chosePolygonIndex = ''
      let arr = JSON.parse(point)
      arr[0] = arr[0] + this.imgW / 2
      arr[1] = arr[1] + this.imgH / 2
      for (let i in this.polygonArr) {
        let newArr = this.oneToTwo(this.polygonArr[i], this.polygonArr[i].length)
        this.inside(arr, newArr, i)
      }
    },
    //加粗选中的图形
    polygonChoseLine(num) {
      this.value = this.polygonArr[num].type
      this.chosePolygonIndex = num
      let polygon = JSON.stringify(this.polygonArr[num])
      polygonChoseLineDraw(this, JSON.parse(polygon), this.imgW, this.imgH)
    },

    // 删除选中的图形
    delChose() {
      this.polygonArr.splice(this.chosePolygonIndex, 1)
      this.drawPolygons()
    },
    //选中已存在的图形

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
      console.log(inside)
      if (inside) {
        this.polygonChoseLine(num)
      }
    },
  },

  beforeDestroy() {
    window.onresize = null
    this.container = null
    this.pixi = null
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.keyup)
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

.tool-right {
  display: flex
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