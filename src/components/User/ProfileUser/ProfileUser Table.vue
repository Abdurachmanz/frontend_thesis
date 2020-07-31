<template>
   <div id="frameParameter">
    <b-table style="font-size:10px;" outlined small striped hover :fields="fields" :current-page="currentPage" :items="items"></b-table>
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
        page:1,
        items: [],
        fields:[
          {
            key: 'counter_day',
            label: 'Day'
          },
          {
            key: 'device_id',
            label: 'Device ID'
          },
          {
            key: 'created_at',
            label: 'Checked At',
            formatter: value=>{
              return moment(value,'YYYY-MM-DDTHH:mm:ssZ').format('DD MMMM YYYY hh:mm:ss a')
            }
          }
        ],
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
    },
      methods: {
        firstinit(){
          this.isLoading = true
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
    z-index: 1;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
}
</style>