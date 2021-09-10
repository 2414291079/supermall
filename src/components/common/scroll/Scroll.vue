<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  // components:{
  //   BScroll,
  // },
  data() {
    return {
      scroll: null,
    };
  },
  props:{
    probetype:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false 
    },
      
  },
  mounted() {
    (this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      probeType:this.probetype,
      pullUpLoad: this.pullUpLoad,
    }))
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
      if(this.pullUpLoad){
         this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        })
      }
     
  },
  methods: {
    scrollTo(x, y, time) {    
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      // console.log("上拉刷新了");
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
      // console.log("刷新了");
    }
  },
};
</script>

<style scoped>
.wrapper{
  height: 100%;
}
</style>