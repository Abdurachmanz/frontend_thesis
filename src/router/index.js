import Vue from 'vue'
import Router from 'vue-router'
import SignupPage from '@/components/LandingPage/SignupPage/SignupPage'
import LandingPage from '@/components/LandingPage/LandingPage'
import LoginPage from '@/components/LandingPage/LoginPage/LoginPage'
import ProfileUser from '@/components/User/ProfileUser/ProfileUser'
import DashboardUser from '@/components/User/DashboardUser/DashboardUser'
import DashboardAdmin from '@/components/Administrator/DashboardAdmin/DashboardAdmin'
import CommunityAdmin from '@/components/Administrator/CommunityAdmin/CommunityAdmin'
import CheckDataAdmin from '@/components/Administrator/CheckDataAdmin/CheckDataAdmin'
import CommunityUser from '@/components/User/CommunityUser/CommunityUser'
import MenuNavbarBottomUser from '@/components/User/MenuNavbarBottomUser'
import MenuNavbarTopUser from '@/components/User/MenuNavbarTopUser'
import MenuNavbarBottomAdmin from '@/components/Administrator/MenuNavbarBottomAdmin'
import MenuNavbarTopAdmin from '@/components/Administrator/MenuNavbarTopAdmin'
import AddDeviceUser from '@/components/User/AddDeviceUser/AddDeviceUser'
import SeeDataUser from '@/components/User/SeeDataUser/SeeDataUser'

Vue.use(Router)

export default new Router
    ({
        routes: [{
                path: '/',
                name: 'LandingPage',
                component: LandingPage
            },
            {
                path: '/SignupPage',
                name: 'SignupPage',
                component: SignupPage
            },
            {
                path: '/LoginPage',
                name: 'LoginPage',
                component: LoginPage
            },
            {
                path: '/DashboardUser',
                name: 'DashboardUser',
                component: DashboardUser
            },
            {
                path: '/ProfileUser',
                name: 'ProfileUser',
                component: ProfileUser
            },
            {
                path: '/CommunityUser',
                name: 'CommunityUser',
                component: CommunityUser
            },
            {
                path: '/DashboardAdmin',
                name: 'DashboardAdmin',
                component: DashboardAdmin
            },
            {
                path: '/CheckDataAdmin',
                name: 'CheckDataAdmin',
                component: CheckDataAdmin
            },
            {
                path: '/CommunityAdmin',
                name: 'CommunityAdmin',
                component: CommunityAdmin
            },
            {
                path: '/MenuNavbarBottomAdmin',
                name: 'MenuNavbarBottomAdmin',
                component: MenuNavbarBottomAdmin
            },
            {
                path: '/MenuNavbarBottomUser',
                name: 'MenuNavbarBottomUser',
                component: MenuNavbarBottomUser
            },
            {
                path: '/MenuNavbarTopUser',
                name: 'MenuNavbarTopUser',
                component: MenuNavbarTopUser
            },
            {
                path: '/MenuNavbarTopAdmin',
                name: 'MenuNavbarTopAdmin',
                component: MenuNavbarTopAdmin
            },
            {
                path: '/AddDeviceUser',
                name: 'AddDeviceUser',
                component: AddDeviceUser
            },
            {
                path: '/SeeDataUser',
                name: 'SeeDataUser',
                component: SeeDataUser
            },
        ]
    })