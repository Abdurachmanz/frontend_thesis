<template>
    <div>
    <MenuNavbarTopUser/>
    <MenuNavbarBottomUser/>
    <b-container id="containerMenu">
        <CommunityUserContainer/>
         <CommunityUserDownloadData/>
        <CommunityUserOwner/>
    </b-container> 
    </div>
</template>

<script>
import CommunityUserContainer from './CommunityUser Container.vue'
import CommunityUserOwner from './CommunityUser Owner.vue'
import CommunityUserDownloadData from './CommunityUser DownloadData'
import MenuNavbarBottomUser from '../MenuNavbarBottomUser.vue'
import MenuNavbarTopUser from '../MenuNavbarTopUser.vue'

export default {
    name: 'CommunityUser',
    components: {
        CommunityUserContainer,
        CommunityUserDownloadData,
        MenuNavbarBottomUser,
        MenuNavbarTopUser,
        CommunityUserOwner,
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