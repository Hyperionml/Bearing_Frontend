<template>
  <div class="gauge-container" :class="{ 'color-changed': isTimeToChange }">
    <canvas ref="gaugeCanvas"></canvas>
    <div class="temp-display">{{ internalTemp }}°C</div>
    <div class="scale">轴承温度</div>
  </div>
</template>

<script>
export default {
  name: "WenduGauge",
  props: {
    currentTemp: {
      type: Number,
      default: 53,
    },
  },
  data() {
    return {
      internalTemp: this.currentTemp,
      // 新增一个变量用于记录是否达到时间切换点，初始为false
      isTimeToChange: false
    };
  },
  mounted() {
    this.drawGauge();
    this.startTempUpdate();
    // 设置定时器，27秒后改变颜色相关属性对应的状态
    if(this.$store.state.num>25){

      this.isTimeToChange = true;
      this.drawGauge();
    }
    
  },
  methods: {
    drawGauge() {
      const canvas = this.$refs.gaugeCanvas; // 获取canvas元素
      const ctx = canvas.getContext("2d"); // 获取2d上下文
      const radius = canvas.width / 2; // 圆的半径
      const pointerLength = radius - 20; // 指针的长度
      const maxTemp = 100; // 温度最大值
      const minTemp = 0; // 温度最小值

      // 绘制背景的温度盘
      function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas

        // 绘制外圈（根据是否达到时间切换点来确定颜色）
        ctx.beginPath();
        ctx.arc(radius, radius, radius - 10, (5 * Math.PI / 6), (13 * Math.PI / 6)); // 角度范围变为240度的半圆形，从150度到390度（等同于30度），整体再向右转30度
        ctx.lineWidth = 20;
        if (this.isTimeToChange) {
          ctx.strokeStyle = "#ff82B4"; // 27秒后变为这个外圈颜色
        } else {
          ctx.strokeStyle = "#1482ff"; // 开始到26秒的外圈颜色
        }
        ctx.stroke();
      }

      // 绘制刻度
      function drawScale() {
        const step = 10; // 刻度的步长
        const maxTemp = 100; // 温度最大值
        const minTemp = 0; // 温度最小值

        for (let i = minTemp; i <= maxTemp; i += step) {
          // 计算当前刻度对应的角度，从150度到390度（等同于30度）的240度区间，整体再向右转30度
          const angle = (5 * Math.PI / 6) + ((i - minTemp) / (maxTemp - minTemp)) * (4 * Math.PI / 3);

          // 绘制刻度线
          ctx.beginPath();
          ctx.moveTo(
            radius + Math.cos(angle) * (radius - 15),
            radius + Math.sin(angle) * (radius - 15)
          );
          ctx.lineTo(
            radius + Math.cos(angle) * (radius - 25),
            radius + Math.sin(angle) * (radius - 25)
          );
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#333";
          ctx.stroke();

          // 绘制刻度的数字
          ctx.font = "1.5vw Arial";
          ctx.fillStyle = "#333";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // 根据新的角度范围调整刻度数字的位置，使其更居中
          const textX = radius + Math.cos(angle) * (radius - 40);
          const textY = radius + Math.sin(angle) * (radius - 40);

          ctx.fillText(
            i,
            textX,
            textY
          );
        }
      }

      // 绘制指针
      function drawPointer(temp) {
        // 根据温度计算指针的角度
        const angle = (5 * Math.PI / 6) + ((temp - minTemp) / (maxTemp - minTemp)) * (4 * Math.PI / 3);

        ctx.beginPath();
        ctx.moveTo(radius, radius); // 指针的起始点（圆心）
        ctx.lineTo(
          radius + Math.cos(angle) * pointerLength,
          radius + Math.sin(angle) * pointerLength
        );
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ff4500"; // 指针颜色保持不变
        ctx.stroke();
      }

      // 更新仪表盘
      drawBackground.call(this);
      drawScale();
      drawPointer(this.internalTemp);
    },
    startTempUpdate() {
      setInterval(() => {
        this.updateTemp();
      }, 3000);
    },
    updateTemp() {
      let min;
      let max;
      if(this.$store.state.num<25){
        min=50;
        max=55;
      }else{
        min=73;
        max=78;
      }
      const randomValue = Math.random();
      this.internalTemp = Math.floor(randomValue * (max - min + 1) + min);
    }
  },
  watch: {
    // 当 `internalTemp` 改变时重新绘制仪表盘
    internalTemp() {
      this.drawGauge();
    }
  }
};
</script>

<style scoped>
.gauge-container {
  position: relative;
  width: 56.5%; 
  height: 68%; 
  background-color: hsla(201, 86%, 56%, 0.5);
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(7, 219, 235, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10%;
  left: 20%;
}
/* 新增的改变颜色后的类名对应的样式 */
.gauge-container.color-changed {
  background-color: hsla(11, 92%, 54%, 0.5);
}

canvas {
  position: absolute;
  width: 100%;
  height: 50%;
  font-size: 3vh;
  top: 0;
}

.temp-display {
  position: relative;
  font-size: 3vh;
  color: f4a5a5;
  font-weight: bold;
  z-index: 2;
}

.scale {
  position: absolute;
  width: 100%;
  top: 100%;
  text-align: center;
  color: azure;
  font-size: 1.5vw;
  margin-top: 10px;
}

.scale span {
  display: inline-block;
  width: 10%;
}
</style>