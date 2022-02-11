<template>
  <div>
    <div>
      <span>我是父组件:{{father}}</span>
      <el-button style="margin-left: 10px" @click="changeVal">点我改变自己</el-button>
      <el-button @click="changeSon">通过$refs改变子组件</el-button>
    </div>
    <Son style="margin-top: 50px" :is-father="father" @changeFather="sonChangeVal" ref="son"></Son>
    <explain :content="content"></explain>
  </div>

</template>

<script>
import Grandson from "../components/Grandson";
import Son from "../components/Son";
import Explain from "../components/Explain";
export default {
  name: "componentValueTransfer",
  components: { Explain, Son, Grandson },
  provide(){
    return {
      grandsonChange: this.changeVal,
      grandsonVal:()=> this.father
    }
  },
  data() {
    return {
      content: [
        "在子组件中通过props 绑定父组件传过来的值 ",
        "父组件可以通过$refs.子组件的方法名调用子组件内的方法",
        "子组件可以通过$emit（方法名，参数）将数据传递给父组件，需要在父组件中的子组件中绑定子组件定义的方法名监听传递过来的数据",
        "子组件可以通过$parent.参数或者方法名直接获父组件的变量或调用父组件的方法"
      ],
      father:30,
    };
  },
  methods:{
    changeVal(){
      this.father = 50
    },
    changeSon(){
      this.$refs.son.changeVal()
    },
    sonChangeVal(val){
      console.log(val);
      this.father = val
    },
  }
};
</script>

<style scoped>

</style>