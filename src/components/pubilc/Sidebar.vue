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
      <template v-for="item in menuList">
        <el-submenu v-if="haveSub(item.subs)" :key="item.path" :index="item.path">
          <template slot="title">
            <i :class="item.img"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="sub in item.subs" :key="sub.path" :index="sub.path">{{ sub.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="item.path" :index="item.path">
          <template slot="title">
            <!--            <i class="el-icon-location"></i>-->
            <span slot="title">{{ item.title }}</span>
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
          img: '',
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
          title: "组件的数据交互",
          path: "/componentValueTransfer",
          img: ''
        },
        // {
        //   title: "demo",
        //   path: "/pixi",
        //   img: ''
        // },

        {
          title: "threeJs的使用",
          path: "/three",
          img: '',
          subs: [
            {
              title: "threeJsDome",
              path: "/three",
              img: ''
            },
            {
              title: "3D场景",
              path: "/threeUse",
              img: ''
            },
          ]
        },
        {
          title: "绘图",
          path: "/pixiDraw",
          img: '',
          subs: [
            {
              title: "pixi绘图",
              path: "/pixiDraw",
              img: ''
            },
            {
              title: "pixi绘图ForGSIV",
              path: "/pixiDrawGSIV",
              img: ''
            },
            {
              title: "fabricjs的使用",
              path: "/fabricjs",
              img: 'fabricjs'
            },
          ]
        },


        {
          title: "搜索栏封装",
          path: "/searchBar",
          img: 'searchBar'
        },
        {
          title: "拖拽",
          path: "/dragAndDrop",
          img: '',
          subs: [
            {
              title: "html5 drag",
              path: "/dragAndDrop",
              img: 'dragAndDrop'
            },
            {
              title: "究极拖拽",
              path: "/vuedraggable",
              img: 'vuedraggable'
            },
          ]
        },

        {
          title: "多级递归",
          path: "/recursiveComponent",
          img: 'dragAndDrop'
        },

      ]
    };
  },
  computed: {
    haveSub() {
      return function (val) {
        // console.log(val);
        if (val === null || val === undefined) {
          return false
        } else {
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