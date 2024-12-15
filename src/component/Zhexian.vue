<template>
  <div>
    <div ref="main" style="width:60vw; height: 80vh"></div>
    <div id="alarm" v-show="showAlarm">警告：振动值超出安全范围！</div>
    <div id="error" v-show="showError">{{ errorMessage }}</div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// 由于移除了axios相关请求，这里暂时先注释掉，如果后续还有别的作用可按需调整
import instance from "@/js/axios";
import { mapMutations } from "vuex";
export default {
  name: "DataLook",
  props: {
    alarmThreshold: {
      type: Number,
      default: 0.28,
    },
  },
  data() {
    return {
      chart: null,
      showAlarm: false,
      showError: false,
      errorMessage: "",
      timeIncreaingData: [], // 存储图表数据（不再进行3秒数据过滤）
      intervalId: null,
      currentTime: new Date().getTime(), // 当前时间，用于生成时间戳
      totalArrays: 60, // 总共60个数组
      currentArrayIndex: 0, // 当前处理的数组索引
      dataInterval: 1000, // 数据采集的时间间隔，单位：毫秒
      windowSize: 3, // 显示最近3秒的数据（此变量可根据后续需求决定是否保留）
      maxDataPoints: 2050, // 每秒数据点数量的最大值,
      lastTimestamp: null, // 记录上一次添加数据的最后一个时间戳，用于衔接时间轴
      stopTimer: null, // 新增用于控制停止的定时器变量
      id2DataCount: 0, // 新增，用于记录id=2的数据获取次数
      // objectiveData:this.$store.state.objectiveData,
    };
  },
  mounted() {
    this.initChart().then(() => {
      this.startDataCollection();
    });
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // 清除定时器引用
    }
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }
  },

  methods: {
    // ...mapMutations(["FUZHI05"]),
    initChart() {
      return new Promise((resolve) => {
        this.chart = echarts.init(this.$refs.main);
        this.setChartOption();
        resolve();
      });
    },
    setChartOption() {
      const option = {
        title: { text: "振动信号图表" },
        tooltip: { trigger: "axis" },
        grid: { left: "60px", right: "100px", top: "60px", bottom: "30px" },
        xAxis: {
          type: "time", // 时间轴
          name: "时间",
          minInterval: this.dataInterval, // 每秒更新
          axisLabel: {
            interval: 5,
            formatter: (value) => echarts.format.formatTime("hh:mm:ss", value), // 格式化时间显示
            fontSize: 14, // 增加字体大小
            fontWeight: "bold", // 设置加粗
            color: "#333", // 设置颜色
          },
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          name: "振动信号",
          axisLabel: { show: true, formatter: "{value}" },
          splitLine: { show: false },
          axisLine: { show: true },
          scale: true,
          min: -0.35,
          max: 0.35,
          interval: 0.05, // 控制Y轴密度
        },
        series: [
          {
            name: "振动信号",
            type: "line",
            showSymbol: false,
            emphasis: { scale: true },
            smooth: true, // 开启平滑连接
            data: [], // 初始化为空数组，后续仅添加新增数据
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: this.alarmThreshold,
                  lineStyle: { color: "red" },
                  label: {
                    position: "end",
                    formatter: `报警阈值: ${this.alarmThreshold}`,
                  },
                },
                {
                  yAxis: -this.alarmThreshold,
                  lineStyle: { color: "red" },
                  label: {
                    position: "end",
                    formatter: `报警阈值: ${-this.alarmThreshold}`,
                  },
                },
              ],
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            type: "slider",
            show: true,
            start: 0,
            end: 100,
          },
        ],
      };
      this.chart.setOption(option);
    },
    
    startDataCollection() {
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          let dataToUse = [];
          if (this.$store.state.id == 1) {
            dataToUse = this.$store.state.allData[1];
          } else if (this.$store.state.id == 2) {
            // if(this.$store.state.num==27){
            //   this.objectiveData=this.$store.state.allData[0];
            //   this.zhuanHuanData()
            // }
            if(this.$store.state.num<27){
              dataToUse = this.$store.state.allData[0];
            }else{
              let arr=[];
              let arr2=this.$store.state.allData[0];
              for(let i=0;i<273;i++){
                arr[i]=arr2[i]
              }
              dataToUse=arr
              // console.log(dataToUse)
            }
            this.id2DataCount++;
            const maxCountForId2 = 27 * 1000 / this.dataInterval; // 计算27秒对应的获取次数，因为dataInterval单位是毫秒
            if (this.id2DataCount > maxCountForId2) {
              this.stopDataCollection();
              return; // 直接返回，不再执行后续添加数据到图表等操作
            }
          } else if (this.$store.state.id == 3) {
            dataToUse = this.$store.state.allData[2];
          }
          if (Array.isArray(dataToUse) && dataToUse.length > 0) {
            this.addNewDataToChart(dataToUse); // 将数据添加到图表
          } else {
            this.showError = true;
            // this.errorMessage = "数据获取失败，数据格式不符合要求或为空";
          }
        }, this.dataInterval);
      }
    },
    // zhuanHuanData(){
    //   this.FUZHI05(this.objectiveData)
    // },
    // 添加数据到图表，仅添加新增数据，确保时间戳衔接
    addNewDataToChart(newData) {
      const now = new Date().getTime();
      const timeIncrement = 1000 / this.maxDataPoints;
      let newTimeSeries = [];
      if (this.timeIncreaingData.length > 0) {
        const lastIndex = this.timeIncreaingData.length - 1;
        const lastData = this.timeIncreaingData[lastIndex];
        const lastTimestamp = lastData[0];
        newTimeSeries = newData.map((value, index) => [
          lastTimestamp + (index + 1) * timeIncrement,
          value,
        ]);
      } else {
        // 如果timeIncreaingData为空，按照首次添加数据的逻辑来处理（这里可以根据实际需求调整逻辑）
        newTimeSeries = newData.map((value, index) => [
          now + index * timeIncrement,
          value,
        ]);
      }
      this.lastTimestamp = newTimeSeries[newTimeSeries.length - 1][0]; // 更新上一次的最后时间戳

      // 检查新添加的数据是否超过报警阈值
      const isExceedThreshold = newTimeSeries.some(([_, yValue]) => {
        return Math.abs(yValue) > this.alarmThreshold;
      });
      if (isExceedThreshold) {
        this.showAlarm = true;
        this.stopDataCollection();
      }

      // 直接使用新生成的数据系列更新图表数据，而不是合并之前的数据
      this.chart.setOption(
        {
          series: [
            {
              data: newTimeSeries,
            },
          ],
        },
        false
      );
    },

    stopDataCollection() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      // 可以根据情况添加更多停止相关的逻辑，比如图表停止更新等
      // 例如，如果想清空图表数据，可以这样做（可选操作）
      // this.timeIncreaingData = [];
      // this.chart.setOption({
      //     series: [{
      //         data: this.timeIncreaingData
      //     }]
      // });
    },
  },
};
</script>

<style scoped>
#alarm {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

#error {
  color: red;
  font-size: 14px;
  padding: 10px;
  background-color: "#fdd";
  border: 1px solid "#f00";
  margin-top: 10px;
}
</style>