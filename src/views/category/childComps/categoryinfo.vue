<template>
<div class="info">
  <scroll class="scroll" ref="scroll">
    <div class="flex">
    <div v-for="(item, index) in list" :key="index" class="item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="categorylistimg"/>
        <p>{{ item.title }}</p>
      </a>
      </div>
    </div>
  </scroll>
</div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

// import { debounce } from "common/utils";
export default {
  components: { Scroll },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return {
      timer:null
    }
  },
  updated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, 0, 0);
  },
  methods:{
    
    categorylistimg(){
      // debounce(this.$refs.scroll.refresh(),100)
      
      // return function (...args){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
      this.$refs.scroll.refresh()
      // console.log("防抖");
      },100)
    // }
    }
  }
};
</script>

<style scoped>
.info{
  position: relative;
  top:0;
  left:0;
  height: calc(100vh - 44px - 49px);
  width: 79vw;
  margin: 1% 0 0 1%;
}
.flex{
  display: flex;
  flex-wrap: wrap;
}
/* .scroll > .content{
  display: flex;
  flex-wrap: wrap;
} */
.scroll{
  width:79vw;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.item {
  width:33%;
  box-sizing: border-box;
  font-size: 0.8em;
  text-align: center;
  padding: 2.5%;
  
}
.item img {
  width: 90%;
  margin: 0 auto;
}
</style>