<!-- Confirm插件 -->
<template>
  <div class="confirmBox" v-show="show">
    <div class="shade" ></div>
    <div class="confirm" :class="{noMsg:msg==''}">
      <p class="title" :class="{justTitle:msg==''}" v-text="title"></p>
      <p class="msg" v-text="msg" v-if="msg!=''"></p>
      <p class="btn">
        <span v-text="cancelText" @click="cancelEvent"></span>
        <span v-text="sureText" @click="confirmEvent"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      title: '',
      msg: '',
      sureText: '',
      cancelText: '',
      sure: ()=>{},
      cancel: ()=>{}
    }
  },
  methods: {
    confirmEvent(){
      //confirm遮罩层消失时，页面恢复拖动
      document.addEventListener('touchmove', function (event) {
        window.event.returnValue = true;
      },{passive: true});

      this.show = false;
      this.sure();
    },
    cancelEvent(){
      //confirm遮罩层消失时，页面恢复拖动
      document.addEventListener('touchmove', function (event) {
        window.event.returnValue = true;
      },{passive: true});

      this.show = false;
      this.cancel();
    }
  }
}

</script>

<style lang="less">
.confirmBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.confirmBox .shade {
  background: #000;
  opacity: .4;
  width: 100%;
  height: 100%;
}
.confirmBox .confirm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 86%;
  height: 149px;
  z-index: 1000;
  border-radius: 9px;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 24px;
  animation: scaleIn 0.3s;
}
@keyframes scaleIn{
  from{
    transform: translate(-50%,-50%) scale(0.6);
  }
  to{
    transform: translate(-50%,-50%) scale(1);
  }
}
.confirmBox .noMsg {
  height: 140px;
  padding-top: 0;
}
.confirmBox .confirm .title {
  height: 18px;
  text-align: center;
  font-size: 20px;
  line-height: 1;
  color: #333333;
  margin-bottom: 12px;
}
.confirmBox .confirm .justTitle {
  height: 90px;
  text-align: center;
  font-size: 20px;
  line-height: 90px;
  color: #333333;
  margin-bottom: 0;
}
.confirmBox .confirm .msg {
  height: 21px;
  text-align: center;
  font-size: 18px;
  line-height: 21px;
  color:#525252;
  margin-bottom: 24px;
}
.confirmBox .confirm .btn {
  height: 50px;
  background: #f9f9f9;
  overflow: hidden;
}
.confirmBox .confirm .btn span {
  float: left;
  width: 50%;
  height: 50px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  color: #0199FF;
}
</style>
