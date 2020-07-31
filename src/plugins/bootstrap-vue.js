import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BContainer } from 'bootstrap-vue'
import { LayoutPlugin } from 'bootstrap-vue'
import { ImagePlugin } from 'bootstrap-vue'
import { BImg } from 'bootstrap-vue'
import { BNavbar } from 'bootstrap-vue'


import { CarouselPlugin } from 'bootstrap-vue'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
Vue.use(CarouselPlugin)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

import { NavbarPlugin } from 'bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import responsive from 'vue-responsive'
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(responsive)
Vue.use(NavbarPlugin)
Vue.component('b-navbar', BNavbar)
Vue.component('b-container', BContainer)
Vue.component('b-img', BImg)
Vue.use(LayoutPlugin)
Vue.use(BootstrapVue)
Vue.use(ImagePlugin)