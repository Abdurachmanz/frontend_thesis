<template>
    <div id="landingpageHeadline">
        <link rel="stylesheet" type="text/css" href=" https://fonts.googleapis.com/css?family=Concert+One">
        <div>
            <h6>Let's Participate Improving Indonesia's Weather Data Readibility</h6><br>
            <h5 id="frIDforID">From Indonesia, For Indonesia</h5>
        </div>
        <div>
            <h3 id="txtiSATU">i S A T U</h3>
            <h5 id="txtiSATUext">Indonesia Stasiun Cuaca Terbuka</h5>
        </div>
        <div>
            <b-button  id="btnjn" @click="joinNow" variant="secondary" pill>Join Now</b-button>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
      joinNow(event){
          console.log('clicked')
          this.$router.push('/SignupPage')
      }
  }  
}
</script>

<style scoped>
#landingpageHeadline {
    outline-style:none;
    list-style-type: none;
    z-index: 2;
    display: inline-block;
    top: 70px;
    position: absolute;
    text-align: center;
    padding: 8px;
    transform: translate(-50%);
    left: 50%;
    max-width: 100%;
    color: rgb(222, 222, 222);
}

h6 {
    display: inline-block;
    font-size: 0.8em;
}

#frIDforID {
    display: inline-block;
    font-weight: bold;
}

#txtiSATU {
    display: inline-block;
    margin-top: 150px;
    font-family: 'Concert One', cursive;
    margin-bottom: 15px;
}

#txtiSATUext {
    display: block;
    font-size: 1em;
    font-weight: 500;
    max-width: 100%;
}

#btnjn {
    display: inline-block;
    margin-top: 30%;
    min-height: 100%;
    max-width: 100%;
}

</style>