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
        require(['@/components/topBarBox/index.vue'],resolve)
      }
    },
    {
      path:'/member',
      name:'member',
      component: (resolve)=>{
        require(['@/view/member/index.vue'],resolve)
      }      
    },
     {
      path:'/login',
      name:'login',
      component: (resolve)=>{
        require(['@/view/login.vue'],resolve)
      }
    },
    {
      path:'/memberDetail',
      name:'memberDetail',
      component:(resolve)=>{
        require(['@/view/member/memberDetail.vue'],resolve)
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
        }
      ]
    },
  ]
})
