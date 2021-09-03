<template>
<nav-bar>
  <div slot="left" class="left" @click="back">
    <img src="~assets/img/common/back.svg" alt="">
  </div>
  <div slot="center" class="title">
    <div  v-for="(item,index) in titles" 
    :key="index" 
    class="title-item" 
    :class="{active:index===currentIndex}" 
    @click="titleClick(index)">
      {{item}}
    </div>
    
  </div>
</nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar,
  },
  methods: {
    titleClick(index){
      this.currentIndex = index;
      this.$emit('titleClick',index);
    },
    back(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
}
.title-item{
  flex:1;
  font-size:13px;
}
.active{
  color:var(--color-tint);
}
.left{
  text-align: center;
  margin-top:6px;
}
</style>