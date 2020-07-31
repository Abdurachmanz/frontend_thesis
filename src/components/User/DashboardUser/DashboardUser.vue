<template>
<div>
    <MenuNavbarTopUser/>
    <MenuNavbarBottomUser/>
    <b-container id="containerMenu">
    <!-- <DashboardContainer/> -->
        <DashboardParameter/>
        <DashboardDevice/>
    </b-container>
</div>
   
   
</template>

<script>
// import DashboardContainer from './DashboardUser Container.vue'
import MenuNavbarTopUser from '../MenuNavbarTopUser.vue'
import MenuNavbarBottomUser from '../MenuNavbarBottomUser.vue'
import DashboardParameter from './DashboardUser Parameter.vue'
import DashboardDevice from './DashboardUser Device.vue'

export default {
    name: 'DashboardUser',
    components: {
        DashboardParameter,
        // DashboardContainer,
        MenuNavbarTopUser,
        MenuNavbarBottomUser,
        DashboardDevice
    },
}
</script>

<style scoped>
#containerMenu {
    background-color: #EBE9FF;
    width: 100%;
    padding: 0px 16px 80px;
    padding-right: 36px;
    /* padding: 0px 0px 80px; */
    box-sizing: border-box;
    min-height: calc(-60px + 100vh);
    position: relative;
    top: 60px;
    max-width: 480px;
    margin: 0px auto;
    
}

</style>