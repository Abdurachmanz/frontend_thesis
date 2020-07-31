<template>
<div>
    <MenuNavbarTopUser/>
    <MenuNavbarBottomUser/>
    <b-container id="containerMenu">
 
    <SeeDataUserChart/>
    </b-container>
</div>
   
   
</template>

<script>

import MenuNavbarTopUser from '../MenuNavbarTopUser.vue'
import MenuNavbarBottomUser from '../MenuNavbarBottomUser.vue'
import SeeDataUserChart from './SeeDataUser Chart.vue'


export default {
    name: 'SeeDataUser',
    components: {
        SeeDataUserChart,
        MenuNavbarTopUser,
        MenuNavbarBottomUser,
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