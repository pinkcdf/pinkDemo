<template>
  <div>
    <span>我是子组件:{{sonVal}}</span>
    <button style="width: 150px" @click="changeSon">点我改变子组件和父组件</button>
  </div>
</template>

<script>
export default {
  name: "Son",
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
    }
  }
};
</script>

<style scoped>

</style>