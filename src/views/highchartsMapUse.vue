<template>
  <div>
    <!--  main.js中导入 import Highcharts from 'highcharts' import Maps from "highcharts/modules/map"，并Maps(Highcharts)-->
    <!--下载json格式地图数据，并导入。指定:constructorType="'mapChart'"，用:options="chartOptions"-->
    <!--  注* allAreas: true,开始显示所有地图数据 否则data中必须有地图的数据地图才会显示-->
    <highcharts style="width: 500px;height: 400px; transform: perspective(500px) rotatex(30deg) ;" :constructorType="'mapChart'" :options="chartOptions" ref="chart"></highcharts>
    <explain :content="content"></explain>
  </div>


</template>

<script>
import chinaMap from "../assets/map/chinaMap.json";
import Explain from "../components/Explain";

export default {
  name: "test2",
  components: { Explain },
  data() {
    return {
      content: [
        "main.js中导入 import Highcharts from 'highcharts' import Maps from \"highcharts/modules/map\"，并Maps(Highcharts)",
        "下载json格式地图数据，并导入。指定:constructorType=\"'mapChart'\"，用:options=\"chartOptions",
        "注: allAreas: true,开始显示所有地图数据 否则data中必须有地图的数据地图才会显示"
      ],
      chartOptions: {
        chart: {
          map: chinaMap,
          backgroundColor: false
        },
        title: {
          text: "highchartsMap的使用"
        },
        subtitle: {
          text: ""
        },
        legend: {
          enabled: false
        },
        mapNavigation: {
          enabled: false,
          buttonOptions: {
            alignTo: "spacingBox"
          }
        },
        colorAxis: {
          min: 0
        },
        series: [{
          name: "Random data",
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          },
          allAreas: true,
          data: [
            ["cn-3664", 0],
            ["cn-gd", 1],
            ["cn-sh", 2],
            ["cn-zj", 3],
            ["cn-ha", 4],
            ["cn-xz", 5],
            ["cn-yn", 6],
            ["cn-ah", 7],
            ["cn-hu", 8],
            ["cn-sa", 9],
            ["cn-cq", 10],
            ["cn-gz", 11],
            ["cn-hn", 12],
            ["cn-sc", 13],
            ["cn-sx", 14],
            ["cn-he", 15],
            ["cn-jx", 16],
            ["cn-nm", 17],
            ["cn-gx", 18],
            ["cn-hl", 19],
            ["cn-fj", 20],
            ["cn-bj", 21],
            ["cn-hb", 22],
            ["cn-ln", 23],
            ["山东", 24],
            ["cn-tj", 25],
            ["cn-js", 26],
            ["cn-qh", 27],
            ["cn-gs", 28],
            ["cn-xj", 29],
            ["cn-jl", 30],
            ["cn-nx", 31]
          ]
        }]
      }
    };
  }
};
</script>

<style scoped>

</style>