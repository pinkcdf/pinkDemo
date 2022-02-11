<template>
  <div>
    <div>
      <span>我是子组件:{{sonVal}}</span>
      <span style="margin-left: 10px">我是父组件传过来的值:{{isFather}}</span>
      <el-button style="margin-left: 10px"  @click="changeSon">点我通过$emit改变我自己并传递给父组件</el-button>
      <el-button  @click="parentUse">点我通过$parent获取父组件的值</el-button>
      <el-button  @click="parentUse2">点我通过$parent改变父组件的值</el-button>
    </div>
    <grandson></grandson>
  </div>
</template>

<script>
import Grandson from "./Grandson";
export default {
  name: "Son",
  components: { Grandson },
  data(){
    return {
      sonVal:100,
      obj:{
        a:1,
        b:2
      }
    }
  },
  methods:{
    changeVal(){
      this.sonVal = 200
    },
    changeSon(){
      this.sonVal = 500
      this.$emit('changeFather',this.sonVal)
    },
    parentUse(){
      alert(this.$parent.father)
    },
    parentUse2(){
    this.$parent.changeVal()
    }
  },
  props:['isFather']
};
</script>

<style scoped>

</style>