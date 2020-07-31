<template>
    <b-container id="backgroundLogin">
        <b-img id="img" fluid src="https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80" alt="image1"> </b-img>
    </b-container>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#img{
    width:100%;
    max-width:500px;
    height:100%;
    max-height:100vh;
}
#backgroundLogin {
    width: 100%;
    padding: 0px 16px;
    box-sizing: border-box;
    opacity: 0.9;
    height:100%;
    max-height: 100vh;
    position: absolute;
    max-width: 500px;
    margin: 0px auto;
    z-index: -1;
}
</style>