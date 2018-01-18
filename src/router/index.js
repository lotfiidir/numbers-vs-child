import Vue from 'vue'
import Router from 'vue-router'
import ListNumber from '@/components/ListNumber'
import Eval from '@/components/Eval'
import Home from '@/components/Home'
import Table from '@/components/Table'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/apprentissage',
      name: 'ListNumber',
      component: ListNumber
    },
    {
      path: '/evaluation',
      name: 'Eval',
      component: Eval
    },
    {
      path: '/apprentissage/:id',
      name: 'tableMulti',
      component: Table
    }

  ]
})
