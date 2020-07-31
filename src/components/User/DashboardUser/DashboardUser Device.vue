<template>
    <div>
        <div id="param">
            <h4 id="txtParameter">Your device</h4>
        </div>
        <div id="frameParameter">
            <div id="cardDevice" class="card">
                <div id="headerDevice" class="card-header">
                     <div style="text-align:left; align: center">
                     <b-button @click="addDevice" style="font-size:12px" variant="light"><b-icon icon="plus"></b-icon>Add New Device</b-button>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card" v-for="device in devices">
                        <div  class="card-body">
                            <div class="row">
                                <div class="col-1">
                                    <b-icon style="align: center; padding:4px" variant="success" icon="circle-fill"></b-icon>
                                </div>
                                <div class="col-8">
                                    <a style="font-size:10px;white-space:nowrap"> Device ID : {{device.id}} </a>
                                    <br>
                                    <a style="font-size:10px;white-space:nowrap"> Location : {{device.city}} </a>
                                </div>
                                <div class="col-3" style="text-align:center;">
                                     <b-button @click="seedata" :data-id="device.id" :data-city="device.city" style="font-size:10px;" variant="light"> See Data </b-button>
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
      latest_datum:'',
      selected:'Select Your Device',//cookie.get('selected_dropdown_dashboarduser'),
      errors: '',
      isLoading: false,
      fullPage: true,
    }
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
                  localStorage.setItem('name', response.data.name)
                  
               })
               .catch(err=>{
                 this.isLoading = false
                  const status = JSON.parse(err.response.status)
                  if (status == 401){
                    this.$router.push('/LoginPage')
                  }
                })

            const deviceuri = 'https://isatudevapi.herokuapp.com/v1/devices/user'
            axios.get(deviceuri,config)
                .then(response=>{
                  this.isLoading = false
                  this.devices=response.data
               })
               .catch(err=>{
                  this.isLoading = false
                  const status = JSON.parse(err.response.status)
                })
        },
        methods:{
        firstinit(){
          this.isLoading = true
        },
        seedata: function(event) {
          const device_id = event.target.getAttribute('data-id')
          const device_city = event.target.getAttribute('data-city')
          localStorage.setItem('device_id_seedata_dashboarduser',device_id)
          localStorage.setItem('device_city_seedata_dashboarduser',device_city) //cookie.set('device_id_dashboarduser',device_id)
          this.$router.push('/SeeDataUser')
    },
        addDevice: function(event){
         this.$router.push('/AddDeviceUser')
       },
    }
}
</script>

<style scoped>
#frameParameter {
    padding: 10px 10px;
    margin-left: 10px;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    background-color: #f8f9fa;
    z-index: 1;
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
    padding-left: 10px;
}

#listDevice {
    margin-bottom: 10px;
    text-align:left;
}

div#bodyDevice.card-body {
    padding-bottom: 0px;
}

div.card-body {
    padding: 10px;
}

div#headerDevice.card-header {
   padding: 0px;
}

div.col-3 {
    padding: 15px;
}

div.col-1 {
    padding: 15px 10px 0px 15px;
}

div.col-8 {
    padding: 0px 10px;
    overflow:scroll;
}
</style>