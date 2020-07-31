<template>
<div>
    <MenuNavbarTopUser/>
    <MenuNavbarBottomUser/>
    <b-container id="containerMenu">
        <ProfileUserContainer/>
        <ProfileUserForm/>
        <ProfileUserTable/>
    </b-container>
</div>
</template>

<script>
import MenuNavbarTopUser from '../MenuNavbarTopUser.vue'
import MenuNavbarBottomUser from '../MenuNavbarBottomUser.vue'
import ProfileUserForm from './ProfileUser Form.vue'
import ProfileUserTable from './ProfileUser Table.vue'
import ProfileUserContainer from './ProfileUser Container.vue'

export default {
    name: 'ProfileUser',
    components: {
        MenuNavbarTopUser,
        MenuNavbarBottomUser,
        ProfileUserForm,
        ProfileUserTable,
        ProfileUserContainer
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