<template>
<div id="homeSwiper" class="home">
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in banners" :key="item.background">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name:"homeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [ ]
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        },
      },
      isload:true,  
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods:{
      imageLoad(){
        if(this.isload)
        {
          this.$emit('swiperImageLoad')
          this.isload=false
        }
          
      }
  }
};

</script>

<style scoped>
  img{
    width:100%;
  }
  .home >>> .swiper-pagination-bullet{
    background: #fff;
  }
  .home >>> .swiper-pagination-bullet-active{
    background:  var(--color-tint);
  }

  
</style>