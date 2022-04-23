<template>
  <div>
    <div v-for="(item, index) in list" v-if="item.槽位id == chose">
      <el-form-item :label="item.槽位名">
        <el-checkbox-group v-if="item.数据类型 === 'checkBox'" v-model="item.槽位值">
          <el-checkbox v-for="item2 in item.槽位选项" :label="item2.value">{{ item2.label }}</el-checkbox>
        </el-checkbox-group>

        <el-input style="width: 300px" size="small" type="number" v-if="item.数据类型 === 'numberInput'"
                  v-model="item.槽位值"/>

        <el-radio-group v-if="item.数据类型 === 'radio'" v-model="item.槽位值">
          <el-radio v-for="item2 in item.槽位选项" :label="item2.value">{{ item2.label }}</el-radio>
        </el-radio-group>

        <el-select v-if="item.数据类型 === 'select'" v-model="item.槽位值" placeholder="请选择">
          <el-option
              v-for="item2 in item.槽位选项"
              :key="item2.value"
              :label="item2.label"
              :value="item2.value">
          </el-option>
        </el-select>

      </el-form-item>
      <div v-if="item.子槽位">
        <list-form :list="item.子槽位"></list-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "listForm",
  props: {
    list: Array,
    chose: Object,
  },
  mounted() {

  },
};
</script>