<template>
  <div style="height: 100%;">
    <el-menu class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#001E28"
             text-color="#FFF"
             active-text-color="#ffd04b"
             router
             style="width: 200px">
      <template v-for="item in menuList" >
        <el-submenu v-if="haveSub(item.subs)" :key="item.path" :index="item.path" >
          <template slot="title">
            <i :class="item.img"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="sub in item.subs" :key="sub.path" :index="sub.path">{{sub.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="item.path" :index="item.path" >
          <template slot="title">
<!--            <i class="el-icon-location"></i>-->
            <span slot="title">{{item.title}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          title: "图表",
          path: "/",
          img:'',
          subs: [
            {
              title: "highChart图表",
              path: "/",

            },
            {
              title: "highChart地图",
              path: "/highchartsMapUse",
            }
          ]
        },
        {
          title: "canvas的简单使用",
          path: "/canvasUse",
          img: ''
        },
        {
          title: "组件的数据交互",
          path: "/componentValueTransfer",
          img: ''
        },
        {
          title: "demo",
          path: "/pixi",
          img: ''
        },
        {
          title: "pixi绘图",
          path: "/pixiDraw",
          img: ''
        },
        {
          title: "three",
          path: "/three",
          img: ''
        },
        {
          title: "show",
          path: "/threeUse",
          img: ''
        },
      ]
    };
  },
  computed:{
    haveSub(){
      return function(val){
        // console.log(val);
        if (val === null || val === undefined){
          return false
        }else {
          return true
        }
      }
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
}
</style>