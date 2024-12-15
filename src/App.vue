<template>
  <div class="box">
    <div class="header">
      <div class="zhuye" @click="changeTitle('轴承')">
        <router-link
          replace
          to="/"
          class="list-item2"
          active-class="active2"
          exact
        >
          <i class="fas fa-home"></i>
        </router-link>
      </div>
      <div class="xuanZhe" @click="isShow">
        <span class="topic">{{ title }}</span>
        <transition name="slide">
          <div v-if="isture" class="zhanShi">
            <div @click="changeTitle('轴承1')">
              <router-link
                replace
                to="/bearing01"
                class="list-item"
                active-class="active"
                >轴承1</router-link
              >
            </div>
            <div @click="changeTitle('轴承2')">
              <router-link
                replace
                to="/bearing02"
                class="list-item"
                active-class="active"
                >轴承2</router-link
              >
            </div>
            <div @click="changeTitle('轴承3')">
              <router-link
                replace
                to="/bearing03"
                class="list-item"
                active-class="active"
                >轴承3</router-link
              >
            </div>
          </div>
        </transition>
      </div>
      <span class="topic">轴承故障诊断系统</span>
      <div class="header-tu"></div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import instance from "@/js/axios";
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isture: false,
      title: "轴承",
      num: this.$store.state.num,
      datas: this.$store.state.allData,
      objectiveData:this.$store.state.objectiveData,
    };
  },
  created(){
    setInterval(() => {
      this.qingqiu();
      this.zhuangHuan();
      if(this.num<59){
        this.num++
      }
    }, 1000);
  },
  methods: {
    ...mapMutations(["FUZHI03", "FUZHI04","FUZHI05"]),
    isShow() {
      this.isture = !this.isture;
    },
    changeTitle(newTitle) {
      this.title = newTitle;
    },
    qingqiu() {
      // console.log('执行了')
      instance
        .get(`/newapi/get?datetime=20241031/1346/${this.num}`)
        .then((response) => {
          let data = response.data.data;
          let keys = [];
          // let datas = [];
          // console.log('执行了')
          try {
            let cleanData = data.replace(/{|}/g, ""); // 去除大括号
            let partString = cleanData.split(","); // 分割每一项数据
            // console.log('执行了')
            for (let lengths = 0; lengths < partString.length; lengths++) {
              // console.log('执行了')
              let twoPart = partString[lengths].split("="); // 根据等号分割键和值
              keys.push(twoPart[0]);
              let rightPart = twoPart[1].trim(); // 获取右侧的数值字符串
              let rightPartValueArray = rightPart
                .split(" ")
                .map((item) => parseFloat(item)); // 转换为数组，并解析浮动数值
              let rightBit = [];
              for (let i = 0; i < 10; i++) {
                // console.log('执行了')
                rightBit[i] = rightPartValueArray[i];
              }
              if (this.num == 1) {
                this.datas.push(rightBit);
              } else {
                for(let j=0;j<10;j++){
                  // console.log(rightBit[j])
                  // console.log('执行了')
                  this.datas[lengths].push(rightBit[j]);
                  // console.log(this.datas[lengths])

                }
              }
              
            }
            if(this.num==27){
                this.objectiveData=this.datas[0]
            }
          } catch (error) {
            this.showError = true;
            this.errorMessage = "数据解析错误：" + error.message;
          }
        })
        .catch((error) => {
          this.showError = true;
          this.errorMessage = "数据请求失败：" + error.message;
        });
        
    },
    zhuangHuan() {
      this.FUZHI03(this.datas);
      this.FUZHI04(this.num);
      // console.log(this.datas)
      // if(this.num==27){
      //   this.FUZHI05(this.objectiveData)
      // }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.box {
  background-image: url("/src/images/background04.png");
  /* filter: blur(0) opacity(0.5); */
  width: 100%;
  height: 100vh;
  background-size: 100%;
  overflow: hidden;
}
.header {
  position: relative;
  width: 100%;
  height: 9%;
  text-align: center;
  font-size: 4vh;
  line-height: 60px;
  /* border: 1px solid rgb(241, 239, 229); */
  background-size: 100% 115%;
}
.zhuye {
  position: absolute;
  /* color: rgb(45, 39, 39); */
  margin: 0 0 0 1%;
  /* font-size: ; */
}
.zhuye .fas {
  font-size: 200%;
  /* color: grey; */
}
.xuanZhe {
  position: absolute;
  font-size: 18px;
  width: 6%;
  background-image: url("/src/images/anniu.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  color: azure;
  height: 60%;
  line-height: 35px;
  margin: 0.8% 0 0 4.5%;
  z-index: 10;
}

.xuanZhe .zhanShi {
  width: 75%;
  background-color: rgb(65, 65, 63);
  margin: -6% 0 0 12%;
  z-index: 20; /* 确保下拉框在前面 */
}

.header span {
  display: inline-block;
  /* margin: 20px; */
  color: azure;
}
.header-tu {
  position: absolute;
  width: 4%;
  height: 95%;
  right: 0.5%;
  top: 2%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/src/images/23.png");
  animation: rotateAnimation 2s linear infinite;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(0px);
}
.body {
  width: 100%;
  height: 90%;
}

.zhanShi {
  text-align: center;
}
.list-item {
  color: azure;
  text-decoration: none;
  font-size: 14px;
}
.list-item.active {
  color: rgb(53, 190, 214);
}
.list-item2 {
  color: grey;
  text-decoration: none;
  font-size: 14px;
}
.list-item2.active2 {
  color: rgb(53, 190, 214);
}
</style>