<template>
  <div  style="width: 100%;height: 100%;background-color: #070000;display: flex;">
    <div @dragover="allowDrop($event,item,index)" v-for="(item,index) in box"
         style="height: 20px; background-color: #888888;margin: 5px;display: flex;">
      <div @dragstart="dragstart($event,item2,index)" @dragend="dragend" draggable="true"
           style="width: 100px;height: 20px;background-color: #b8b8c1;"
           v-for="(item2,index2) in item.cameras">
        {{ item2 }}
      </div>
    </div>
    <div v-if="showDisaggregation" @dragover="allowDrop2($event)" style="width: 100px;height: 20px;background-color: red">解组</div>
  </div>
</template>

<script>
export default {
  name: "dragAndDrop",
  data() {
    return {
      disaggregation:false,
      showDisaggregation:false,
      choseIndex: 0,
      start: {},
      end: '',
      box: [
        {
          cameras: ['camera1', 'camera2'],
          ROI: '',
        },
        {
          cameras: ['camera3'],
          ROI: '',
        },
        {
          cameras: ['camera4'],
          ROI: '',
        },
      ],
    }
  },
  methods: {
    dragstart(e, val, index) {
      console.log(val, index)
      this.end = ''
      this.start = val
      this.choseIndex = index
      this.showDisaggregation = true
    },
    dragend(e) {
      if ( this.disaggregation === true){
        console.log(1111)
        let par = {
          cameras:[],
          ROI:''
        }
        par.cameras.push(this.start)
        let index = this.box[this.choseIndex].cameras.indexOf(this.start)
        this.box[this.choseIndex].cameras.splice(index, 1)
        this.box.push(par)
      }else {
        if (this.end.cameras.indexOf(this.start) === -1) {
          console.log(this.box[this.choseIndex].cameras.length)
          this.end.cameras.push(this.start)
          console.log(this.box)
          if (this.box[this.choseIndex].cameras.length === 1) {
            this.box.splice(this.choseIndex, 1)
          } else {
            let index = this.box[this.choseIndex].cameras.indexOf(this.start)
            this.box[this.choseIndex].cameras.splice(index, 1)
          }
        }
      }
      this.showDisaggregation = false
    },

    allowDrop(event, val) {
      this.disaggregation = false
      console.log(val)
      this.end = val
      event.preventDefault();
    },
    allowDrop2(){
      this.disaggregation = true
      console.log("解组")
    }
  }
}
</script>

<style scoped>

</style>