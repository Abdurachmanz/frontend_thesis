<template>
<div id="frameParameter">
            <table style="text-align:left">
                <tr>
                    <td> Name </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{name}} </td>
                </tr>
                <tr>
                    <td> Email </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{email}} </td>
                </tr>
                <tr>
                    <td> Username </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{username}} </td>
                </tr>
                <tr>
                    <td> Verified </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{verified}} </td>
                </tr>
            </table>
</div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
     data() {
        return {
            name:localStorage.getItem('profile_name'),
            username:localStorage.getItem('profile_username'),
            email:localStorage.getItem('profile_email'),
            verified:'',
        }
    },
    methods: {
        firstinit(){
          this.isLoading = true
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
      const uri = 'https://isatudevapi.herokuapp.com/v1/userdaycounter/user'
      axios.get(uri,config).then(res=>{
        this.isLoading = false
        this.items = res.data
      }).catch(err=>{
        this.isLoading = false
        const status = JSON.parse(err.response.status)
                  if (status == 401){
                    this.$router.push('/LoginPage')
                  }
      })
      const profiluri = `https://isatudevapi.herokuapp.com/v1/user/current`
                axios.get(profiluri,config)
                .then(response=>{
                  this.isLoading = false
                  this.verified = response.data.is_verified
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
#frameParameter {
    padding: 10px 10px;
    padding-top: 0px;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    z-index: 1;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
}
</style>