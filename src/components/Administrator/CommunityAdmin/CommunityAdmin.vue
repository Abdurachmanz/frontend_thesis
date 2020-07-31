<template>
    <div>
    <MenuNavbarTopAdmin/>
    <MenuNavbarBottomAdmin/>
    <b-container id="containerMenu">
        
        <CommunityAdminContainer/>
         <CommunityAdminDownloadData/>
        <!-- <CommunityAdminMap/> -->
       
        <CommunityAdminOwner/>
        <!-- <CommunityAdminTable/> -->
    </b-container> 
    </div>
</template>

<script>
import CommunityAdminContainer from './CommunityAdmin Container.vue'
import CommunityAdminOwner from './CommunityAdmin Owner.vue'
import CommunityAdminDownloadData from './CommunityAdmin DownloadData'
import MenuNavbarBottomAdmin from '../MenuNavbarBottomAdmin.vue'
import MenuNavbarTopAdmin from '../MenuNavbarTopAdmin.vue'

export default {
    name: 'CommunityAdmin',
    components: {
        CommunityAdminContainer,
        CommunityAdminDownloadData,
        MenuNavbarBottomAdmin,
        MenuNavbarTopAdmin,
        CommunityAdminOwner,
    }
}
</script>

<style scoped>
#containerMenu {
    background-color: #EBE9FF;
    width: 100%;
    padding: 0px 16px 80px;
    /* padding: 0px 0px 80px; */
    box-sizing: border-box;
    min-height: calc(-60px + 100vh);
    position: relative;
    top: 60px;
    max-width: 480px;
    margin: 0px auto;  
}
</style>