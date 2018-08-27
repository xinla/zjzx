import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import detail from '@/view/detail'
import one from '@/components/news/one'
import two from '@/components/news/two'
import three from '@/components/news/three'
import four from '@/components/news/four'
import five from '@/components/news/five'
import six from '@/components/news/six'
import seven from '@/components/news/seven'
import eight from '@/components/news/eight'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve)=>{
        require(['@/view/home.vue'],resolve)
      }
    },
    {
      path: '/inputArea',
      name: 'inputArea',
      component: (resolve)=>{
        require(['@/plugins/inputArea/index.vue'],resolve)
      }
    },
    //新闻详情页面
    {
      path: '/detail',
      name: 'detail',
       component: (resolve)=>{
        require(['@/view/detail.vue'],resolve)
      }
    },
    //搜索页面
    {
      path: '/search',
      name: 'search',
      component: (resolve)=>{
        require(['@/view/search.vue'],resolve)
      }
    },
    {
      path: '/topBarBox',
      name: 'topBarBox',
      component: (resolve)=>{
        require(['@/components/topBarBox.vue'],resolve)
      }
    },
    //会员中心首页
    {
      path:'/member',
      name:'member',
      component: (resolve)=>{
        require(['@/view/member/index.vue'],resolve)
      }      
    },
    {
      path:'/member/userCenter',
      name:'userCenter',
      component: (resolve)=>{
        require(['@/view/member/userCenter.vue'],resolve)
      }
    },
    //会员中心
    {
      path:'/memberBase',
      name:'memberBase',
      redirect:'/member',
      component: (resolve)=>{
        require(['@/view/member/memberBase.vue'],resolve)
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
        {
          path:'focus',
          name:'focus',
          component: (resolve)=>{
            require(['@/view/member/focus.vue'],resolve)
          }
        },
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
      ]
    },
    //个人中心
    {
      path:'/personBase',
      name:'personBase',
      redirect:'/personBase/published',
      component: (resolve)=>{
        require(['@/view/member/personBase.vue'],resolve)
      },
      children:[
        {
          path:'focus',
          name:'focus',
          component: (resolve)=>{
            require(['@/view/member/focus.vue'],resolve)
          }
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
        {
          path:'published',
          name:'published',
          component: (resolve)=>{
            require(['@/view/member/published.vue'],resolve)
          }
        },
      ]
    },
    //申请认证
    {
      path:'/member/identityBase',
      name:'identityBase',
      redirect:'/member/identityBase/identityIndex',
      component: (resolve)=>{
        require(['@/view/member/identityBase.vue'],resolve)
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
  ]
})
