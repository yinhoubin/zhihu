import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index'
import detail from '../components/pages/detail'
import collect from '../components/pages/collect'
import morecomment from '../components/pages/morecomment'

Vue.use(Router)

export default new Router({
  routes: [
   {
    path:"/index",
    component:index
   },
   {
   path:'/detail/:id',
   component:detail
   },
   {
   path:'/morecomment/:id',
   component:morecomment
   },
   {
    path:'/collect',
    component:collect
    },
   {
   path:'*',
   redirect:'index'
   }
  ]
})
