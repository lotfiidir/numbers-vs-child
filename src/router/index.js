import Vue from 'vue'
import Router from 'vue-router'
import ListNumber from '@/components/ListNumber'
import Eval from '@/components/Eval'
import Home from '@/components/Home'
import Table from '@/components/Table'
import evaluationComponent from '@/components/evaluationComponent'
import homeEvalution from '@/components/homeEvalution'
import Recap from '@/components/Recap'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/apprentissage',
      name: 'ListNumber',
      component: ListNumber,
    },
    {
      path: '/apprentissage/:id(\\d{1}|10)',
      name: 'tableMulti',
      component: Table,
    },
    {
      path: '/apprentissage/:id/recap',
      name: 'recap',
      component: Recap
    },
    {
      path: '/evaluation',
      name: 'homeEvalution',
      component: homeEvalution
    },
    {
      path: '/evaluation/:id(\\d{1}|10)',
      name: 'evaluation',
      component: evaluationComponent,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
