<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
        :is-checked="isSelectAll"
        @click.native="checkClick"
        ></check-button>
      <span >全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
        去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: { CheckButton },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+this.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item =>item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0) return false
      return !(this.cartList.filter(item => !item.checked).length)
    }
  },
  methods:{
    checkClick(){
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
  .is-checked{
    background: red;
  }
  .bottom-bar{
    height: 40px;
    background:#eee;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom:48px;
    width:100% ;
  }
  .check-content{
    display: flex;
    margin-top:8px;
    margin-left:10px;
    font-size:14px
  }
  .check-button{
    align-items: center;
    margin-top: 2px;
    width:20px;
    line-height: 20px;
    
  }
  span{
    padding:5px;
  }
  .price{
    position: relative;
    left:-10%;
    margin:1px 0 0 0px;
    line-height: 40px;
  }
  .calculate{
    background: orange;
    line-height: 40px;
    text-align: center;
    width: 30%;
    color: #fff;
  }
</style>