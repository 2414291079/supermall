<template>
  <div class="categorylist">
    <scroll class="content">
      <div
        v-for="(item, index) in list"
        :key="item.maitKey"
        class="list"
        @click="itemclick(index,item.maitKey)"
        :class="{ active: index === currentIndex }"
      >
        <span>{{ item.title }}</span>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  components: { Scroll },
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  // activated() {
  //   this.$refs.listscroll.refresh()
  // },
  methods: {
    itemclick(index,maitKey) {
      this.currentIndex = index;
      this.$emit("itemclick",maitKey)
    },
  },
};
</script>

<style scoped>
.categorylist {
  background: #eee;
  height: calc(100vh - 44px - 49px);
  position: relative;
  top:0;
  left:0;
  width: 21vw;
}
.content {
  background: #eee;
  position: absolute;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
  /* height: 100vh; */
}
.list {
  width: 21vw;
  text-align: center;
  padding: 19% 0;
  box-sizing: border-box;
  font-size:1rem;
  
   /* touch-action: none;  */
}
.active {
  border-left: 2px solid var(--color-tint);
  color: var(--color-tint);
  background: #fff;
  font-weight: bold; 
}
</style>>
