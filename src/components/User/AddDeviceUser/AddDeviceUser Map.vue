<template>
<div>
    <div id="mapParameter">
            <div id="cardDevice" class="card">
                <div id="bodyDevice" class="card-body">
                    <div class="card">
                        <div id="maps" style="height: 150px">
                          <l-map
                            style="width: 100%;"
                            v-on:click="getlatlang"
                            :zoom="zoom"
                            :center="center"
                            :bounds="bounds"
                            :max-bounds="maxBounds">
                          <l-tile-layer 
                            :url="url"
                            :attribution="attribution">
                          </l-tile-layer>
                          <l-marker
                            @click="markerbutton"
                            :latLng="marker"
                            :draggable="true">
                          </l-marker>
                        </l-map>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="param">
                <table style=" font-size:12px; text-align:left">
                <tr>
                    <td>Latitude</td>
                    <td style="width:20px;text-align:center">:</td>
                    <td>{{lat}}</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td style="width:20px;text-align:center">:</td>
                    <td>{{lang}}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td style="width:20px;text-align:center">:</td>
                    <td>{{city}}</td>
                </tr>
            </table>
            </div> 
            <div id="frameParameter">
                <div>
                    <div> 
                        <b-button @click="addnewdevice" size="sm" variant="info">Confirm your device location</b-button>
                    </div>
                </div>
            </div> 
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'
import { latLngBounds, latLng} from "leaflet"
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Loading,
  },
  data () {
        return {
          isLoading: false,
          fullPage: true,
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          zoom: 100,
          center: [-1.603794, 116.762587],
          bounds: latLngBounds([ 
          [-12.382928338487396, 91.2744140625],
          [9.232248799418674, 142.25097656250003]]),
          maxBounds: latLngBounds([
          [-12.382928338487396, 91.2744140625],
          [9.232248799418674, 142.25097656250003]]),

          profile:localStorage.getItem('name'),
          lat:'',
          lang:'',
          city:'',
          marker:[localStorage.getItem('lat_from_map'),localStorage.getItem('lang_from_map')],
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
               })
               .catch(err=>{
                  const status = JSON.parse(err.response.status)
                  if (status == 401){
                    this.$router.push('/LoginPage')
                  }
                })

      navigator.geolocation.getCurrentPosition(pos => {
        this.isLoading = false
        localStorage.setItem('lat_from_map',pos.coords.latitude)
        localStorage.setItem('lang_from_map',pos.coords.longitude)
      }, err => {
      })

    },
    function () {
      ('[data-toggle="tooltip"]').tooltip()
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
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    markerbutton(event){
      this.isLoading = true
      this.lat = event.latlng.lat
      this.lang = event.latlng.lng
      this.city = null
      localStorage.setItem('lat_from_map',event.latlng.lat)
      localStorage.setItem('lang_from_map',event.latlng.lng)
      const uri = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+event.latlng.lat+'&lon='+event.latlng.lng
      const config = {
                  headers: {
                      'Content-Type': 'application/json'  
                  }
              }
      axios.get(uri,config).then(res=>{
        this.isLoading = false
        this.city = res.data.display_name
        localStorage.setItem('city_from_map',res.data.display_name)
      }).catch(err=>{
        this.isLoading = false
      })
    },
    getlatlang: function(event){
      this.isLoading = true
      localStorage.setItem('lat_from_map',event.latlng.lat)
      localStorage.setItem('lang_from_map',event.latlng.lng)
      this.lat = event.latlng.lat
      this.lang = event.latlng.lng
      this.marker = [localStorage.getItem('lat_from_map'),localStorage.getItem('lang_from_map')]
      this.city = null
      const uri = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+event.latlng.lat+'&lon='+event.latlng.lng
      const config = {
                  headers: {
                      'Content-Type': 'application/json'  
                  }
              }
      axios.get(uri,config).then(res=>{
        this.isLoading = false
        this.city = res.data.display_name
        localStorage.setItem('city_from_map',res.data.display_name)
      }).catch(err=>{
        this.isLoading = false
      })
    },
    addnewdevice:function(event){
      this.isLoading = true
      const conf = {
                  headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
              }
      const createdevice = "https://isatudevapi.herokuapp.com/v1/device/create"
      const data = {
        latitude:parseFloat(localStorage.getItem('lat_from_map')),
        longitude:parseFloat(localStorage.getItem('lang_from_map')),
        city:localStorage.getItem('city_from_map')
      }
        axios.post(createdevice,data,conf).then(res=>{
          this.isLoading = false
          alert("Successfully Added Your New Device")
        }).catch(err=>{
          this.isLoading = false
          alert("Failed to Added Your New Device")
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
#param {
    text-align:left;
    padding-top: 10px;
}

#frameParameter {
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


#txtParameter {    
    font-size: 12px;
    margin: 0px;
}
</style>