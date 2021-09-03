<template>
  <div id="detailSwiper" class="detail">
    <swiper ref="mySwiper" :options="swiperOptions" class="swiper">
      <swiper-slide v-for="(item,index) in topImages" :key="index">
          <img :src="item"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
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
      isload: true,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
.swiper{
  height: 300px;
  overflow: hidden;
}
.detail{
  height: 300px ;
}
.detail >>> .swiper-pagination-bullet {
  background: #fff;
}
.detail >>> .swiper-pagination-bullet-active {
  background: var(--color-tint);
}
</style>