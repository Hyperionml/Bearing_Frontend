<template>
  <div class="bingtu">
    <div ref="pieChart" class="piebody"></div>
    <div class="label">正常率 {{ normalRate }}%</div>
    <div class="legend">
      <div class="legend-item">
        <div class="color-box normal-color"></div>
        <span>正常率</span>
      </div>
      <div class="legend-item">
        <div class="color-box failure-color"></div>
        <span>失灵率</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapMutations } from "vuex";
export default {
  name: "Zhuangtai",
  data() {
    return {
      value01: true,
      value02: this.$store.state.pievalue,
      value03: true,

      chartOptions: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        color: ["rgb(53, 190, 214)", "rgb(238, 54, 34)"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [{ value: 1 }, { value: 0 }],
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(['FUZHI01']),
    initChart() {
      const chartElement = this.$refs.pieChart;
      this.chartInstance = echarts.init(chartElement);
      this.chartInstance.setOption(this.chartOptions);
    },
    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.dispose();
        this.chartInstance = null;
        this.isChartDestroyed = true;
      }
    },
    updateChart() {
      if (this.chartInstance&&!this.isChartDestroyed) {
        this.chartOptions.series[0].data[0].value = this.normalRate;
        this.chartOptions.series[0].data[1].value = 100 - this.normalRate;
        this.chartInstance.setOption(this.chartOptions, true);
      }
    },
    zhuangHuan(){
      this.FUZHI01(this.value02)
      // console.log(this.$store.state.pievalue,'状态')
    }
  },
  computed: {
    normalRate() {
      let percentage = [];
      let sum = 0;
      percentage.push(this.value01);
      percentage.push(this.value02);
      percentage.push(this.value03);
      for (const id of percentage) {
        if (id === true) {
          sum++;
        }
      }
      return ((sum / 3) * 100).toFixed(1);
    },
  },  
  watch: {
    chartOptions: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    setTimeout(() => {
      this.value02=false
      this.zhuangHuan()
      // this.$store.commit('FUZHI01',this.value02)
      // console.log(this.$store.state.pievalue)
    }, 27000);
    // setTimeout(() => {
    //   this.value02=true
    //   this.zhuangHuan()
    //   this.$store.commit('FUZHI01',this.value02)
    //   console.log(this.$store.state.pievalue)
    // }, 10000);
    setInterval(() => {
      this.updateChart();
    }, 1000);
  },
  beforeDestroy() {
    this.destroyChart();
  },
};
</script>

<style scoped>
.bingtu {
  width: 100%;
  height: 100%;
  position: relative;
}
.piebody {
  width: 90%;
  height: 90%;
  padding: 0 20% 0 0;
}

.label {
  font-size: 1.9vw;
  margin-top: 0%;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  position: absolute;
  bottom: 12%;
  left: 12%;
}
.legend {
  position: absolute;
  width: auto;
  height: auto;
  /* border: 1px solid blue; */
  top: 15%;
  right: 8%;
  background: rgba(0, 0, 0, 0.7);
  padding: 3%;
  border-radius: 10px;
  box-shadow: 0 0 3vh rgba(255, 255, 255, 0.5);
  font-size: 2vh;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  color: azure;
  text-align: left;
}
.legend-item {
  display: flex;
  align-items: center;
}
.color-box {
  width: 3.3vh;
  height: 3.3vh;
  border-radius: 4px;
  margin-right: 1vh;
}
.normal-color {
  background-color: rgb(53, 190, 214);
}

.failure-color {
  background-color: rgb(238, 54, 34);
}
</style>
