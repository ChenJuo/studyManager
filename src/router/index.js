import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import List from '@/components/List'
import Jsgl from '@/components/jsgl'
import Gngl from '@/components/gngl'
import Bmgl from '@/components/bmgl'
import Rygl from '@/components/rygl'
import Listtext from '@/components/Listtext'
import Welcome from '@/components/Welcome'
import calendarplus from '@/components/calendarplus'
import SendEmail from '@/components/SendEmail'
import med from '@/components/med'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/Home',
      name:'Home',
      component:Home,
      children:[
        {
          path:'/List',
          name:'List',
          component:List
        },
        {
          path:'/jsgl',
          name:'jsgl',
          component:Jsgl
        },
        {
          path:'/gngl',
          name:'gngl',
          component:Gngl
        },
        {
          path:'/bmgl',
          name:'bmgl',
          component:Bmgl
        },
        {
          path:'/rygl',
          name:'rygl',
          component:Rygl
        },
        {
          path:'/Listtext',
          name:'Listtext',
          component:Listtext
        },
        {
          path:'/Welcome',
          name:'Welcome',
          component:Welcome
        },
        {
          path:'/calendarplus',
          name:'calendarplus',
          component:calendarplus
        },
        {
          path:'/SendEmail',
          name:'SendEmail',
          component:SendEmail
        },
        {
          path:'/med',
          name:'med',
          component:med
        }
      ]
    }
  ]
})
