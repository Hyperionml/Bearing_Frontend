<template>
  <div class="main-shang">
    <!-- <div class="main-xia-border"></div> -->
    <div class="main-shang-top">
      <div class="corner5 top-left5"></div>
      <div class="corner5 top-right5"></div>
      <div class="corner5 bottom-left5"></div>
      <div class="corner5 bottom-right5"></div>
      <div class="tiao"></div>
      <div class="zi1">轴承1</div>
      <div class="main-shang-tu"></div>
      <div class="dong"></div>
    </div>
    <div class="main-shang-middle">
      <div class="corner5 top-left5"></div>
      <div class="corner5 top-right5"></div>
      <div class="corner5 bottom-left5"></div>
      <div class="corner5 bottom-right5"></div>
      <div class="tiao"></div>
      <div class="zi2">轴承2</div>
      <div
        class="main-shang-tu2"
        :style="getBackgroundStyle(valueIstrue)"
      ></div>
      <div class="dong2"
      :style="isStop(valueIstrue)"
      ></div>
    </div>
    <div class="main-shang-boot">
      <div class="corner5 top-left5"></div>
      <div class="corner5 top-right5"></div>
      <div class="corner5 bottom-left5"></div>
      <div class="corner5 bottom-right5"></div>
      <div class="tiao"></div>
      <div class="zi3">轴承3</div>
      <div class="main-shang-tu"></div>
      <div class="dong"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homeupbody",
  data() {
    return {
     
    };
  },
  methods: {
    getBackgroundStyle(isTrue) {
      if (isTrue) {
        return {
          background:
            "linear-gradient(to top, rgba(250, 251, 252, 0.01), rgba(4, 228, 248, 0.3))",
        };
      } else {
        return {
          background:
            "linear-gradient(to top, rgba(253, 31, 2, 0.01), rgba(249, 33, 4, 0.9))",
          animation: "flashBackground 0.5s infinite alternate",
        };
      }
    },
    isStop(isTrue){
      if (isTrue) {
        return {
          animation: "moveUp 3s infinite"
        }
      } else {
        return {
          animation: "none"
        };
      }
    }
  },
  computed: {
    valueIstrue() {
      return this.$store.state.pievalue; 
    },
  },
};
</script>

<style>
.main-shang {
  width: 100%;
  height: 50%;
  display: flex;
  /* position: relative; */
  /* border: 1px solid blue; */
}
.main-shang-top,
.main-shang-middle,
.main-shang-boot {
  flex: 1;
  position: relative;
  background-image: url("/src/images/dizuo07.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  /* border: 1px solid blue; */
  /* overflow: visible; */
}
.tiao {
  width: 100%;
  height: 50%;
  position: absolute;
  background-image: url("/src/images/tiaokuang3.png");
  background-size: 90%;
  background-position: -570% 100%;
  background-repeat: no-repeat;
}
.main-shang-tu {
  position: absolute;
  width: 17.7%;
  height: 40%;
  border-bottom: none;
  top: 20.5%;
  left: 40.6%;
  background: linear-gradient(
    to top,
    rgba(250, 251, 252, 0.01),
    rgba(4, 228, 248, 0.3)
  );
  /* animation: scrollBackground 10s linear infinite; */
  /* background: linear-gradient(to top, rgba(253, 31, 2, 0.01), rgba(249, 33, 4, 0.9)); */
  /* animation: flashBackground 0.5s infinite alternate; */
}
.main-shang-tu2 {
  position: absolute;
  width: 17.7%;
  height: 50%;
  border-bottom: none;
  top: 20.5%;
  left: 40.7%;
  /* background: linear-gradient(
    to top,
    rgba(250, 251, 252, 0.01),
    rgba(4, 228, 248, 0.3)
  ); */
  /* animation: scrollBackground 10s linear infinite; */
  /* background: linear-gradient(to top, rgba(253, 31, 2, 0.01), rgba(249, 33, 4, 0.9)); */
  /* animation: flashBackground 0.5s infinite alternate; */
}
/* .tu2{/
  background: linear-gradient(to top, rgba(253, 31, 2, 0.01), rgba(249, 33, 4, 0.9)); 
} */
.dong {
  position: absolute;
  width: 17.7%;
  border-top: 1px solid rgba(4, 228, 248, 0.4);
  top: 62%;
  left: 40.6%;
  animation: moveUp 3s infinite;
  z-index: 99;
}
.dong2 {
  position: absolute;
  width: 17.7%;
  border-top: 1px solid rgba(4, 228, 248, 0.4);
  top: 62%;
  left: 40.6%;
  animation: moveUp 3s infinite;
  z-index: 99;
}
.main-shang-top .dong{
  animation-delay: 0.8s;
}
.main-shang-middle .dong2 {
  animation-delay: 0s;
}
.main-shang-boot .dong {
  animation-delay: 1.6s;
}
@keyframes moveUp {
  0% {
    top: 62%;
    width: 17.7%;
  }
  100% {
    top: 20.5%;
    width: 17.7%;
  }
} 

@keyframes flashBackground {
  0% {
    background: linear-gradient(
      to top,
      rgba(253, 31, 2, 0.01),
      rgba(210, 33, 4, 0.9)
    );
  }
  25% {
    background: linear-gradient(
      to top,
      rgba(253, 31, 2, 0.01),
      rgba(220, 33, 4, 0.7)
    );
  }
  50% {
    background: linear-gradient(
      to top,
      rgba(253, 31, 2, 0.01),
      rgba(230, 33, 4, 0.7)
    );
  }
  75% {
    background: linear-gradient(
      to top,
      rgba(253, 31, 2, 0.01),
      rgba(235, 33, 4, 0.7)
    );
  }
  100% {
    background: linear-gradient(
      to top,
      rgba(253, 31, 2, 0.01),
      rgba(240, 33, 4, 0.9)
    );
  }
}
.zi1,
.zi2,
.zi3 {
  position: absolute;
  width: 11%;
  height: 10%;
  left: 11%;
  color: aqua;
  top: 6%;
  font-size: 2.6vh;
  /* border: 1px solid blue; */
}
.corner5 {
  position: absolute;
  width: 8%;
  height: 7.5%;
  border: 2px solid transparent;
  box-sizing: border-box;
}
.top-left5 {
  top: 4%;
  left: 3.5%;
  border-top: 2px solid #3498db;
  border-left: 3px solid #3498db;
}

</style>