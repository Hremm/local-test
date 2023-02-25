<template>
  <div class="person">
    <!-- src/components/Person.vue -->
    <img :src="avatar" />
    <p>{{ name }}</p>
    <i class="el-icon-error" @click="deletePerson"></i>
  </div>
</template>

<script>
export default {
  // props声明自定义属性，接收父组件传过来的参数: name  avatar
  // 一旦声明了这两个属性，
  // template中可以使用{{name}} {{avatar}}直接引用父组件传过来的参数
  props: ["name", "avatar"],
  methods: {
    /** 删除Person 监听到用户点了叉子 */
    deletePerson() {
      // 在此处需要通知父组件，用户点了叉子
      // 在当前子组件中没有办法处理，只能交给父组件来处理
      // this.$emit('del') 作用为主动触发一个自定义事件：del
      this.$emit("del");
    },
  },
};
</script>

<style lang="scss" scoped>
.person:hover i {
  display: block;
}

.person {
  width: 80px;
  text-align: center;
  display: inline-block;
  margin-right: 10px;
  position: relative;

  i {
    position: absolute;
    top: -8px;
    right: -8px;
    display: none;
  }

  img {
    width: 80px;
  }

  p {
    font-size: 0.8em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 10px;
  }
}
</style>
