<!-- Loading插件 -->
<template>
  <div class="loading" v-show="show">
    <em v-if="type==='page'"></em>
    <img src="@/assets/images/icon_loading@3x.png" class="page_loading" v-if="type==='page'">
    <i v-else><img src="@/assets/images/smallloading@3x.png"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type:'page',
      show: false,
    }
  }
};
</script>

<style lang="less">
.loading {
  width: 100%;
  height:100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading em{
  position: absolute;
  left:0;
  width: 100%;
  background-color: #fff;
}
.loading img.page_loading {
  width: 72px;
  height: 72px;
  animation: rotator 1s linear infinite;
}
.loading i{
  padding: 12px;
  border-radius: 50%;
  // background-color: rgba(0,0,0,0.72);
}
.loading i img{
  width: 48px;
  height: 48px;
  animation: rotator 1s linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
