<template>
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <draggable :scroll="true" v-model="arr1" group="site" animation="300" dragClass="dragClass" ghostClass="ghostClass"
                   chosenClass="chosenClass" @start="onStart" @end="onEnd">
          <transition-group  style="display: flex;align-items: center">
            <div class="item" v-for="item in arr1" :key="item.id">{{ item.name }}</div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <draggable v-model="arr2" group="site" animation="300" dragClass="dragClass" ghostClass="ghostClass"
                   chosenClass="chosenClass" @start="onStart" @end="onEnd">
          <transition-group  style="display: block;">
            <div class="item" v-for="item in arr2" :key="item.id">{{ item.name }}</div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <draggable v-model="arr3" group="site" animation="300" dragClass="dragClass" ghostClass="ghostClass"
                   chosenClass="chosenClass" @start="onStart" @end="onEnd">
          <transition-group  style="display: block;">
            <div class="item" v-for="item in arr3" :key="item.id">{{ item.name }}</div>
          </transition-group>
        </draggable>
      </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "vuedraggable",
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      //定义要被拖拽对象的数组
      arr1: [
        {id: 1, name: '1'},
        {id: 2, name: '2'},
        {id: 3, name: '3'},
        {id: 3, name: '4'}
      ],
      arr2: [
        {id: 1, name: '5'},
        {id: 2, name: '6'},
        {id: 3, name: '7'},
        {id: 4, name: '8'}
      ],
      arr3: [
        {id: 1, name: '9'},
        {id: 2, name: '10'},
        {id: 3, name: '11'},
        {id: 4, name: '12'}
      ]
    };
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
  },
}
</script>

<style scoped>
.ghostClass {
  background-color: #b8b8c1 !important;
}

.chosenClass {
  background-color: #b8b8c1 !important;
  opacity: 1 !important;
}

.dragClass {
  background-color: #b8b8c1 !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.itxst {
  margin: 10px;
  display: flex;
  height: 100%;
}

.title {
  padding: 6px 12px;
}

.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}

.col + .col {
  margin-left: 10px;
}

.item {
  width: 20px;
  height: 20px;
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}

/*.item + .item {*/
/*  border-top: none;*/
/*  margin-top: 6px;*/
/*}*/
</style>