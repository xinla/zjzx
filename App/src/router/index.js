import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/view/home'
// import detail from '@/view/detail'
Router.prototype.go = function () {
  this.isBack = true;
  window.history.go(-1);
}
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: (resolve)=>{
    //     require(['@/view/test.vue'],resolve)
    //   }
    // },
    //首页
    {
      path: '/',
      name: '/',
      redirect:"/home",
      component: (resolve)=>{
        require(['@/components/common/baseBottomNav.vue'],resolve)
      },
      children:[
        //文章列表首页
        {
          path: 'home',
          name: 'home',
          component: (resolve)=>{
            require(['@/view/home.vue'],resolve)
          }
        },
        //问答
        {
          path: 'questionAnswer',
          name: 'questionAnswer',
          component: (resolve)=>{
            require(['@/view/questionAnswer.vue'],resolve)
          }
        },
        //视频
        {
          path: 'video',
          name: 'video',
          component: (resolve)=>{
            require(['@/view/video.vue'],resolve)
          }
        },
        //会员中心首页
        {
          path: 'member',
          name: 'member',
          component: (resolve)=>{
            require(['@/view/member/index.vue'],resolve)
          }
        },
      ]
    },
    //新闻详情页面(浏览者视图)
    {
      path: '/detail',
      name: 'detail',
       component: (resolve)=>{
        require(['@/view/detail.vue'],resolve)
      },
    },
    //搜索页面
    {
      path: '/search',
      name: 'search',
      component: (resolve)=>{
        require(['@/view/search.vue'],resolve)
      }
    },
    //会员中心首页
    // {
    //   path:'/member',
    //   name:'member',
    //   component: (resolve)=>{
    //     require(['@/view/member/index.vue'],resolve)
    //   }      
    // },
    {
      path:'/member/userCenter',
      name:'userCenter',
      component: (resolve)=>{
        require(['@/view/member/userCenter.vue'],resolve)
      }
    },
    //二级页面
    {
      path:'/sub',
      name:'sub',
      redirect:'/member',
      component: (resolve)=>{
        require(['@/components/common/baseTop.vue'],resolve)
      },
      children:[
        
      ]
    },
    //会员中心
    {
      path:'/topBase',
      name:'topBase',
      redirect:'/member',
      component: (resolve)=>{
        require(['@/components/common/baseTop.vue'],resolve)
      },
      children:[
        {
          path:'login',
          name:'login',
          component: (resolve)=>{
            require(['@/view/member/login.vue'],resolve)
          }
        },
        {
          path:'release',
          name:'release',
          component: (resolve)=>{
            require(['@/view/member/release.vue'],resolve)
          }
        },
        // {
        //   path:'focus',
        //   name:'focus',
        //   component: (resolve)=>{
        //     require(['@/view/member/focus.vue'],resolve)
        //   }
        // },
        {
          path:'messages',
          name:'messages',
          component: (resolve)=>{
            require(['@/view/member/messages.vue'],resolve)
          }
        },
        {
          path:'feedback',
          name:'feedback',
          component: (resolve)=>{
            require(['@/view/member/feedback.vue'],resolve)
          }
        },
        {
          path:'wallet',
          name:'wallet',
          component: (resolve)=>{
            require(['@/view/member/wallet.vue'],resolve)
          }
        },
        {
          path:'set',
          name:'set',
          component: (resolve)=>{
            require(['@/view/member/set.vue'],resolve)
          }
        },
        {
          path:'about',
          name:'about',
          component: (resolve)=>{
            require(['@/view/member/about.vue'],resolve)
          }
        },
        {
          path:'agreement',
          name:'agreement',
          component: (resolve)=>{
            require(['@/view/member/agreement.vue'],resolve)
          }
        },
        {
          path:'privacy',
          name:'privacy',
          component: (resolve)=>{
            require(['@/view/member/privacy.vue'],resolve)
          }
        },
        {
          path:'copyright',
          name:'copyright',
          component: (resolve)=>{
            require(['@/view/member/copyright.vue'],resolve)
          }
        },
        {
          path:'editInfo',
          name:'editInfo',
          component: (resolve)=>{
            require(['@/view/member/editInfo.vue'],resolve)
          }      
        },
        {
          path:'idenComQuestion',
          name:'idenComQuestion',
          component: (resolve)=>{
            require(['@/view/member/idenComQuestion.vue'],resolve)
          }      
        },
        {
          path:'position',
          name:'position',
          component: (resolve)=>{
            require(['@/view/member/position.vue'],resolve)
          }      
        },
        {
          path:'province',
          name:'province',
          component: (resolve)=>{
            require(['@/view/member/province.vue'],resolve)
          }      
        },
        {
          path:'city',
          name:'city',
          component: (resolve)=>{
            require(['@/view/member/city.vue'],resolve)
          }      
        },
        {
          path:'invite',
          name:'invite',
          component: (resolve)=>{
            require(['@/view/member/invite.vue'],resolve)
          }      
        },
        {
          path:'level',
          name:'level',
          component: (resolve)=>{
            require(['@/view/member/level.vue'],resolve)
          }      
        },
        {
          path:'replyCommentList',
          name:'replyCommentList',
          component: (resolve)=>{
            require(['@/view/member/replyCommentList.vue'],resolve)
          }      
        },
      ]
    },
    //个人中心
    {
      path:'/personBase',
      name:'personBase',
      redirect:'/personBase/published',
      component: (resolve)=>{
        require(['@/components/common/basePerson.vue'],resolve)
      },
      children:[
        {
          path:'published',
          name:'published',
          component: (resolve)=>{
            require(['@/view/member/published.vue'],resolve)
          },
          // meta: {
          //   keepAlive: true,// 去缓存
          // },
        },
        {
          path:'publishedArticle',
          name:'publishedArticle',
          component: (resolve)=>{
            require(['@/view/member/publishedArticle.vue'],resolve)
          },         
        },
        {
          path:'publishedVideo',
          name:'publishedVideo',
          component: (resolve)=>{
            require(['@/view/member/publishedVideo.vue'],resolve)
          },         
        },
        {
          path:'publishedQA',
          name:'publishedQA',
          component: (resolve)=>{
            require(['@/view/member/publishedQA.vue'],resolve)
          },         
        },
        {
          path:'focus',
          name:'focus',
          component: (resolve)=>{
            require(['@/view/member/focus.vue'],resolve)
          },         
        },
        {
          path:'fans',
          name:'fans',
          component: (resolve)=>{
            require(['@/view/member/fans.vue'],resolve)
          }
        },
        {
          path:'collect',
          name:'collect',
          component: (resolve)=>{
            require(['@/view/member/collect.vue'],resolve)
          }
        },
        {
          path:'history',
          name:'history',
          component: (resolve)=>{
            require(['@/view/member/history.vue'],resolve)
          }
        },
      ]
    },
    //申请认证
    {
      path:'/identityBase',
      name:'identityBase',
      redirect:'/identityBase/identityIndex',
      component: (resolve)=>{
        require(['@/components/common/baseIdentity.vue'],resolve)
      },
      children:[
        {
          path:'identityIndex',
          name:'identityIndex',
          component: (resolve)=>{
            require(['@/view/member/identityIndex.vue'],resolve)
          }
        },
        {
          path:'identityPerson',
          name:'identityPerson',
          component: (resolve)=>{
            require(['@/view/member/identityPerson.vue'],resolve)
          }
        },
        {
          path:'identityEenterprise',
          name:'identityEenterprise',
          component: (resolve)=>{
            require(['@/view/member/identityEenterprise.vue'],resolve)
          }
        }
      ]
    }
  ],
})
