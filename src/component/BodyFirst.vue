<template>
  <div class="bodyFirst2">
    <div class="first2">
      <Clocktime />
      <div class="changeborder"></div>
      <div class="corner2 top-left2"></div>
      <div class="corner2 top-right2"></div>
      <div class="corner2 bottom-left2"></div>
      <div class="corner2 bottom-right2"></div>
    </div>
    <div class="second2">
      <!-- <Wendu/> -->
      <!-- <div v-if="id==1"> -->
        <Degree2 v-if="(id==1)||(id==3)"/>
      <!-- </div> -->
      <!-- <div v-else> -->
        <Degree v-else/>
      <!-- </div> -->
      <div class="changeborder"></div>
      <div class="corner2 top-left2"></div>
      <div class="corner2 top-right2"></div>
      <div class="corner2 bottom-left2"></div>
      <div class="corner2 bottom-right2"></div>
    </div>
  </div>
</template>

<script>
import Clocktime from "./Clocktime.vue";
import Degree from './Degree.vue';
import Degree2 from './Degree2.vue';
export default {
  name: "BodyFirst",
  components: {Clocktime,Degree,Degree2},
  data() {
    return {
      id:this.$store.state.id,
    };
  },
  // computed:{
  //   returnId(){
  //     return this.$store.state.id
  //   }
  // },
  mounted() {
    console.log(this.id,'子组件')
  },
};
</script>

<style>
.bodyFirst2 {
  width: 25%;
  height: 100%;
  text-align: center;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
}
.bodyFirst2 .first2 {
  flex: 1;
}
#main {
  margin-top: -6%;
}

@media (max-width: 600px) {
  .datetime-container {
    width: 150px;
    padding: 15px;
  }
  .date {
    font-size: 16px;
  }
  .time {
    font-size: 24px;
  }
}
.bodyFirst2 .second2 {
  flex: 1;
}
.first2,
.second2 {
  position: relative;
  width: 100%;
  height: 100%;
}

.changeborder{
  width: 88%;
  height:88%;
  border: 1px solid rgba(52, 152, 219, 0.2);
  position: absolute;
  top: 5%;
  left: 5%;
  box-shadow: 0 10px 10px rgba(237, 245, 247, 0.3),
    0 6px 20px rgba(7, 194, 236, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.corner2 {
  position: absolute;
  width: 5%;
  height: 3%;
  border: 2px solid transparent;
}

.top-left2 {
  top: 5%;
  left: 5%;
  border-top: 1px solid #3498db; 
  border-left: 1px solid #3498db; 
}

.top-right2 {
  top: 5%;
  right: 7%;
  border-top: 1px solid #3498db;
  border-right: 1px solid #3498db;
}

.bottom-left2 {
  bottom: 7%;
  left: 5%;
  border-bottom: 1px solid #3498db;
  border-left: 1px solid #3498db;
}

.bottom-right2 {
  bottom: 7%;
  right: 7%;
  border-bottom: 1px solid #3498db;
  border-right: 1px solid #3498db;
}
</style>