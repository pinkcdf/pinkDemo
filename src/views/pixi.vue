<template>
  <div id="app">
    <div id="stage">
      <div class="player" v-for="(item,index) in player" :style="item.position">
        <div style="width: 200px;height:40px;display: flex;justify-content: center;align-items: center;z-index: 2;">
          <span style="z-index: 2">{{ item.text }}</span>
        </div>
        <span>{{ item.name }}</span>
        <img style="z-index: 2" width="100px" :src="item.img"/>
        <div
            style="z-index: 1;width: 100px;height: 30px;background-color: rgba(7,0,0,0.81);border-radius: 50%;position: relative;top: -20px;"></div>
      </div>
    </div>
<!--    <button @click="addPlayer">新人入场</button>-->
<!--    <button @click="sayHi">mac喊麦</button>-->
<!--    <button @click="delText">清空喊麦</button>-->
    <!--        <button @click="shoutSomeone">固定某人发言</button>-->
<!--    <button @click="change">固定某人发言</button>-->

  </div>
</template>

<script>
export default {
  name: "pixi",
  data() {
    return {
      zoom: 0.2,
      num: 0,
      move: 50,
      time: null,
      pics: [],
      sound1: null,
      sound2: null,
      position: [],
      player: [
        {
          name: "123",
          img: require("../assets/img/goutou.gif"),
          text: "大家好,大家好",
          position: {
            left: "0px"
          },
          time: new Date()
        }
      ],
      img: "@/assets/img/goutou.gif",
      playerNum: 0,
    };
  },
  mounted() {
    this.clear()
  },

  computed: {},

  methods: {
    //生成随机数
    randomNum(Min, Max) {
      let Range = Max - Min;
      let Rand = Math.random();
      if (Math.round(Rand * Range) === 0) {
        return Min + 1;
      } else if (Math.round(Rand * Max) === Max) {
        index++;
        return Max - 1;
      } else {
        let num = Min + Math.round(Rand * Range) - 1;
        return num;
      }
    },
    change() {
      this.player.forEach(value => {
        if (value.name === "123") {
          value.text = "我是一号";
        }
      });
    },
    addPlayer() {
      this.playerNum++
      let newPlayer = {
        name: "周某人",
        img: require("../assets/img/goutou.gif"),
        text: "大家好,大家好",
        position: {
          left: "0px",
          top: "0px"
        },
        time: new Date()
      };
      newPlayer.position.left = this.randomNum(10, 700) + "px";
      newPlayer.position.top = this.randomNum(10, 600) + "px";
      this.player.push(newPlayer);
    },
    delText() {
      this.player.forEach(value => value.text = "");
    },
    sayHi() {
      this.player.forEach(value => {
        value.text = "都给我蹦起来"
        value.time = new Date()
      });
    },
    clear() {
      setInterval(() => {
        this.player.forEach(value => {
          if (new Date().getTime() - value.time.getTime() >= 4000) {
            value.text = ''
          }
        })
      }, 100)
    },
  }
}
;
</script>

<style scoped>
#stage {
  position: absolute;
  background-color: rgba(136, 136, 136, 0);
  width: 1000px;
  height: 800px;
  top: 100px
}

.player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute
}
</style>