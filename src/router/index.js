import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Specimen from '@/components/Specimen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Specimen',
      component: Specimen
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
