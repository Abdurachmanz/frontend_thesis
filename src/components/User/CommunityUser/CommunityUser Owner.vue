<template>
<div>
 <div id="mapParameter">
    <div id="cardDevice" class="card">
                <div id="bodyDevice" class="card-body">
                    <div class="card">
                        <div id="maps" style="height: 150px">
                        </div>
                    </div>
                </div>
            </div>
 </div>
    <div id="param">
        
            <table style=" font-size:12px; text-align:left">
                <tr>
                    <td style="width:100px">Device Owner</td>
                    <td style="width:20px;text-align:center">:</td>
                    <td>{{owner}}</td>
                </tr>
                <tr>
                    <td style="width:100px">Location</td>
                    <td style="width:20px;text-align:center">:</td>
                    <td>{{loc}}</td>
                </tr>
                <tr>
                    <td style="width:100px">Action</td>
                    <td style="width:20px;text-align:center">:</td>
                    <td id="downloadData" @click="ondownload" >Download</td>
                </tr>
            </table>
    </div>
    <div id="frameParameter">
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
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
data () {
    return {
      markers: [],
      marker:null,
      items: [],
      fields:[
          {
            key: 'temperature',
            label: 'Temperature'
          },
          {
            key: 'humidity',
            label: 'Humidity'
          },
          {
            key: 'wind_speed',
            label: 'Wind Speed'
          },
          {
            key: 'wind_direction',
            label: 'Wind Direction'
          },
          {
            key: 'rainfall',
            label: 'Rain Fall'
          },
          {
            key: 'created_at',
            label: 'Sent At',
            formatter: value=>{
              return moment(value,'YYYY-MM-DDTHH:mm:ssZ').format('DD MMMM YYYY hh:mm:ss a')
            }
          }
        ],
      loc:'',
      profile:localStorage.getItem('name'),
      selected_device:'',
      owner:'',
      pages:1,
      map:null,
    }
  },
  mounted() {
      this.initmap(),
      this.initmarker()
  },
  methods: {
    
    initmap(){
      this.isLoading = true
     this.map= L.map('maps').setView([-1.603794, 116.762587],5.2)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
            .addTo(this.map)
    },
    initmarker(){
      const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }
    const deviceuri = 'https://isatudevapi.herokuapp.com/v1/devices'
            axios.get(deviceuri,config)
                .then(response=>{
                  this.isLoading = false
                  this.markers = response.data
                  let index
                  for ( var i=0; i < this.markers.length; i++ ){
                    this.marker = L.marker( [this.markers[i].latitude, this.markers[i].longitude] )
                    this.marker.bindPopup(this.markers[i].city, {
                      autoClose: true
                    })
                    this.map.addLayer(this.marker)
                    this.marker.on('click',this.onClick_Marker)
                    this.marker.properties = this.markers[i]
                  }
                  
                })
               .catch(err=>{
                  this.isLoading = false
                  const status = JSON.parse(err.response.status)
                  if (status == 401){
                    this.$router.push('/LoginPage')
                  }
                  if (status == 422){
                    alert("You Are Not Allowed")
                    this.$router.push('/DashboardUser')
                  }
              })
    },
    onClick_Marker(e){
                this.isLoading = true
                    var marker = e.target
                    this.selected_device = marker.properties.devicekey
                    localStorage.setItem('selected_device_admin',marker.properties.devicekey)
                    this.owner=marker.properties.name
                    this.loc=marker.properties.city
                    const config = {
                        headers: {
                            'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                            'Content-Type': 'application/json'  
                        }
                    }
                    const devuri = 'https://isatudevapi.herokuapp.com/v1/data/ondevice/'+this.selected_device+'/number/'+this.pages
                    axios.get(devuri,config)
                    .then(response=>{
                      this.isLoading = false
                      this.items = response.data
                    })
                    .catch(err=>{
                       this.isLoading = false
                        const status = JSON.parse(err.response.status)
                        if (status == 401){
                          this.$router.push('/LoginPage')
                        }
                        if (status == 422){
                          alert("You Are Not Allowed")
                          this.$router.push('/DashboardUser')
                        }
                      })
                    },
    ondownload: function(event){
      this.isLoading = true
      const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }

                const downloaduri = 'https://isatudevapi.herokuapp.com/v1/download/data/on_device/'+localStorage.getItem('selected_device_admin')
                axios.get(downloaduri,config)
                .then(response=>{
                  this.isLoading = false
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', this.owner+'-device-data.csv'); //or any other extension
                  document.body.appendChild(link);
                  link.click();
               })
               .catch(err=>{
                 this.isLoading = false
                  const status = JSON.parse(err.response.status)
                  if (status == 422){
                    alert("You Are Not Allowed")
                    this.$router.push('/DashboardUser')
                     }
                })
    },
  }
}
</script>

<style scoped>
#param {
    padding-top: 10px;
    padding: 10px 10px 10px 20px;
    
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 5px 5px 5px 5px;
}

#txtParameter {    
    font-size: 12px;
    margin: 0px;
}

#downloadData:active, #downloadData:hover {
    cursor: pointer;
    text-decoration: underline;
}

#cardDevice {
    width: 100%;
    height: 100%;
}

div#bodyDevice.card-body {
    padding-bottom: 10px;
    
}

div.card-body {
    padding: 10px;
}

#mapParameter {
    
    padding: 10px 10px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    z-index: 1;
    max-height: 200px;
    height: 100%;
    width: 100%;
    
    text-overflow: ellipsis;
    border-radius: 10px 10px 10px 10px;
    
}

</style>