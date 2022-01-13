<template>
  <div>
    <div v-if="showText" class="explain" >
      <i class="el-icon-close closeText" style="font-size: 22px" @click="showText = !showText"></i>
      <span v-for="(item,index) in content">{{ index + 1 }}、{{ item }}</span>
    </div>
    <div v-if="!showText" class="clickBtn" @click="showText = !showText">
      <span>详细</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "explain",
  props: {
    content: {}
  },
  data(){
    return{
      showText:false,
    }
  }
};
</script>

<style scoped>
.explain {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  overflow-y: auto;
  background-color: #f6f8fa;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.explain > span {
  margin-bottom: 8px;
}
.closeText{
  position: absolute;
  right: 2px;
  top: 2px;
  z-index: 999;
  cursor:pointer
}

.clickBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #f6f8fa;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}
.clickBtn:hover{
  box-shadow: 0px 5px 8px #888888;
}
</style>