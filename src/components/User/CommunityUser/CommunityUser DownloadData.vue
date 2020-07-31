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
                    this.$router.push('/DashboardUser')
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