import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
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
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
    	path: '/one',
    	name: 'one',
    	component: one
    },
     {
    	path: '/two',
    	name: 'two',
    	component: two
    },
     {
    	path: '/three',
    	name: 'three',
    	component: three
    },
     {
    	path: '/four',
    	name: 'four',
    	component: four
    },
     {
    	path: '/five',
    	name: 'five',
    	component: five
    },
     {
    	path: '/six',
    	name: 'six',
    	component: six
    },
     {
    	path: '/seven',
    	name: 'seven',
    	component: seven
    },
     {
    	path: '/eight',
    	name: 'eight',
    	component: eight
    },
  ]
})
