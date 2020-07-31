<template>
    <div>
        <div id="param">
            <h4 id="txtParameter">User Verification</h4>
        </div>
        <div id="frameParameter">
            <div id="cardDevice" class="card">
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card" v-for="user in users">
                        <div  class="card-body">
                            <div class="row">
                                <div class="col-1">
                                    <b-icon style="align: center; padding:4px" variant="success" icon="circle-fill"></b-icon>
                                </div>
                                <div class="col-5">
                                    <a style="font-size:10px"> {{user.name}} </a>
                                </div>
                                <div class="col-6">
                                     <b-button style="font-size:10px" :data-user="user.user_id" @click="verifyuser" variant="light"> Approve </b-button>
                                     <b-button style="font-size:10px" :data-userid="user.user_id" @click="checkdata" variant="light"> Check Data </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data() {
    return {
      devices:[],
      users:[],
      isLoading: false,
      fullPage: true,
      pagedevice:1,
      pageuser:1,
    }
  },
  components: {
            Loading
        },
  mounted(){
    this.firstinit(),
    this.check(),
    this.initallusers()
  },
    function () {
      ('[data-toggle="tooltip"]').tooltip()
    },
    methods: {
      initallusers(){
        const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }

                const usersuri = `https://isatudevapi.herokuapp.com/v1/alluser/need/verify/page/`+this.pageuser
                axios.get(usersuri,config)
                .then(response=>{
                  console.log(response.data)
                  this.users = response.data
               })
               .catch(err=>{
                  const status = JSON.parse(err.response.status)
                  if (status == 422){
                    alert("You Are Not Allowed")
                  }
                })
      },
      firstinit(){
          this.isLoading = true
        },
      check(){
        const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }

                const profiluri = `https://isatudevapi.herokuapp.com/v1/user/current`
                axios.get(profiluri,config)
                .then(response=>{
                  console.log(response.data)
                  this.isLoading = false
                  if (response.data.role_id != '3' ){
                    alert("You Are Not Allowed")
                    localStorage.setItem('JSONWEBTOKEN',null)
                    this.$router.push('/LoginPage')
                  }
               })
               .catch(err=>{
                 this.isLoading = false
                  const status = JSON.parse(err.response.status)
                  if (status == 401){
                    this.$router.push('/LoginPage')
                  }
                })
      },
      checkdata: function(event){
        this.isLoading = true
        localStorage.setItem('user_id_check_from_admin',event.target.getAttribute('data-userid'))
        this.isLoading = false/
        this.$router.push('/CheckDataAdmin')
      },
      verifyuser: function(event){
        this.isLoading = true
        const conf = {
                  headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
              }
      const verifyuri = "https://isatudevapi.herokuapp.com/v1/verify/user"
      const data = {
        user_id: event.target.getAttribute('data-user')
        }
        axios.post(verifyuri,data,conf).then(res=>{
          this.isLoading = false
          alert("User Has Been Verified")
          location.reload()
        }).catch(err=>{
          this.isLoading = false
          alert("Failed to Verify User")
        })
      },
    }
}
</script>

<style scoped>
#frameParameter {
    
    padding: 10px 10px;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    background-color: #f8f9fa;
    z-index: 1;
    max-height: 100%;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 5px 5px 5px 5px;  
}

#cardDevice {
    width: 100%;
    height: 100%;
}

#param {
    text-align:left;
    padding-top: 10px;
    
}

#txtParameter {    
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 0px;
    }

#listDevice {
    margin-bottom: 10px;
    text-align:left;
}

div#bodyDevice.card-body {
    padding: 10px 10px 0px 10px;
}

div.card-body {
    padding: 0px 10px;
}

div#headerDevice.card-header {
   padding: 0px;
   margin-bottom: 10px;
}

div.col-6 {
    padding: 10px;
    text-align: right;
}

div.col-1 {
    padding: 10px 10px 0px 15px;
}

div.col-5 {
    padding: 8px 10px;
}
</style>

