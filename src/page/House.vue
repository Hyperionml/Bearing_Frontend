<template>
  <div class="mainPage">
    <Homeupbody/>
    <Homedownbody/>
  </div>
</template>

<script>
import Homeupbody from '@/component/Homeupbody.vue'
import Homedownbody from '@/component/Homedownbody.vue'
export default {
name:'House',
components:{Homeupbody,Homedownbody},
data() {
    return {
        
    }
},
}
</script>

<style>
.mainPage{
    width: 100%;
    height: 100%;
}
</style>