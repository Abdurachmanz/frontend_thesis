<template>
<div id="loginForm">
    <div class="vld-parent">
        <loading 
        :active.sync="isLoading"
        :is-full-page="fullPage">
        </loading>
    </div>
    <b-form @submit="auth"> 
        <b-form-group>
        <b-form-input id="formUsername" v-model="username" type="username" required placeholder="Username" class="form-control"></b-form-input>
        </b-form-group>
        <b-form-group>
        <b-form-input id="formPassword" v-model="password" type="password" required placeholder="Password" class="form-control"></b-form-input>
        </b-form-group> 
        <b-button type="login" variant="secondary" style="width:100%; max-width:333px; ">Login</b-button>
    </b-form>
    <p id="txtLogin">Don't have an account? 
        <a>
            <a @click="signup">Create an account</a>
        </a>
    </p>
</div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name:'LoginForm',
    components: {
        Loading
    },
    data() {
        return {
            username: '',
            password: '',
            isLoading: false,
            fullPage: true,
            }
        },
        components: {
            Loading
        },
        methods: {
            signup: function(event) {
                this.$router.push('/SignupPage')
            },
            auth(e) {
                e.preventDefault()
                this.isLoading = true
                const data ={
                    auth:{
                        username: this.username.toLowerCase(),
                        password: this.password
                    }
                }
                const uri = 'https://isatudevapi.herokuapp.com/v1/user/signin'
                const config = {
                    headers: {
                        'Content-Type': 'application/json'  
                    }
                }

                axios.post(uri, data,config)
                .then(response=>{
                    localStorage.setItem('JSONWEBTOKEN',response.data.jwt) //cookie.set('JSONWEBTOKEN',response.data.jwt)
                    const status = JSON.parse(response.status)
                    if (status == '200' || '201') {
                        const hhh = {
                            headers: {
                                'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN'),
                                'Content-Type': 'application/json'  
                            }
                        }
                        const profiluri = `https://isatudevapi.herokuapp.com/v1/user/current`
                        axios.get(profiluri,hhh)
                        .then(response=>{
                            this.isLoading = false
                            console.log(response.data.role_id)
                            alert("Login Successfully")
                            localStorage.setItem('profile_name',response.data.name)
                            localStorage.setItem('profile_username',response.data.username)
                            localStorage.setItem('profile_email',response.data.email)
                            localStorage.setItem('profile_verified',response.data.is_verified)
                            if (response.data.role_id == '1' || '2'){
                                this.$router.push('/DashboardUser')
                            }
                            if (response.data.role_id == '3' ){
                                this.$router.push('/DashboardAdmin')
                            }
                         })
                        .catch(err=>{
                            this.isLoading = false
                            alert("Failed to Log In")
                            })
                            }
                        })
                .catch(response=>{
                    this.isLoading = false
                     alert("Failed to Log In")
                })
            }
        }
    }
</script>

<style scoped>
#loginForm {
    outline-style:none;
    list-style-type: none;
    z-index: 2;
    display: inline-block;
    top: 250px;
    position: relative;
    text-align: center;
    padding: 8px;
    max-width: 100%;
}

#formFullname, #formUsername, #formEmail, #formPassword, #formPassconfirmation {
    display: inline-block;
    margin: auto;
    position: relative;
    padding: 10px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

#txtLogin {
    display: inline-block;
    color: rgb(222, 222, 222);
    margin: 15px;
    max-width: 100%;
}


a:active, a:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>