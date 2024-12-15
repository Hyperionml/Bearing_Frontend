<template>
  <div class="header">
    <div class="xuanZhe" @click="isShow">
      {{title}}
      <transition name="slide">
        <div v-if="isture" class="zhanShi">
          <!-- <div class="">轴承1</div> -->
          <div @click="changeTitle('轴承1')">
            <router-link
              replace
              to="/"
              class="list-item"
              active-class="active"
              exact
              >轴承1</router-link
            >
          </div>
          <div @click="changeTitle('轴承2')">
            <router-link
              replace
              to="/bearing02"
              class="list-item"
              active-class="active"
              exact
              >轴承2</router-link
            >
          </div>
          <div @click="changeTitle('轴承3')">
            <router-link
              replace
              to="/bearing03"
              class="list-item"
              active-class="active"
              exact
              >轴承3</router-link
            >
          </div>
          <!-- <div class="">轴承2</div> -->
          <!-- <div class="">轴承3</div> -->
        </div>
      </transition>
    </div>
    <span class="topic">轴承故障诊断系统</span>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isture: false,
      title:''
    };
  },
  methods: {
    isShow() {
      this.isture = !this.isture;
    },
    changeTitle(newTitle) {
      this.title = newTitle; // 设置新的标题
      // console.log(this.title)
      // this.isture = false;   // 隐藏下拉菜单
    },
  },
};
</script>

<style>
.header {
  position: relative;
  width: 100%;
  height: 10%;
  text-align: center;
  font-size: 25px;
  line-height: 60px;
  /* font-family: "Arial", sans-serif; */
  background-image: url("/src/images/head_bg.png");
  background-size: 100% 115%;
}
.xuanZhe {
  position: absolute;
  /* height: 60%; */
  /* border: 1px solid white; */
  /* float: left; */
  font-size: 18px;
  width: 100px;
  background-image: url("/src/images/anniu.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  color: azure;
  height: 60%;
  line-height: 40px;
  /* text-align: ; */
  /* width: 50px; */
  margin: 10px 0 0 20px;
  /* height: 80%; */
}
.xuanZhe .zhanShi {
  width: 70px;
  background-color: rgb(65, 65, 63);
  margin: -2px 0 0 14px;
}
/* .xuanZhe span{ */
/* text-align: center; */
/* display: inline-block;
    margin-bottom: 30px; */ 
/* } */
.header span {
  /* display: inline-block; */
  /* margin: 20px; */
  color: azure;
}
/* .header .topic{
  margin-left: ;
} */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(0px);
}
</style>