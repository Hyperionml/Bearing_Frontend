<template>
  <div class="main-xia">
    <div class="main-xia-top">
      
      <div class="main-xia-border"></div>
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
      <Clocktime />
    </div>
    <div class="main-xia-middle">
      
      <div class="main-xia-border"></div>
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
      <Time-trend />
    </div>
    <div class="main-xia-boot">
      <div class="main-xia-border"></div>
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
      <Zhuangtai/>
    </div>
  </div>
</template>

<script>
import TimeTrend from "./TimeTrend.vue";
import Clocktime from "./Clocktime.vue";
import Zhuangtai from './Zhuangtai.vue';
export default {
  name: "Homedownbody",
  components: { TimeTrend, Clocktime ,Zhuangtai},
  data() {
    return {};
  },
};
</script>

<style>
.main-xia {
  width: 100%;
  height: 50%;
  display: flex;
  text-align: center;
  position: relative;
}

.main-xia-top,
.main-xia-middle,
.main-xia-boot {
  position: relative;
  /* border: 1px solid blue; */
}
.main-xia-top {
  flex: 2.5;
}
.main-xia-middle {
  flex: 5;
}
.main-xia-boot {
  flex: 2.5;
}
.main-xia-top .main-xia-border,
.main-xia-middle .main-xia-border,
.main-xia-boot .main-xia-border {
  width: 92%;
  height: 82%;
  border: 1px solid rgba(52, 152, 219, 0.2);
  position: absolute;
  top: 10%;
  left: 4%;
  box-shadow: 0 10px 10px rgba(237, 245, 247, 0.3),
    0 6px 20px rgba(7, 194, 236, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.corner {
  position: absolute;
  width: 5%;
  height: 5%;
  border: 2px solid transparent;
  box-sizing: border-box;
}
.top-left {
  top: 10%;
  left: 4%;
  border-top: 1px solid #3498db;
  border-left: 1px solid #3498db;
}

.top-right {
  top: 10%;
  right: 4%;
  border-top: 1px solid #3498db;
  border-right: 1px solid #3498db;
}

.bottom-left {
  bottom: 8%;
  left: 4%;
  border-bottom: 1px solid #3498db;
  border-left: 1px solid #3498db;
}

.bottom-right {
  bottom: 8%;
  right: 4%;
  border-bottom: 1px solid #3498db;
  border-right: 1px solid #3498db;
}
</style>