<template>
    <div id="frameParameter">
    <div>
        <div> 
            <b-button @click="downloadall" size="sm" variant="info">Confirm your device location</b-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    
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
    
}
</style>