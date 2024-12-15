<template>
  <div class="timeSheZhi">
    <div id="main" style="width: 100%; height: 80%"></div>
    <span style="color: #d3d3d3; text-align: center; margin-top: 20%"
        >振动信号监测时长</span
      > 
  </div>
</template>

<script>
import { onMounted } from "vue";
import * as echarts from "echarts";

export default {
  name: "TimeTrend",
  setup() {
    const startTime = new Date();
    let timeData = [];
    let runtimeData = [];
    const MAX_DATA_POINTS = 100;
    let myChart;
    const updateChart = () => {
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      timeData.push(new Date().toLocaleTimeString());
      runtimeData.push(elapsedTime);
      if (timeData.length > MAX_DATA_POINTS) {
        timeData.shift(); 
        runtimeData.shift(); 
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
    };
    onMounted(() => {
      const chartDom = document.getElementById("main");
      myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
          name: "检测时长 (秒)",
        },
        series: [
          {
            name: "Running Time (seconds)",
            type: "line",
            data: [],
            smooth: true,
            lineStyle: {
              width: 2,
            },
            areaStyle: {},
          },
        ],
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            xAxisIndex: [0],
          },
        ],
      };
      myChart.setOption(option);
      setInterval(updateChart, 1000);
    });
    return {
      timeData,
      runtimeData,
    };
  },
};
</script>

<style scoped>
.timeSheZhi {
  widows: 100%;
  height: 95%;
}
#main {
  margin-top: 2%;
  margin-left: 1%;
  z-index: 10;
}
@media (max-width: 100%) {
  .datetime-container {
    width: 100%;
    padding: 100%;
  }
  .date {
    font-size: 16px;
  }
  .time {
    font-size: 24px;
  }
}
</style>