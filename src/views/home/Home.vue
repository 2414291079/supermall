<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      v-on:tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probetype="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        v-on:tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <to-top @click.native="totop" v-show="istotop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/homeSwiper";
import RecommendView from "./childComps/RecommendView.vue";
import featureView from "./childComps/featureView.vue";

import NavBar from "components/common/navbar/NavBar";
import tabControl from "components/common/tabControl/tabControl";
import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goodslist/GoodsList";
import ToTop from "components/content/totop/ToTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    featureView,
    NavBar,
    tabControl,
    GoodsList,
    Scroll,
    ToTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      istotop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeM();
    this.getHomeG("pop");
    this.getHomeG("new");
    this.getHomeG("sell");
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    console.log("1111");
    this.saveY = this.$refs.scroll.scroll.y;
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     *事件监听方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentType = index;
      this.$refs.tabControl2.currentType = index;
    },
    totop() {
      this.$refs.scroll.scrollTo(0, 0, 100);
    },
    contentScroll(position) {
      this.istotop = -position.y > 1000;
      this.isTabFixed = -position.y > 630;
    },
    loadMore() {
      this.getHomeG(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求的方法
     */
    getHomeM() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeG(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding: 44px 0px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  width: 100%;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
}
.tab-control {
  position: relative;
}
.content {
  width: 100%;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
[v-cloak] {
  display: none;
}
</style>
