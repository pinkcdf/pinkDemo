<template>
<div>
<!--  main.js 导入 import HighchartsVue from "highcharts-vue"; 并全局注册-->
<!--  options绑定数据-->
<!--  不同的图表只需要改变图标绑定的数据-->
<!--  如果需要改变标签名<highcharts>，只需要改变main.js中 Vue.use(HighchartsVue, { tagName: 'charts' })-->
  <highcharts :options="chartOptions"></highcharts>
  <explain :content="content"></explain>
</div>
</template>

<script>
import Explain from "../components/Explain";
export default {
  name: "test",
  components: { Explain },
  data(){
    return{
      content:[
        'main.js 导入 import HighchartsVue from "highcharts-vue"; 并全局注册',
        'options绑定数据',
        '不同的图表只需要改变图标绑定的数据',
        '如果需要改变标签名<highcharts>，只需要改变main.js中 Vue.use(HighchartsVue, { tagName: \'charts\' })',
      ],
      chartOptions: {
        credits: {
          enabled: false // 禁用版权信息
        },
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: 'vue中使用highcharts图表'
        },
        xAxis: [{
          categories: ['Jan', 'Feb', 'Mar'],
          crosshair: true
        }],
        plotOptions: {
          column: {
            pointWidth: 50,
          }
        },
        yAxis: [{ // Primary yAxis
          max:2000,
          labels: {
            format: '{value}',
            style: {
              color: 'rgb(150 150 150)'
            }
          },
          title: {
            text: '',
            style: {
              color: 'red'
            }
          }
        }, {
          max:100,
          title: {
            text: '',
          },
          labels: {
            format: ' ',
          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          enabled: false
        },
        series: [{
          name: '',
          type: 'column',
          data: [],
          tooltip: {
            valueSuffix: '个'
          }
        }, {
          color: 'rgb(255 204 0)',
          name: '良率',
          yAxis: 1,
          type: 'spline',
          data: [55,67,33],
          tooltip: {
            valueSuffix: '%'
          }
        }]
      },

    }
  },
  mounted() {

  },
};
</script>

<style scoped>

</style>