<template>
    <b-container id="navbarTop">
        <div class="vld-parent">
            <loading 
            :active.sync="isLoading"
            :is-full-page="fullPage">
            </loading>
        </div> 
        <b-container id="navTop">
            <div>
                <span id="navtopTitle">Dashboard</span>
            </div>
            <div id="navtopAccount">
                <a>{{profil.name}}</a>
                <b-icon id="navtopPower" @click="signout" icon="power"> </b-icon>  
            </div>
        </b-container>
    </b-container>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    data(){
        return {
            profil: '',
            errors: '',
            isLoading: false,
            fullPage: true,
        }
    },
    methods:{
        firstinit(){
            this.isLoading = true
        },
         signout:function(event){
          localStorage.setItem('JSONWEBTOKEN',null)
          this.$router.push('/LoginPage')
        },
    },
    mounted() {
        this.firstinit()
            const config = {
                headers: {
                    'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                    'Content-Type': 'application/json'
                }
            }
            const profiluri = `https://isatudevapi.herokuapp.com/v1/user/current`
            axios.get(profiluri,config)
            .then(response=>{
                this.isLoading = false
                this.profil=response.data
                localStorage.setItem('name',response.data.name)
            })
            .catch(err=>{
                this.isLoading = false
                const status = JSON.parse(err.response.status)
                if (status == 401){
                    this.$router.push('/LoginPage')
                }
            })
    
    }
    
}
</script>

<style scoped>
#navbarTop {
    display: inline-block;
    background: #2c3d50 none repeat scroll 0% 0%;
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 10;
    max-width: 100%;
}

#navtopContainer {
    display: flex;
    -moz-box-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 480px;
} 

#navTop {
    max-width: 480px;
    width: 100%;
    display: flex;
    height: 60px;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: justify;
    justify-content: space-between;
    margin: 0px auto;
    box-sizing: border-box;
}

#navtopTitle {
    left: 0px;
    color:rgb(222, 222, 222);
    padding: 3px 25px;
    background-color: #546a83;
    border: medium none;
    border-radius: 4px;
    display: inline-block;
    font-weight: 600;
}

#navtopAccount {
    color:rgb(222, 222, 222);
    margin-left: 30px;
    display: inline-block;
    white-space: nowrap;
}
    

#navtopPower:hover, #navtopPower:active {
    margin-left: 5px;
    font-size: inherit;
    cursor: pointer;
}

</style>