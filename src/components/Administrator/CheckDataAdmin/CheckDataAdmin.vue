<template>
<div>
    <MenuNavbarTopAdmin/>
    <MenuNavbarBottomAdmin/>
    <b-container id="containerMenu">
        <CheckDataAdminContainer/>
        <CheckDataAdminForm/>
        <!-- <CheckDataAdminTable/> -->
    </b-container>
</div>
</template>

<script>
import MenuNavbarTopAdmin from '../MenuNavbarTopAdmin.vue'
import MenuNavbarBottomAdmin from '../MenuNavbarBottomAdmin.vue'
import CheckDataAdminForm from './CheckDataAdmin Form.vue'
// import CheckDataAdminTable from './CheckDataAdmin Table.vue'
import CheckDataAdminContainer from './CheckDataAdmin Container.vue'

export default {
    name: 'CheckDataAdmin',
    components: {
        MenuNavbarTopAdmin,
        MenuNavbarBottomAdmin,
        CheckDataAdminForm,
        // CheckDataAdminTable,
        CheckDataAdminContainer
    },
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