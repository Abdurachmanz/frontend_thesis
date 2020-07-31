<template>
<div>
    <MenuNavbarTopUser/>
    <MenuNavbarBottomUser/>
    <b-container id="containerMenu">
        <AddDeviceUserContainer/>
        <AddDeviceUserMap/>
        <!-- <AddDeviceUserTable/> -->
        <!-- <AddDeviceUserConfirmation/> -->
    </b-container> 
</div>
</template>

<script>
import MenuNavbarBottomUser from '../MenuNavbarBottomUser.vue'
import MenuNavbarTopUser from '../MenuNavbarTopUser.vue'
import AddDeviceUserContainer from './AddDeviceUser Container.vue'
// import AddDeviceUserConfirmation from './AddDeviceUser Confirmation.vue'
import AddDeviceUserMap from './AddDeviceUser Map.vue'
// import AddDeviceUserTable from './AddDeviceUser Table.vue'

export default {
    name: 'AddDevice',
    components: {
        MenuNavbarTopUser,
        MenuNavbarBottomUser,
        AddDeviceUserMap,
        // AddDeviceUserTable,
        // AddDeviceUserConfirmation,
        AddDeviceUserContainer
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