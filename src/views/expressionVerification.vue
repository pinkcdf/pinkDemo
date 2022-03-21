<template>
  <div>
    <el-form :model="from" ref="from">
      <el-form-item v-for="(item,index) in from.inputs" :prop="'inputs.' + index + '.value'" :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }">
        <el-input v-model="item.value" ></el-input>
      </el-form-item>
    </el-form>
    <button @click="addInput">add</button>
    <button @click="sure('from')">sure</button>
  </div>
</template>

<script>
export default {
  name: "expressionVerification",
  data(){
    return{
      rules:{
        region: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
      },
      from:{
        inputs:[
          {
            value:''
          }
        ]
      }

    }
  },
  methods:{
    addInput(){
      this.from.inputs.push({
        value:''
      })
    },
    sure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>