<template>
<div id="layout">
  <Header></Header>
  <div class="center">
    <div class="center_l">
      <Sidebar/>
    </div>
    <div class="center_r">
      <router-view></router-view>
    </div>
  </div>

</div>

</template>

<script>
import Header from "./Header";
import Sidebar from "./Sidebar";
export default{
    name:'Home',
  components: { Sidebar, Header },
}
</script>

<style lang="scss">
#layout{
  width: 100%;
  height: 100%;
}
.center{
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
}
.center_l{
  height: 100%;
}
.center_r{
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  padding: 20px;
  overflow: auto;
}

</style>
