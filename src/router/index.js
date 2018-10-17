import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import hdNav from '../components/common/hdNav'
import newsList from '../components/news/newslist'
import shopList from '../components/shop/shoplist'
import photoList from '../components/photo/photolist'
import Map from '../components/map/Map'
import my from '../components/my/my'
import weather from '../components/weather/weather'
import shopcart from '../components/shopcart/shopcart'
import details from '../components/news/newsdetails'
import photodetails from '../components/photo/photodetalis'
import shopdetails from '../components/shop/shopdetails'
//数据请求
import Axios from 'axios'
Axios.defaults.baseURL='http://47.96.29.109/vueProject/'
Vue.prototype.$ajax = Axios
import $ from 'jquery'
Vue.prototype.$jq = $
//安装全局组件
Vue.component("hdNav",hdNav)





//ui组件库npm install mint-ui -S
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.use(Router)
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

export default new Router({
  routes: [
    {
      path: '/',
      name:'index',
      component: index
    },
    {
      path: '/news/list',
      name:"news.list",
      component:newsList
    },
    {
      path: '/photo/list',
      name:"photo.list",
      component: photoList
    },
    {
      path: '/photo/details',
      name:'photo.details',
      component: photodetails
    },
    {
      path: '/shop/list',
      name:'shop.list',
      component: shopList
    },
    {
      path: '/shop/details',
      name:'shop.details',
      component: shopdetails
    },

    {
      path: '/my',
      name:'my',
      component: my
    },
    {
      path: '/weather',
      name:'weather',
      component: weather
    },
    {
      path: '/map',
      name:'map',
      component: Map
    },
    {
      path: '/shopcart',
      name:'shopcart',
      component: shopcart
    },
    {
      path: '/news/newsdetails',
      name:'news.details',
      component: details
    },

  ]
})
