<template>
  <div style="margin-top: 50px">
    <span>我是孙组件:</span>
    <span>{{getFatherVal}}</span>
    <el-button style="margin-left: 10px"  @click="changeFather">点我通过inject改变父组件</el-button>
  </div>
</template>

<script>
export default {
  name: "Grandson",
  inject:['grandsonChange','grandsonVal'],
  computed: {
    getFatherVal () {
      return this.grandsonVal()
    },
    author () {
      return this.$store.state.author
    }
  },
  watch: {
    getFatherVal: function (val) {
      console.log(val)
    }
  },
  methods:{
    changeFather(){
      this.grandsonChange()
    },
  },
};
</script>

<style scoped>

</style>