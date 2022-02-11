<template>
  <div>
    <div style="display: flex;flex-direction: column">
      <span>我是夫组件:{{father}}</span>
      <button style="width: 150px" @click="changeSon">点我改变子组件</button>
    </div>
    <Son @changeFather="changeVal" ref="son"></Son>
  </div>

</template>

<script>
import Grandson from "../components/Grandson";
import Son from "../components/Son";
export default {
  name: "componentValueTransfer",
  components: { Son, Grandson },
  data() {
    return {
      father:30,
    };
  },
  methods:{
    changeSon(){
      this.$refs.son.changeVal()
    },
    changeVal(val){
      console.log(val);
      this.father = val
    },
  }
};
</script>

<style scoped>

</style>