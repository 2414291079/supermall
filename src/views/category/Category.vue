<template>
  <div class="category">
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
    <div class="flex">
      <categorylist-view :list="categorylist" @itemclick="itemclick"></categorylist-view>
      <categoryinfo :list="infolist"></categoryinfo>
    </div>
    
  </div>
</template>

<script>
import { getCategory,getSubcategory} from "network/category";

import NavBar from "components/common/navbar/NavBar.vue";

import categorylistView from "./childComps/categorylistView.vue";
import Categoryinfo from './childComps/categoryinfo.vue';

export default {
  name: "Category",
  data() {
    return {
      categorylist: [],
      maitKey:3627,
      infolist:[],
    };
  },
  components: {
    NavBar,
    categorylistView,
    Categoryinfo,
  },
  created() {
    this.getCategoryL();
    this.getS();
  },
  //方法
  methods: {
    itemclick(maitKey){
      this.maitKey=maitKey;
      console.log(maitKey);
      this.getS();
    },
    /*
    网络请求方法
  */
    getCategoryL() {
      getCategory().then((res) => {
        this.categorylist = res.data.category.list;
        // console.log(this.categorylist);
      });
    },
    getS(){
      getSubcategory(this.maitKey).then((res)=>{
        this.infolist=res.data.list
        console.log(this.infolist);
      })
    },
  },
};
</script>

<style scoped>
.category{
  width: 100vw;
  overflow: hidden;
  padding:44px 0 49px 0;
}
.category-nav {
  color: #fff;
  position: fixed;
  top:0;
  left:0;
}
.flex{
  display: flex;
}
</style>
