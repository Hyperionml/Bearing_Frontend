<template>
  <div class="bodySecond2">
    <div class="left">
      <Zhexian/>
    </div>
    <div class="right">
      <div class="corner3 top-left3"></div>
      <div class="corner3 top-right3"></div>
      <div class="corner3 bottom-left3"></div>
      <div class="corner3 bottom-right3"></div>
      <div class="top"></div>
      <div class="shang" v-show="(id==1)||(id==3)">
        <li>正常</li>
      </div>
      <div class="xia" v-show="(id==1)||(id==3)">
        <li>失灵</li>
      </div>
      <div class="shang" v-show="id==2">
        <li :style="changeStyle(turn01)">正常</li>
      </div>
      <div class="xia" v-show="id==2">
        <li :style="changeStyle02(turn01)">失灵</li>
      </div>
      <div class="bt">
        轴承状态
      </div>
    </div>
  </div>
</template>

<script>
import Zhexian from "./Zhexian.vue";

export default {
  name: "BodySecond",
  components: { Zhexian },
  data() {
    return {
      id:this.$store.state.id
    };
  },
  computed:{
    turn01(){
      return this.$store.state.pievalue
    }
  },
  methods:{
    changeStyle(istrue){
      if(istrue){
        return{
          color:"rgb(56, 231, 79)",
        }
      }else{
        return{
          color:"rgb(60, 63, 58)",
        }
      }
    },
    changeStyle02(istrue){
      if(istrue){
        return{
          color:"rgb(60, 63, 58)",
        }
      }else{
        return{
          color:"rgb(231, 56, 56)",
        }
      }
    }
  }
};
</script>

<style>
.bodySecond2 {
  /* width: calc(200% / 3); */
  width: 75%;
  height: 100%;
  /* border: 1px solid rgba(53, 190, 214, 0.2); */
  /* position: relative; */
  display: flex;
}
.left{
  width: 80%;
  height: 100%;
  margin-left:1%;
  /* border: 1px solid rgba(53, 190, 214, 0.2); */
}
.right{
  width: 20%;
  height: 100%;
  /* border: 1px solid rgba(53, 190, 214, 0.2); */
  display: flex;
  flex-direction: column;
  background-image: url('/src/images/13.png');
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}
.top,.bt{
  flex: 1;
}
.shang,.xia{
  flex: 4;
}
.shang li{
  color: rgb(56, 231, 79);
  font-size: 20px;
}
.xia li{
  color: rgb(60, 63, 58);
  font-size: 20px;
}
.bt{
  text-align: center;
  font-size: 20px;
  color: azure;
}
.corner3 {
  position: absolute;
  width: 6%;
  height: 3%;
  border: 2px solid transparent;
}

.top-left3 {
  top: 0; 
  left: 0;
  border-top: 1px solid #3498db; 
  border-left: 1px solid #3498db; 
}

.top-right3 {
  top: 0;
  right: 0.5%;
  border-top: 1px solid #3498db;
  border-right: 1px solid #3498db;
}

.bottom-left3 {
  bottom: 3%;
  left: 0;
  border-bottom: 1px solid #3498db;
  border-left: 1px solid #3498db;
}

.bottom-right3 {
  bottom: 3%;
  right: 0.5%;
  border-bottom: 1px solid #3498db;
  border-right: 1px solid #3498db;
}
</style>