<template>
  <div id="detail" class="detailk">
    <detail-nav-bar
      class="navbar"
      @titleClick="titleClick"
      ref="navbar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probetype="3" @scroll="contentScroll">
      
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-goods-info :goods="goods"></detail-goods-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info
        :detailInfo="detailInfo"
        @loadImgEvent="loadImgEvent"
      ></detail-info>
      <detail-params-info
        :paramInfo="paramsInfo"
        ref="params"
      ></detail-params-info>
      <detail-comment :comment="comment" ref="comment"></detail-comment>
      <goods-list :goods="recommend" ref="goods"></goods-list>    
    </scroll>
    <detail-buttom-bar @addToCart="addToCart"></detail-buttom-bar>
    <to-top @click.native="totop" v-show="istotop"></to-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailShopInfo from "./childComps/DetailShopinfo";
import DetailInfo from "./childComps/DetailInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailComment from "./childComps/DetailComment.vue";
import DetailButtomBar from "./childComps/DetailButtomBar.vue";

import GoodsList from "components/content/goodslist/GoodsList.vue";
import ToTop from "components/content/totop/ToTop.vue";
// import Toast from "components/common/toast/Toast"
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
    DetailInfo,
    DetailParamsInfo,
    DetailComment,
    GoodsList,
    DetailButtomBar,
    ToTop,

  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      comment: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      istotop: false,
      // message:'',
      // show:false
    };
  },
  created() {
    this.iid = this.$route.params.id;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      console.log(data);
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      //获取宝贝的详细信息
      this.detailInfo = data.detailInfo;
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate != 0) {
        this.comment = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      console.log(res);
      this.recommend = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop - 44);
      console.log(this.themeTopYs);
    }, 500);
  },
  methods: {
    ...mapActions(['addCart']),
    loadImgEvent() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    totop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY <= this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      this.istotop = -position.y > 1000;
    },
    //传入购物车
    addToCart(){
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.lowNowPrice
      product.iid=this.iid

      this.addCart(product).then(res =>{
        // this.show = true
        // this.message = res
        // setTimeout(()=>{
        //   this.show = false
        // },1000)
        this.$toast.show(res,1500)
      })

      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
    },
  },
};
</script>

<style scoped>
.detailk {
  /* padding-top:44px; */
  height: 100vh;
  position: relative;
  z-index: 99;
  background: #fff;
}
.navbar {
  /* position: fixed;
  top:0px;
  left:0px; */
  position: relative;
  z-index: 99;
  background: #fff;
}
.content {
  background: #fff;
  height: calc(100% - 44px);
  /* width: 100%;
  position: absolute;
  top: 44px;
  left:0px; 
  z-index: 99; */
}
</style>
