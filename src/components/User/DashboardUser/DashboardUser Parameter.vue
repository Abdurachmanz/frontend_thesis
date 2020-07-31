<template>
    <div>
         <div class="vld-parent">
            <loading 
            :active.sync="isLoading"
            :is-full-page="fullPage">
            </loading>
        </div> 
        <div id="param">
            <h4 id="txtParameter">Latest data in your device</h4>
        </div>
        <div id="drpdwn">
            <b-dropdown :text="selected" size="sm" id="drpdwnleft" variant="light">
                <span v-for="device in devices">
                <b-dropdown-item @click="onChange" style="font-size:12px; width:428px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; z-index:2; padding: 0px 10px" :data-id="device.id" :value="device.city" variant="dark">{{device.city}}</b-dropdown-item>
                </span>
            </b-dropdown>
        </div>
        <div id="frameParameter">
            <div id="boundaryParameter" class="card row">
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-header">
                            <p> Humidity </p>
                        </div>
                        <div class="card-body">
                            <p v-if="latest_datum">{{latest_datum.humidity}} </p>
                        </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-header">
                            <p style="font-size:10px"> Temperature </p>
                        </div>
                        <div class="card-body">
                            <p  v-if="latest_datum">{{latest_datum.temperature}} </p>
                        </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-header">
                            <p style="font-size:10px"> Wind Direction </p>
                        </div>
                        <div  class="card-body">
                            <p  v-if="latest_datum"> {{latest_datum.wind_direction}} </p>
                        </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-header">
                            <p style="font-size:10px"> Wind Speed </p>
                        </div>
                        <div  class="card-body">
                            <p v-if="latest_datum">{{latest_datum.wind_speed}} </p>
                        </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-header">
                            <p> Rainfall </p>
                        </div>
                        <div class="card-body">
                            <p  v-if="latest_datum">{{latest_datum.rainfall}} </p>
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
        onChange: function(event) {
          event.preventDefault()
          this.isLoading = true
          localStorage.setItem('selected_dropdown_dashboarduser',event.target.getAttribute('value'))
          this.selected = localStorage.getItem('selected_dropdown_dashboarduser')
          this.selected = this.selected.substring(0,20)
          
          const config = {
                     headers: {
                        'Authorization':  localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN'),
                        'Content-Type': 'application/json'
                    }
                }
          const data ={
                    device_id:event.target.getAttribute('data-id')
                }
          const uri = 'https://isatudevapi.herokuapp.com/v1/data/latest/ondevice'
          axios.post(uri, data,config)
          .then(response=>{
            this.isLoading = false
            if (response.data != null){this.latest_datum = response.data}
            if (response.data == null){this.latest_datum = ''}
          })
          .catch(err=>{
          })
       }
    }
}
</script>

<style scoped>
#frameParameter {
    margin-left: 10px;
    
    padding: 10px 10px;
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
    text-align:left;
}

div.card-body {
    text-align: center;
     
     font-size:10px; padding:5px
}

div.card-header {
    padding: 5px 10px;
}

#boundaryParameter {
    width: 100%;
    padding: 5px;
    margin: 5px;
}

div#boundaryParameter.card.row {
    margin: 0px;
}

#drpdwn {
    text-align:left;
    margin-left: 10px;
    
}

#drpdwnleft {
    padding-bottom: 10px;
}

p {
    margin-bottom: 0px;
}
</style>