<template>
  <div id="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>


<script>
import NavBar from "components/common/navbar/NavBar.vue";
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,

  },
  computed:{
     ...mapGetters({
       length:'cartLength',
     })
  }
};
</script>

<style scoped>
#cart{
  height: 100vh;
  position: relative;
}
.navbar {
  background: var(--color-tint);
  color: #fff;
  position:fixed;
  width: 100%;
}
</style>
