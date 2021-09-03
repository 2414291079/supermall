<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  width:100%;
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  z-index: 9;
  bottom:-1px;
  left:0;
  box-shadow: 0 -3px 5px rgba(100,100,100,0.2);
}

</style>
