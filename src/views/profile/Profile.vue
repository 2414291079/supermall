<template>
  <div>
    <nav-bar class="nav"><div slot="center">个人</div></nav-bar> 
    <button class="user">点击登录</button>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'

export default {
  name: "Profile",
  components:{
    NavBar

  }
}
</script>

<style scoped>
  .nav{
    color:#fff;
  }
  .user{
    display: block;
    margin:20% auto;
    width:50%;
    padding:30px 0px;
    background: rgb(22, 226, 22);
    border-radius: 10%;
    color: #fff;
  }
</style>
