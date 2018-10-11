<template>
  <div class="member-wrap">
    <div class="member-header">
      <!-- 未登录 -->
       <div class="member-login-way" v-if="!ifLogin">
        <h4 class="member-title">一键登录</h4>
        <ul class="clearfix">
          <li class="icon-item" v-for="item in loginArr" :key="item.id"><i class="iconfont" :class="item.class"></i></li>
        </ul>
        <router-link :to="{path:loginLink,query:{title:'用户登录'}}">
	        <div class="member-btn">
	          <button>登录/注册</button>
	        </div>
	    </router-link>
      </div>
      <!-- 已登录 -->
      <router-link :to="{ path:'/personBase/published',query:{userId,current:1} }">
	      <div class="member-login-in"  v-if="ifLogin">
	        <div class="member-user">
	          <div class="member-user-image">
	            <img :src="userPhoto" alt="用户头像">
	      		</div>
	            <div class="member-user-desc">
	              <h4 class="member-username">{{userName}}</h4>
	              <p class="member-user-item member-user-focus">关注<span>{{focusNum}}</span></p>
	              <p class="member-user-item member-user-fans">粉丝<span>{{fansNum}}</span></p>
	            </div>
	            <div class="member-user-arrow" @click="handleMember">
	              <i class="iconfont icon-arrow-right"></i>
	            </div>
	          </div>
	        </div>
	     </router-link>
      </div>
      <div class="member-desc">
        <ul class="member-desc-list">
          <router-link class="member-desc-item" v-for="item in tabArr" :key="item.id" tag="li" :to="{path:item.path,query:{current:item.query}}">
            <i class="iconfont" :class="item.class"></i>
            <span class="member-desc-txt">{{item.desc}}</span>
          </router-link>
        </ul>
      </div>
      <div class="member-body">
        <ul class="member-body-list">
          <router-link class="member-body-item" v-for="item in menuArr" :key="item.id" tag="li" :to="{path:item.path,query:{title:item.desc}}">
            <i class="iconfont icon-item" :class="item.class"></i>
            <div class="member-body-desc">
              <span>{{item.desc}}</span>
              <i class="iconfont icon-arrow-right arrow-item"></i>
              <div class="fr">
              <badge></badge>
                
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
import config from '@/lib/config/config'
import followService from '@/service/followService'

export default {
  // created() {
  //   this.$nextTick(()=>{
  //     this.loadUser();
  //     this.loadDayNight();     
  //   })  
  // },
  activated() {
  	this.$nextTick(()=>{
      this.loadUser();
      this.loadDayNight();     
  	})  
  },
  data() {
    return {
      loginArr: [
        { id: 1, class: 'icon-icon-copy' },
        { id: 2, class: 'icon-qq' },
        { id: 3, class: 'icon-weixin1' },
        { id: 4, class: 'icon-weibo1' },
      ],
      tabArr: [
        { id: 1, desc: '收藏', class: 'icon-not-collection', path: '/personBase/collect', query: 4 },
        { id: 2, desc: '历史', class: 'icon-history', path: '/personBase/history', query: 5 },
        { id: 3, desc: '夜间', class: 'icon-yejian' },
      ],
      menuArr: [
        { id: 1, desc: '消息通知', class: 'icon-my-msg', path: '/topBase/messages' },
        { id: 2, desc: '我的关注', class: 'icon-zuji', path: '/personBase/focus' },
        { id: 3, desc: '意见反馈', class: 'icon-dfabu', path: '/topBase/feedback' },
        { id: 4, desc: '系统设置', class: 'icon-setup', path: '/topBase/set' }
      ],
      loginLink: '/topBase/login',
      userId:localStorage.id,
 		  userName: '用户名',
      ifLogin: false,
      userPhoto: require('@/assets/images/userPhoto.jpg'),
      focusNum: 0,
      fansNum: 0,
      dayNight: 'day',

    }
  },
  methods: {
    loadUser(){      
      if (!localStorage.getItem('token')) {
        this.ifLogin = false;
        return;
      }
      let userImg = localStorage.userImg;
      this.userName = localStorage.userName;
      this.ifLogin = true;
      if (userImg) {
        try {
          this.userPhoto = config.fileRoot + '/' + userImg;
        } catch (err) {
          console.log(41)
        }
      }
      //获取粉丝数量
      followService.getUserVermicelliCount(data=>{
        if (data && data.status == "success" ) {
          this.fansNum = data.result.count;
        }
      });   
      //获取关注数量
      followService.getUserFollowCount(data=>{
        if (data && data.status == "success" ) {
          this.focusNum = data.result.count;
        }
      });
    },
    loadDayNight(){
      if (localStorage.dayNight) {
        if (localStorage.dayNight == 'day') {
          this.dayNight = 'day';
        } else {
          this.dayNight = 'night';
        }
      }
    },
    handleMember(){
      console.log(11111);
    },
    transArgs(link, title) {
      this.router.push({
        path: link,
        query: {
          title: title,
        }
      });
    },
    setDYNodel() {
      if (this.dayNight == "day") {
        localStorage.dayNight = "night";
        this.dayNight = "night";
      } else {
        localStorage.dayNight = "day";
        this.dayNight = "day";
      }
      // location.reload();
      history.go(0)
    }
  },
  // watch:{
  //   "$store"(){
  //     console.log(this.$store);
  //     this.loadUser();
  //   }
  // },
  // beforeRouteEnter (to, from, next) {
  //   next(vm=>{
  //     vm.loadUser();
  //   })
  // }
}

