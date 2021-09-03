<template>
    <div class="recommend">
        <div v-for="item in recommends" :key="item.background" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image"/>
                <p>{{item.title}}</p>
            </a>
        </div>
    </div>

</template>

<script>
export default {
  name:"RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [ ]
      }
    }
  },
}
</script>

<style>
    .recommend{
        display: flex;
        box-sizing: border-box;
        width:100%;
        padding:5px 0px 15px;
        text-align: center;
        border-bottom: 10px solid #eee;
    }
    .recommend-item{
        width:25%;
        box-sizing: border-box;
        padding:10px;
    }
    .recommend-item img{
        width: 100%;
        /* height: 70px; */
    }
    .recommend-item p{
        font-size:13px;
        margin-top:10px;
    }
</style>