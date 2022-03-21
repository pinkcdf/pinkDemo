<template>
  <div style="width: 100%;height: 100%;background-color: #070000;display: flex; position: relative">
    <div v-for="(item,index) in box" @dragstart="dragstart($event,index)"  @dragend="dragend" draggable="true" style="width: 100px;height: 20px;background-color: #888888;margin: 5px" >{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: "dragAndDrop",
  data(){
    return{
      move:{
        start:0,
        end:0,
        index:1,
        box:{},
      },
      box:[
        {
          name:'box1',
          index:1
        },
        {
          name:'box2',
          index:2
        },
        {
          name:'box3',
          index:3
        },
        {
          name:'box4',
          index:4
        },
      ]
    }
  },
  methods:{
    dragstart(e,index){
      console.log(e.offsetX)
      this.move.start = e.offsetX
      console.log(index)
      this.move.box = this.box[index]
      this.move.index = index
    },
    dragend(e){
      console.log(e.offsetX)
      this.move.end = e.offsetX
      let index = parseInt(this.move.end / 110) + this.move.index + 1
      console.log(index)
      if (index > 0){
       this.swapArr(index)
      }
      console.log(this.box)
    },
    swapArr(index1) {
      this.box.splice(this.move.index, 1);
      if (index1 - 1 === 0){
        index1 = 1
      }
        this.box.splice(index1 - 1, 0,this.move.box);
    },
  }
}
</script>

<style scoped>

</style>