</script>
<style lang="less" scoped>
.member-header {
  padding: .3rem .4rem;
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/logo-bg.png');
  color: #fff;

  .member-login-way {
    .member-title {
      font-size: .3rem;
      line-height: .6rem;
      letter-spacing: .02rem;
    }

    ul {
      padding: .5rem 0;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      justify-content: center;

      .icon-item {
        flex: 1;
        text-align: center;

        .iconfont {
          font-size: .6rem;
          background-color: #fff;
          padding: .2rem;
          border-radius: 50%;
        }
      }

      .icon-item:first-child i {
        color: #1ab2e8;
      }

      .icon-item:nth-child(2) i {
        color: #1c999f;
      }

      .icon-item:nth-child(3) i {
        color: #06bb14;
      }

      .icon-item:last-child i {
        color: #d81e06;
      }
    }

    .member-btn {
      text-align: center;
      padding-top: .3rem;

      button {
        width: 2.4rem;
        height: .7rem;
        line-height: .7rem;
        background-color: @mainColor;
        color: #f1f1f1;
        font-size: .28rem;
        letter-spacing: .02rem;
        border-radius: .24rem;
      }
    }
  }

  .member-user {
    display: flex;
    overflow: hidden;
    padding: .15rem 0;

    .member-user-image {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: .34rem;

      img {
      	display: block;
      	width: 100%;
      	height: 100%;
        border-radius: 50%;
        border: .04rem solid @borderColor;
      }
    }

    .member-user-desc {
      padding-top: .3rem;

      .member-username {
        width: 3rem;
        max-width: 3rem;
        letter-spacing: .02rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: .3rem;
        font-size: .3rem;
      }

      .member-user-item {
        display: inline-block;
        color: #f1f1f1;
        font-size: .24rem;
        margin-right: .34rem;

        span {
          margin-left: .1rem;
        }
      }
    }

    .member-user-arrow {
      margin-left: auto;

      .iconfont {
        font-size: .45rem;
        display: block;
        line-height: 1.4rem;
      }
    }
  }
}

.member-desc {
  background-color: #fff;

  .member-desc-list {
    display: flex;
    border-bottom: .02rem solid @borderColor;
    border-top: .02rem solid @borderColor;
    padding: .18rem 0;

    .member-desc-item {
      flex: 1;
      text-align: center;

      .iconfont {
        display: block;
        margin-bottom: .13rem;
        font-size: .48rem;
      }

      .icon-not-collection {
        color: #f68f17;
      }

      .icon-history {
        color: #f65d88;
      }

      .icon-yejian {
        color: #678eff;
      }

      .member-desc-txt {
        font-size: .28rem;
        font-weight: 500;
      }

    }
  }
}

.member-body {
  margin-top: .4rem;
  padding-bottom: .4rem;

  .member-body-item {
    display: flex;
    height: .8rem;
    line-height: .8rem;
    background-color: #fff;
    border-top: .02rem solid @borderColor;

    .icon-item {
      font-size: .32rem;
      width: 1rem;
      text-align: center;
    }

    .member-body-desc {
      width: calc(100% - 1rem);
      height: 100%;
      color: #333;
      font-size: .28rem;
      border-bottom: .02rem solid @borderColor;

      .arrow-item {
        float: right;
        padding-right: .3rem;
      }
    }
  }

  .member-body-item:nth-child(2n) {
    border-top: none;
    border-bottom: .02rem solid @borderColor;
    margin-bottom: .4rem;
  }

  .member-body-item:nth-child(2n) .member-body-desc {
    border-bottom: none;
  }
}
.vux-badge-dot{
  padding: 4px;
}
</style>
