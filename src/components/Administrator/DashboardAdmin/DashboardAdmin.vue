<template>
    <div>
        <MenuNavbarTopAdmin/>
        <MenuNavbarBottomAdmin/>
        <b-container id="containerMenu">
            <DashboardAdminVerify/>
        </b-container>
    </div>
</template>

<script>
import DashboardAdminVerify from './DashboardAdmin Verify.vue'
import MenuNavbarBottomAdmin from '../MenuNavbarBottomAdmin.vue'
import MenuNavbarTopAdmin from '../MenuNavbarTopAdmin.vue'
export default {
    name: 'DashboardAdmin',
    components: {
        DashboardAdminVerify,
        MenuNavbarTopAdmin,
        MenuNavbarBottomAdmin
    }
}
</script>

<style scoped>
#containerMenu {
    background-color: #EBE9FF;
    width: 100%;
    padding: 0px 26px 80px;
    /* padding: 0px 0px 80px; */
    box-sizing: border-box;
    min-height: calc(-60px + 100vh);
    position: relative;
    top: 60px;
    max-width: 480px;
    margin: 0px auto;  
}
</style>