<template>
  <div style="width: 100%;height: 100%">
    <el-form :inline="true">
      <el-form-item style="margin-right: 40px" v-for="item in searchInfo" :label="item.label+':'">

        <el-input v-if="item.type === 'text'" v-model="item.value" :placeholder="item.placeholder" :size="size"
                  clearable></el-input>

        <el-input v-if="item.type === 'num'" type="number" v-model="item.value" :placeholder="item.placeholder"
                  :size="size"
                  clearable></el-input>

        <el-input v-if="item.type === 'haveLength'" type="text" v-model="item.value" :placeholder="item.placeholder"
                  :size="size" clearable :maxlength="item.max" show-word-limit></el-input>

        <el-select v-if="item.type === 'select'" v-model="item.value" :placeholder="item.placeholder" :multiple="true"
                   :size="size" clearable>
          <el-option v-for="item in item.list" :key="item.value" :size="size" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>

        <el-date-picker v-if="item.type === 'date'" v-model="item.value" :type="item.dateType" :size="size"
                        :picker-options="item.pickerOptions" :default-time="item.defaultTime" :format="item.format"
                        :placeholder="item.placeholder" clearable></el-date-picker>

        <el-date-picker v-if="item.type === 'dates'" v-model="item.value" :type="item.dateType" :size="size"
                        :picker-options="item.pickerOptions" :range-separator="item.symbol" :format="item.format"
                        start-placeholder="开始日期" end-placeholder="结束日期" clearable></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="size" @click="onSubmit">查询</el-button>
        <el-button type="primary" :size="size" @click="clearAll">清空</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    searchInfo: {
      type: Array
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      // searchInfo: [
      //   {
      //     name: 'ip',
      //     label: 'ip',
      //     type: 'text',
      //     disabled: false,
      //     placeholder: '请输入111',
      //     value: ''
      //   },
      //   {
      //     name: 'num',
      //     label: 'ip',
      //     type: 'num',
      //     disabled: false,
      //     placeholder: '请输入111',
      //     value: ''
      //   },
      //   {
      //     name: 'select',
      //     label: 'ip',
      //     type: 'select',
      //     disabled: false,
      //     placeholder: '请输入111',
      //     value: '',
      //     multiple: false,
      //     list: [{
      //       value: '选项1',
      //       label: '黄金糕'
      //     }, {
      //       value: '选项2',
      //       label: '双皮奶'
      //     }, {
      //       value: '选项3',
      //       label: '蚵仔煎'
      //     }, {
      //       value: '选项4',
      //       label: '龙须面'
      //     }, {
      //       value: '选项5',
      //       label: '北京烤鸭'
      //     }],
      //   },
      //   {
      //     name: 'data',
      //     label: 'ip',
      //     type: 'date',
      //     dateType: 'datetime',
      //     disabled: false,
      //     placeholder: '请输入111',
      //     value: '',
      //     pickerOptions: "",
      //     defaultTime: "",
      //     format: "yyyy-MM-dd HH:mm:ss"
      //   },
      //   {
      //     name: 'datas',
      //     label: 'ip',
      //     type: 'dates',
      //     dateType: 'datetimerange',
      //     disabled: false,
      //     placeholder: '请输入1122221',
      //     value: '',
      //     pickerOptions: "",
      //     defaultTime: "",
      //     symbol: '-',
      //     format: "yyyy-MM-dd HH:mm:ss"
      //   },
      // ],
      object: {}
    }
  },
  methods: {
    clearAll() {
      this.searchInfo.forEach(res => {
        res.value = ''
      })
    },
    onSubmit() {
      this.searchInfo.forEach(res => {
        this.object[res.name] = res.value
      })
      this.$parent.getSearch(this.object)
    }
  }
}
</script>

<style scoped>

</style>