import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ShareLinkPage from '@/components/ShareLinkPage'
import ContactPage from '@/components/ContactPage'
import MusicPage from '@/components/MusicPage'
import UploadPage from '@/components/UploadPage'
import MoneyPage from '@/components/MoneyPage'
import OpinionPage from '@/components/OpinionPage'
import SubmitPage from '@/components/SubmitPage'
import ArticlePage from '@/components/ArticlePage'
import ToolPage from '@/components/ToolPage'

Vue.use(Router) //全局router

export default new Router({
  //路由数组
  routes: [
    //每一个链接都是一个对象
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/sharelink',
      name: 'ShareLinkPage',
      component: ShareLinkPage
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage,
      children:[
        {
          path: '/upload',
          name: 'UploadPage',
          component: UploadPage
        },
        {
          path: '/money',
          name: 'MoneyPage',
          component: MoneyPage
        },
        {
          path: '/article',
          name: 'ArticlePage',
          component: ArticlePage
        },
        {
          path: '/opinion',
          name: 'OpinionPage',
          component: OpinionPage
        },
        {
          path: '/submit',
          name: 'SubmitPage',
          component: SubmitPage
        },
        {
          path: '/tool',
          name: 'ToolPage',
          component: ToolPage
        }
      ]
    },
    {
      path: '/share',
      name: 'MusicPage',
      component: MusicPage
    }
  ]
})
