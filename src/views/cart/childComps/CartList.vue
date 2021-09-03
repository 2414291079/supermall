<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item="item"></cart-list-item>
    </scroll>
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem'
export default {
  components: { 
    Scroll,
    CartListItem, 
  },
  computed:{
     ...mapGetters(
      ['cartList']
    )
  },
  activated(){
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 49px - 44px- 40px);
    position: relative;
    width: 100%;
    padding-top:44px;
    padding-bottom: 89px;
  }
  .content{
    background: #fff;
    /* width: 100%; */
    height: 100%;
    overflow: hidden;
    /* position: absolute;
    left:0px;
    top: 0px;
    bottom: 49px; */
  }
</style>