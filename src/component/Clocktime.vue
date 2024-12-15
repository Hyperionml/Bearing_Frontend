<template>
  <div class="clocktime">
    <div class="datetime-container">
      <div class="date">{{ formattedDate }}</div>
      <div class="time">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clocktime",
  data() {
    return {
        currentDate: new Date(),
    };
  },
  computed: {
    formattedDate() {
      const year = this.currentDate.getFullYear();
      const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2);
      const day = ('0' + this.currentDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    formattedTime() {
      const hour = ('0' + this.currentDate.getHours()).slice(-2);
      const minute = ('0' + this.currentDate.getMinutes()).slice(-2);
      const second = ('0' + this.currentDate.getSeconds()).slice(-2);
      return `${hour}:${minute}:${second}`;
    },
  },
  mounted() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    
    const startTime = new Date();
    let timeData = []; // 存储时间轴
    let runtimeData = []; // 存储对应时间点的运行时间
    const MAX_DATA_POINTS = 100;
    let myChart;

    const updateChart = () => {
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000); // 计算页面运行时间（秒）
      timeData.push(new Date().toLocaleTimeString());
      runtimeData.push(elapsedTime);

      if (timeData.length > MAX_DATA_POINTS) {
        timeData.shift(); // 删除最早的时间
        runtimeData.shift(); // 删除最早的运行时间
      }

      myChart.setOption({
        xAxis: {
          data: timeData,
        },
        series: [
          {
            data: runtimeData,
          },
        ],
      });
    }
  },
};
</script>

<style>
.clocktime {
  width: 90%;
  height: 90%;
}

.datetime-container {
  width: 85%;
  height: 85%;
  margin: 10% 0 0 13%;
  /* padding: 40%; */
  text-align: center;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
}

.date {
  font-size: 7vh;
  font-weight: 600;
  margin: 30% 0 5% 0;
  /* margin-bottom: 10%; */
  color: #3498db;
  text-shadow: 0 0 5px rgba(52, 152, 219, 0.7);
}

.time {
  font-size: 7vh;
  font-weight: 800;
  letter-spacing: 2px;
  color: #3498db;
  text-shadow: 0 0 8px rgba(52, 152, 219, 0.7);
}
</style>