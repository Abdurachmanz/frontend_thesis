<template>
<div>
<div id="frameParameter">
            <table style="text-align:left">
                <tr>
                    <td> Name </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{user.name}} </td>
                </tr>
                <tr>
                    <td> Email </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{user.email}} </td>
                </tr>
                <tr>
                    <td> Username </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{user.username}} </td>
                </tr>
                <tr>
                    <td> Verified </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> {{user.is_verified}} </td>
                </tr>
                <tr>
                    <td> Action </td>
                    <td style="padding: 0px 20px 0px 50px"> : </td>
                    <td> <b-button style="font-size:10px" :data-user="user.user_id" @click="verifyuser" variant="light"> Approve </b-button> </td>
                </tr>
            </table>
            <div id="frameTable">
              <b-table
                id="my-table"
                :fields="fields"
                :items="items"
                small
                outlined
                striped
                hover
                style="font-size:10px;">
              </b-table>
    </div>
</div>
</div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {

    function () {
      ('[data-toggle="tooltip"]').tooltip()
    },
    data () {
        return {
        isLoading: false,
        fullPage: true,
        items: [],
        fields:[
          {
            key: 'device_id',
            label: 'Device'
          },
          {
            key: 'counter_day',
            label: 'Day'
          },
          {
            key: 'created_at',
            label: 'Checked At',
            formatter: value=>{
              return moment(value,'YYYY-MM-DDTHH:mm:ssZ').format('DD MMMM YYYY hh:mm:ss a')
            }
          }
        ],
        user:null,
    }
    },
    components: {
            Loading
        },
    mounted() {
      this.firstinit()
      const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }
      const uri = 'https://isatudevapi.herokuapp.com/v1/userdaycounter/admin/see/'+localStorage.getItem('user_id_check_from_admin')
      axios.get(uri,config).then(res=>{
        this.isLoading = false
        this.items = res.data.counter
        this.user = res.data.userdevices
        console.log('data : ',res.data)
      }).catch(err=>{
        this.isLoading = false
        const status = JSON.parse(err.response.status)
        if (status == 401){
          this.$router.push('/LoginPage')
        }
        if (status == 422){
          alert("You Are Not Allowed")
         localStorage.setItem('JSONWEBTOKEN',null)
         this.$router.push('/LoginPage')
        }
      })
    },
      methods: {
        firstinit(){
          this.isLoading = true
        },
        Onhome: function(event) {
          this.$router.push('/DashboardAdmin')
        },
        Oncommunity: function(event) {
          this.$router.push('/CommunityAdmin')
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
        user_id: localStorage.getItem('user_id_check_from_admin')
        }
        axios.post(verifyuri,data,conf).then(res=>{
          this.isLoading = false
          alert("User Has Been Verified")
        }).catch(err=>{
          this.isLoading = false
          alert("Failed to Verify User")
        })
      },
        signout:function(event){
          localStorage.setItem('JSONWEBTOKEN',null)
          this.$router.push('/LoginPage')
        },
      }
}
</script>

<style scoped>
#frameParameter {
    padding: 10px 10px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    z-index: 1;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
}

#frameTable {
    padding: 10px 10px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    z-index: 1;
    max-height: 200px;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 5px 5px 5px 5px;
    
}
</style>