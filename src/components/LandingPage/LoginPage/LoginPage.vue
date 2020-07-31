<template>
    <div>
        <LoginPageBackground/>
        <LoginPageContainer/>
        <LoginPageForm/>
    </div>
</template>

<script>
import LoginPageBackground from './LoginPage Background.vue'
import LoginPageForm from './LoginPage Form.vue'
import LoginPageContainer from './LoginPage Container.vue'

export default {
    name: 'Login',
    components: {
        LoginPageBackground,
        LoginPageForm,
        LoginPageContainer
    }
}
</script>

<style scoped>

</style>