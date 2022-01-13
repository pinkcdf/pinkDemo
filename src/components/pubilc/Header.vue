<template>
    <div id="header">
      <span>PINK</span>
      <img src="../../assets/img/touxiang.png" width="40" />
    </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 60px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
}

#header > span {
  color: white;
  font-size: 20px;
}

#header > img {
  border-radius: 50%;
}

#center{
  width: 100%;
  height: calc(100% - 70px);
  /*background-color: red;*/
}

</style>