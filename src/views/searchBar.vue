<template>
  <div class="searchBar">
    <search ref="search" :search-info="search">
    </search>
  </div>
</template>

<script>
import Search from "../components/search";

export default {
  name: "searchBar",
  components: {Search},
  data() {
    return {
      search: [
        {
          name: 'ip',
          label: 'ip',
          type: 'text',
          value: '',
        },
        {
          name: 'select',
          label: '吃什么',
          type: 'select',
          disabled: false,
          placeholder: '请选择吃啥',
          value: '',
          multiple: false,
          list: [{
            value: '1',
            label: '黄金糕'
          }, {
            value: '2',
            label: '双皮奶'
          }, {
            value: '3',
            label: '蚵仔煎'
          }, {
            value: '4',
            label: '龙须面'
          }, {
            value: '5',
            label: '北京烤鸭'
          }],
        },
          {
            name: 'data',
            label: 'ip',
            type: 'date',
            dateType: 'datetime',
            disabled: false,
            placeholder: '请输入111',
            value: '',
            pickerOptions: "",
            defaultTime: "",
            format: "yyyy-MM-dd HH:mm:ss"
          },
          {
            name: 'datas',
            label: 'ip',
            type: 'dates',
            dateType: 'datetimerange',
            disabled: false,
            placeholder: '请输入1122221',
            value: '',
            pickerOptions: "",
            defaultTime: "",
            symbol: '-',
            format: "yyyy-MM-dd HH:mm:ss"
          },
      ]
    }
  },
  methods:{
    getSearch(val){
      console.log(val)
    }
  }
}
</script>