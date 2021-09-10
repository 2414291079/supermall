<template>
    <div class="tabControl">
        <div v-for="(item,index) in titles" :key="item" class="tabit" :class="{active:index === currentIndex}"
            @click="itemclick(index)">
            <span>{{item}}</span>
        </div> 
    </div>
</template>

<script>
export default {
    name:"tabControl",
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemclick(index){
            this.currentIndex=index;
            this.$emit('tabClick',index); 
        }
    }


}
</script>

<style scoped>
    .tabControl{
        z-index: 5;
        display:flex;
        background: #fff;
    }
    .tabit{
        flex:1;
        text-align: center;
        height: 40px;
        line-height: 40px;
    }
    span{
        padding:5px;
    }
    .active{
        color:var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-high-text);
    }

</style>