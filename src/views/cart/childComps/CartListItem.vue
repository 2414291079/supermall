<template>
  <div class="cart_list_item">
    <div class="item-selector">
      <check-button :is-checked="item.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item_img">
      <img :src="item.image" alt="" />
    </div>
    <div class="item_info">
      <p class="item_title">{{ item.title }}</p>
      <p class="item_desc">{{ item.desc }}</p>
      <span class="item_price">￥{{ item.price }}</span>
      <span class="item_count">x{{ item.count }}</span>
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue';
export default {
  components: { CheckButton },
  props: {
    item: Object
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked;
    },
    //信息点击事件
    // infoClick(item) {
    //   this.$router.push("/detail/" + item.iid);
    // }
  },
//   components: {
//     CartCheckButton
//   }
  };
</script>

<style scoped>
.cart_list_item {
  width: 100%;
  border-bottom: 1px solid rgba(128, 128, 128, 0.4);
  display: flex;
  padding: 5px;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}
.item_img {
  width: 20%;
  height: 100%;
}
.item_img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}

.item_info {
  position: relative;
  width: calc(100% - 30%);
  margin-left: 0.4rem;
}
.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item_title {
  padding-bottom: 0.5rem;
}
.item_desc {
  font-size:0.8rem;
  padding-top:6px;
  color: gray;
}
.item_price {
  position: absolute;
  left: -5px;
  bottom: 0.1rem;
  color: orangered;
}
.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}
</style>
