<template>
<div id="frameParameter">
    <div>
        <div> 
            <b-button @click="downloadall" size="sm" variant="outline-info">Download all data on iSATU Community</b-button>
        </div>
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
      isLoading: false,
      fullPage: true,
    }
  },
  methods: {
    downloadall: function(event){
      this.isLoading = true
      const config = {
                    headers: {
                        'Authorization': localStorage.getItem('JSONWEBTOKEN'), //cookie.get('JSONWEBTOKEN')
                        'Content-Type': 'application/json'  
                    }
                }

                const downloaduri = 'https://isatudevapi.herokuapp.com/v1/download/data/all/devices'
                axios.get(downloaduri,config)
                .then(response=>{
                  this.isLoading = false
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'all-device-data.csv'); //or any other extension
                  document.body.appendChild(link);
                  link.click();
               })
               .catch(err=>{
                 this.isLoading = false
                  const status = JSON.parse(err.response.status)
                  if (status == 422){
                    alert("You Are Not Allowed")
                    localStorage.setItem('JSONWEBTOKEN',null)
                    this.$router.push('/LoginPage')
                  }
                })
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
    max-height: 200px;
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 5px 5px 5px 5px;
    align-content: center;
    
}

</style>