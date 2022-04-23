<template>
  <div>
    <div class="list-item" v-for="(item, index) in list" :key="index">
      <div class="item-name">
        <input v-model="item.name" />
      </div>
      <div style="margin-left: 20px" v-if="item.children" class="children-item">
        <list :list="item.children"></list>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    list: Array
  }
};
</script>