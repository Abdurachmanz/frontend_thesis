<template>
        <div>
        <div id="paramhead">
            <h4 id="txtparamheadline">Chart Data</h4>
        </div>
        <div id="paramtable">
            <table style=" font-size:12px; text-align:left">
                        <tr>
                            <td>Device ID</td>
                            <td style="width:20px;text-align:center">:</td>
                            <td>{{device_id}}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td style="width:20px;text-align:center">:</td>
                            <td>{{device_city}}</td>
                        </tr>
            </table>
        </div>
         <div id="drpdwn">
            <b-dropdown :text="dropdown" size="sm" id="drpdwnleft" variant="light">
                <b-dropdown-item @click="daily" style="font-size:12px">Today</b-dropdown-item>
                <b-dropdown-item @click="weekly" style="font-size:12px">Recent 7 Days</b-dropdown-item>
                <b-dropdown-item @click="monthly" style="font-size:12px">Recent 30 Days</b-dropdown-item>
            </b-dropdown>  
        </div>
        <div id="frameParameter">
            <div id="cardDevice" class="card">
                <div id="headerDevice" class="card-header">
                    <div class="row">
                    <div id="headline">
                        <p style="text-align:left;font-size:12px; margin:0px;padding-left:11px"> Temperature (&#8451;) </p>
                    </div>                    
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-body">
                            <canvas id="tempchart"></canvas>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div id="frameParameter">
            <div id="cardDevice" class="card">
                <div id="headerDevice" class="card-header">
                    <div class="row">
                    <div id="headline">
                        <p style="text-align:left;font-size:12px; margin:0px;padding-left:11px"> Humidity </p>
                    </div>                
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-body">
                            <canvas id="humchart"></canvas>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div id="frameParameter">
            <div id="cardDevice" class="card">
                <div id="headerDevice" class="card-header">
                    <div class="row">
                    <div id="headline">
                        <p style="text-align:left;font-size:12px; margin:0px;padding-left:11px"> Wind Speed </p>
                    </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-body">
                            <canvas id="wschart"></canvas>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div id="frameParameter">
            <div id="cardDevice" class="card">
                <div id="headerDevice" class="card-header">
                    <div class="row">
                    <div id="headline">
                        <p style="text-align:left;font-size:12px; margin:0px;padding-left:11px"> Wind Direction (&#176; deg) </p>
                    </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-body">
                        <canvas id="wdchart"></canvas>
                        </div>
                    </div>
                </div> 
            </div>
            <div id="frameParameterR">
            <div id="cardDevice" class="card">
                <div id="headerDevice" class="card-header">
                    <div class="row">
                    <div id="headline">
                        <p style="text-align:left;font-size:12px; margin:0px;padding-left:11px"> Rainfall </p>
                    </div>
                    </div>
                </div>
                <div id="bodyDevice" class="card-body">
                    <div id="listDevice" class="card">
                        <div class="card-body">
                            <canvas id="rainchart"></canvas>
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
import Chart from 'chart.js'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: 'SeeDataUserChart',
    data() {
    return {
        temp: [],
        hum: [],
        winspeed: [],
        windir: [],
        rainf:[],
        created_at: [],
        profile: localStorage.getItem('name'),
        device_id: localStorage.getItem('device_id_seedata_dashboarduser'),
        device_city: localStorage.getItem('device_city_seedata_dashboarduser'),
        data_device:[],
        typeget:'monthly',
        dropdown:'Recent 30 Days',
        isLoading: false,
        fullPage: true,
    }
    },
    mounted () {
      this.firstinit()
        //data
        const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }
                const dataowndeviceuri = 'https://isatudevapi.herokuapp.com/v1/data/owndevice/'+String(this.device_id)+'/graph/'+this.typeget
                axios.get(dataowndeviceuri,config)
                .then(response=>{
                  this.isLoading = false
                  this.data_device=response.data
                  this.temp = response.data.map(data=>data.temperature)
                  this.hum = response.data.map(data=>data.humidity)
                  this.rainf = response.data.map(data=>data.rainfall)
                  this.windir = response.data.map(data=>data.wind_direction)
                  this.winsped = response.data.map(data=>data.wind_speed)
                  this.created_at = response.data.map(data=>moment(data.created_at,'YYYY-MM-DDTHH:mm:ssZ').format('MMM D YYYY h:mm A'))
                  
                  new Chart(document.getElementById('tempchart'), {
                      type: 'line',
                      data: {
                          labels: this.created_at,
                          datasets: [{
                              label: 'Temperature',
                              data: this.temp,
                              fill: true,
                              backgroundColor: '#4fd5db',
                              borderColor: '#000000',
                              borderWidth: 1
                          }]
                      }
                  })

                  new Chart(document.getElementById('humchart'), {
                      type: 'line',
                      data: {
                          labels: this.created_at,
                          datasets: [{
                              label: 'Humidity',
                              data: this.hum,
                              fill: true,
                              backgroundColor: '#4fd5db',
                              borderColor: '#000000',
                              borderWidth: 1
                          }]
                      }
                  })  
                   new Chart(document.getElementById('rainchart'), {
                      type: 'line',
                      data: {
                          labels: this.created_at,
                          datasets: [{
                              label: 'Rain Fall',
                              data: this.rainf,
                              fill: true,
                              backgroundColor: '#4fd5db',
                              borderColor: '#000000',
                              borderWidth: 1
                          }]
                      }
                  }) 
                   new Chart(document.getElementById('wschart'), {
                      type: 'line',
                      data: {
                          labels: this.created_at,
                          datasets: [{
                              label: 'Wind Speed',
                              data: this.winsped,
                              fill: true,
                              backgroundColor: '#4fd5db',
                              borderColor: '#000000',
                              borderWidth: 1
                          }]
                      }
                  }) 
                   new Chart(document.getElementById('wdchart'), {
                      type: 'line',
                      data: {
                          labels: this.created_at,
                          datasets: [{
                              label: 'Wind Direction',
                              data: this.windir,
                              fill: true,
                              backgroundColor: '#4fd5db',
                              borderColor: '#000000',
                              borderWidth: 1
                          }]
                      }
                  })                  
               })
               .catch(err=>{
                  this.isLoading = false
                  const status = JSON.parse(err.response.status)
                  if (status == 401){
                    this.$router.push('/LoginPage')
                  }
                })
  },
  methods: {
    firstinit(){
          this.isLoading = true
        },
      Onhome: function(event) {
          this.$router.push('/DashboardUser')
        },
      Onprofile: function(event) {
          this.$router.push('/ProfileUser')
        },
      Oncommunity: function(event) {
          this.$router.push('/CommunityUser')
        },
      daily: function(event){
        this.isLoading = true
        this.dropdown = "Today"
        this.typeget = "daily"
        const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }
        const dataowndeviceuri = 'https://isatudevapi.herokuapp.com/v1/data/owndevice/'+String(this.device_id)+'/graph/'+this.typeget
        axios.get(dataowndeviceuri,config)
                    .then(response=>{
                      this.isLoading = false
                      this.data_device=response.data
                      this.temp = response.data.map(data=>data.temperature)
                      this.hum = response.data.map(data=>data.humidity)
                      this.rainf = response.data.map(data=>data.rainfall)
                      this.windir = response.data.map(data=>data.wind_direction)
                      this.winsped = response.data.map(data=>data.wind_speed)
                      this.created_at = response.data.map(data=>moment(data.created_at,'YYYY-MM-DDTHH:mm:ssZ').format('MMM D YYYY h:mm A'))
                      
                      new Chart(document.getElementById('tempchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Temperature',
                                  data: this.temp,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })

                      new Chart(document.getElementById('humchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Humidity',
                                  data: this.hum,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })  
                      new Chart(document.getElementById('rainchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Rain Fall',
                                  data: this.rainf,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      }) 
                      new Chart(document.getElementById('wschart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Wind Speed',
                                  data: this.winsped,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      }) 
                      new Chart(document.getElementById('wdchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Wind Direction',
                                  data: this.windir,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })                  
                  })
                  .catch(err=>{
                  this.isLoading = false
                      const status = JSON.parse(err.response.status)
                      if (status == 401){
                        this.$router.push('/LoginPage')
                      }
                    })
      },
      weekly: function(event){
        this.isLoading = true
        this.dropdown = "Recent 7 Days"
        this.typeget = "weekly"
        const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }
        const dataowndeviceuri = 'https://isatudevapi.herokuapp.com/v1/data/owndevice/'+String(this.device_id)+'/graph/'+this.typeget
        axios.get(dataowndeviceuri,config)
                    .then(response=>{
                  this.isLoading = false
                      this.data_device=response.data
                      this.temp = response.data.map(data=>data.temperature)
                      this.hum = response.data.map(data=>data.humidity)
                      this.rainf = response.data.map(data=>data.rainfall)
                      this.windir = response.data.map(data=>data.wind_direction)
                      this.winsped = response.data.map(data=>data.wind_speed)
                      this.created_at = response.data.map(data=>moment(data.created_at,'YYYY-MM-DDTHH:mm:ssZ').format('MMM D YYYY h:mm A'))
                      
                      new Chart(document.getElementById('tempchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Temperature',
                                  data: this.temp,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })

                      new Chart(document.getElementById('humchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Humidity',
                                  data: this.hum,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })  
                      new Chart(document.getElementById('rainchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Rain Fall',
                                  data: this.rainf,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      }) 
                      new Chart(document.getElementById('wschart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Wind Speed',
                                  data: this.winsped,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      }) 
                      new Chart(document.getElementById('wdchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Wind Direction',
                                  data: this.windir,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })                  
                  })
                  .catch(err=>{
                  this.isLoading = false
                      const status = JSON.parse(err.response.status)
                      if (status == 401){
                        this.$router.push('/LoginPage')
                      }
                    })
      },
      monthly: function(event){
        this.isLoading = true
        this.dropdown = "Recent 30 Days"
        this.typeget = "monthly"
        const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }
        const dataowndeviceuri = 'https://isatudevapi.herokuapp.com/v1/data/owndevice/'+String(this.device_id)+'/graph/'+this.typeget
        axios.get(dataowndeviceuri,config)
                    .then(response=>{
                  this.isLoading = false
                      this.data_device=response.data
                      this.temp = response.data.map(data=>data.temperature)
                      this.hum = response.data.map(data=>data.humidity)
                      this.rainf = response.data.map(data=>data.rainfall)
                      this.windir = response.data.map(data=>data.wind_direction)
                      this.winsped = response.data.map(data=>data.wind_speed)
                      this.created_at = response.data.map(data=>moment(data.created_at,'YYYY-MM-DDTHH:mm:ssZ').format('MMM D YYYY h:mm A'))
                      
                      new Chart(document.getElementById('tempchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Temperature',
                                  data: this.temp,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })

                      new Chart(document.getElementById('humchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Humidity',
                                  data: this.hum,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })  
                      new Chart(document.getElementById('rainchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Rain Fall',
                                  data: this.rainf,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      }) 
                      new Chart(document.getElementById('wschart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Wind Speed',
                                  data: this.winsped,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      }) 
                      new Chart(document.getElementById('wdchart'), {
                          type: 'line',
                          data: {
                              labels: this.created_at,
                              datasets: [{
                                  label: 'Wind Direction',
                                  data: this.windir,
                                  fill: true,
                                  backgroundColor: '#4fd5db',
                                  borderColor: '#000000',
                                  borderWidth: 1
                              }]
                          }
                      })                  
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
}
</script>

<style scoped>
#frameParameter { 
    padding: 10px 10px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 10px 10px 10px 10px;
}

#txtParameter {    
    font-size: 16px;
    padding: 10px 10px 0px 10px;
    
}

#cardDevice {
    width: 100%;
    height: 100%;
}

div#bodyDevice.card-body {
    padding-bottom: 10px;
    
}

div#headerDevice.card-header {
    padding: 6px 10px 6px 10px;
}

div.card-body {
    padding: 10px;
}

#drpdwn {
    text-align:left;
    z-index: 11;
}

#drpdwnleft {
    padding-bottom: 10px;
}

#frameParameterR {
    padding: 20px 0px 0px 0px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 10px 10px 10px 10px;
}

div#drpdwnleft.dropdown.b-dropdown.btn-group {
    padding-bottom: 0px;
    margin-left: 0px;
}

#headline {
    padding: 5px;
}

#paramtable {
    padding-top: 10px;
    padding: 10px 10px 10px 20px;
    padding-top: 0px;
    padding-left:10px;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 5px 5px 5px 5px;
}
#paramhead {
    text-align:left;
    padding-top: 10px; 
}
#txtparamheadline {    
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
}
</style>