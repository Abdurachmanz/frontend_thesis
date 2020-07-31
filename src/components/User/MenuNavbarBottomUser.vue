<template>
    <b-navbar id="navbarBottom">
        <b-navbar-nav id="navMenu">
            <b-nav-item @click="Onhome" id="navDashboard">
                <div>
                <b-icon id="iconDashboard" icon="house-fill"></b-icon>
                </div>
                <span id="txtDashboard">Home</span> 
            </b-nav-item>
            <b-nav-item @click="Onprofile" id="navProfile">
                <div>
                <b-icon id="iconProfile" icon="person-fill"></b-icon>
                </div>
                <span id="txtProfile">Profile</span> 
            </b-nav-item>
            <b-nav-item @click="Oncommunity" id="navCommunity">
                <div>
                <b-icon id="iconCommunity" icon="people-fill"></b-icon>
                </div>
                <span id="txtCommunity">Community</span> 
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar> 
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    methods:{
        Onhome: function(event) {
          this.$router.push('/DashboardUser')
        },
        Onprofile: function(event) {
          this.$router.push('/ProfileUser')
        },
        Oncommunity: function(event) {
          this.$router.push('/CommunityUser')
        }, 
    }
}
</script>

<style scoped>

#navbarBottom {
    outline-style:none;
    list-style-type: none;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    max-width: 480px;
    font-size: 1em;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    transition: all 0.35s ease 0s;
    z-index: 2;
    margin: 0px;
    text-align: center;
    font-weight: 600;
    border-style: solid none none;
    border-color: rgb(222, 222, 222);
    transform: translate(-50%);
    left: 50%;
    bottom: 0px;
    position: fixed;
    line-height: 13px;
    border-width: 1px 0px 0px;
}

#navDashboard,#navCommunity,#navProfile {
    display: inline-block;
    width: 33%;
    font-size: 15px;
    cursor: pointer;
}

#iconDashboard, #iconProfile, #iconCommunity {
    max-width: 100%;
    vertical-align: middle;
}

#txtDashboard, #txtProfile, #txtCommunity {
    padding: 5px 0px 0px 0px;
    display: inline-block;
    white-space: nowrap;
}

</style>