<template>
<div id="signupForm">
        <div class="vld-parent">
                <loading 
                :active.sync="isLoading"
                :is-full-page="fullPage">
                </loading>
        </div>
        <b-form @submit="onSubmit">
            <b-form-group>
            <b-form-input id="formFullname" v-model="fullname" type="fullname" required placeholder="Full Name" class="form-control"></b-form-input>
            </b-form-group>
            <b-form-group>
            <b-form-input id="formEmail" v-model="email" type="email" required placeholder="Email" class="form-control"></b-form-input>
            </b-form-group>
            <b-form-group>
            <b-form-input id="formUsername" v-model="username" type="username" required placeholder="Username" class="form-control"></b-form-input>
            </b-form-group>
            <b-form-group>
            <b-form-input id="formPassword" v-model="password" type="password" required placeholder="Password" class="form-control"></b-form-input>
            </b-form-group>
            <b-form-group>
            <b-form-input id="formPassconfirmation" v-model="password_confirmation" type="password" required placeholder="Retype Password" class="form-control"></b-form-input>
            </b-form-group>
            <b-form-group id="formCheckbox" align="left">
                <b-form-checkbox-group v-model="checked" id="checkbox">
                    <b-form-checkbox value="i-agree-with-terms-and-conditions">I agree with terms and conditions</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            <b-button type="sign-up" variant="secondary" style="width:333px;" >Sign Up</b-button>
        </b-form>
        <p id="txtLogin">Already have an account? 
            <a>
                <a @click="login">Login here</a>
            </a>
        </p>
</div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: 'SignupForm',
    components: {
        Loading
    },
   data() {
      return {
        fullname:'',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        isLoading: false,
        fullPage: true,
      }
    },
    methods: {
      login(e){
          this.$router.push('/LoginPage')
      },
      onSubmit(e) {
          this.isLoading = true
        e.preventDefault()
        const data = {
            name: this.fullname,
            email: this.email,
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation
        }
        const uri = 'https://isatudevapi.herokuapp.com/v1/user/signup'
        const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
        axios.post(uri,data,config)
        .then(response=>{
            this.isLoading = false
            const status = JSON.parse(response.status)
            if (status == '200' || '201') {
                alert("Sign Up Successfully, Please Check Your Email.")
                this.$router.push('/LoginPage')
            }
        })
        .catch(err=>{
            this.isLoading = false
            alert("Failed to Sign Up")
            }
            )

      }
    }      
}
</script>

<style scoped>
#signupForm {
    outline-style:none;
    list-style-type: none;
    z-index: 2;
    display: inline-block;
    top: 150px;
    position: relative;
    text-align: center;
    padding: 8px;
    max-width: 100%;
}

#formFullname, #formUsername, #formEmail, #formPassword, #formPassconfirmation {
    display: inline-block;
    position: relative;
    padding: 10px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

#checkbox {
    display: inline-block;
    color: rgb(222, 222, 222);
    max-width: 100%;
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