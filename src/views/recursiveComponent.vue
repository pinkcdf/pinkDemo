<template>
  <div>
    <!--    <div class="list-item" v-for="(item, index) in list" :key="index">-->
    <!--      <div class="item-name">-->
    <!--        <span>{{item.name}}</span>-->
    <!--      </div>-->
    <!--      <div v-if="item.children" class="children-item">-->
    <!--        <list style="margin-left: 20px" :list="item.children"></list>-->
    <!--      </div>-->
    <!--    </div>-->
        <button @click="out">log</button>


    <el-form>
      <div v-for="(item, index) in list">
        <el-form-item :label="item.槽位名">
          <el-checkbox-group v-if="item.数据类型 === 'checkBox'" v-model="item.槽位值">
            <el-checkbox v-for="item2 in item.槽位选项" :label="item2.value">{{ item2.label }}</el-checkbox>
          </el-checkbox-group>

          <el-input style="width: 300px" size="small" type="number" v-if="item.数据类型 === 'numberInput'"
                    v-model="item.槽位值"/>

          <el-radio-group v-if="item.数据类型 === 'radio'" v-model="item.槽位值">
            <el-radio v-for="item2 in item.槽位选项" :label="item2.value">{{ item2.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="item.子槽位">
          <list-form :list="item.子槽位" :chose="item.槽位值"></list-form>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import List from "../components/list";
import ListForm from "../components/listForm";

export default {
  name: "recursiveComponent",
  components: {ListForm, List},
  data() {
    return {
      // list: [{
      //   name: "经济",
      //   children: [{
      //     name: "如家",
      //     children: [{
      //       name: "上江路-如家",
      //       children: [
      //         {
      //           name: "经济",
      //           children: [
      //             {
      //               name: "经济",
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //       {
      //         name: "望江路-如家"
      //       }]
      //   }, {
      //     name: "7天",
      //     children: [{
      //       name: "长江路-7天"
      //     },
      //       {
      //         name: "望江路-7天"
      //       }]
      //   },
      //   ]
      // },
      //   {
      //     name: "经济",
      //     children: [{
      //       name: "如家",
      //       children: [{
      //         name: "上江路-如家",
      //         children: [
      //           {
      //             name: "经济",
      //             children: [
      //               {
      //                 name: "经济",
      //               }
      //             ]
      //           }
      //         ]
      //       },
      //         {
      //           name: "望江路-如家"
      //         }]
      //     }, {
      //       name: "7天",
      //       children: [{
      //         name: "长江路-7天"
      //       },
      //         {
      //           name: "望江路-7天"
      //         }]
      //     },
      //     ]
      //   }],
      list: '',
      a: [1, 2]
    }
  },
  mounted() {
    this.list = JSON.parse('[{\n' +
        '    "槽位id":1,\n' +
        '    "父级槽位id": 0,\n' +
        '    "槽位名": "存证",\n' +
        '    "数据类型": "radio",\n' +
        '    "槽位选项": [{"value":2,"label":"存证图片"}, {"value":3,"label":"存证视频"}],\n' +
        '    "槽位值": "", \n' +
        '    "单位": "",\n' +
        '    "子槽位":[\n' +
        '        {\n' +
        '            "槽位id": 2,\n' +
        '            "父级槽位id": 1,\n' +
        '            "槽位名": "存证图片张数",\n' +
        '            "数据类型": "numberInput",\n' +
        '            "槽位选项": [],\n' +
        '            "槽位值": "3",\n' +
        '            "单位": "张/秒",\n' +
        '            "子槽位": []\n' +
        '        },\n' +
        '        {\n' +
        '            "槽位id": 3,\n' +
        '            "父级槽位id": 1,\n' +
        '            "槽位名": "存证视频前后延展时长",\n' +
        '            "数据类型": "numberInput",\n' +
        '            "槽位选项": [],\n' +
        '            "槽位值": "30",\n' +
        '            "单位": "秒",\n' +
        '            "子槽位": []\n' +
        '        }\n' +
        '    ]\n' +
        '}]')
    // this.list.槽位值 = JSON.parse(this.list.槽位值)
    console.log(this.list)
  },
  methods: {
    out() {
      console.log(this.list)
    }
  }
}
</script>

<style scoped>

</style>