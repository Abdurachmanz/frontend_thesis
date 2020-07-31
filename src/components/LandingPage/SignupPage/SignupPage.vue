<template>
    <div>
        <SignupPageBackground/>
        <SignupPageContainer/>
        <SignupPageForm/>
    </div>
</template>

<script>
import SignupPageBackground from './SignupPage Background.vue'
import SignupPageForm from './SignupPage Form.vue'
import SignupPageContainer from './SignupPage Container.vue'


export default {
    name: 'Signup',
    components: {
        SignupPageBackground,
        SignupPageForm,
        SignupPageContainer,
    },
     
}
</script>

<style scoped>

</style>