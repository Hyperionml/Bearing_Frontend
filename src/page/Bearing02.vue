<template>
  <div class="All02">
    <BodyFirst />
    <BodySecond />
  </div>
</template>

<script>
import BodyFirst from "@/component/BodyFirst.vue";
import BodySecond from "@/component/BodySecond.vue";
import { mapMutations } from "vuex";
export default {
  name: "Bearing02",
  components: { BodyFirst, BodySecond },
  data() {
    return {
      id:2
    };
  },
  created(){
    this.zhuanghuan()
  },
  methods:{
    ...mapMutations(["FUZHI02"]),
    zhuanghuan(){
      this.FUZHI02(this.id)
      console.log(this.$store.state.id)
    }
  },
};
</script>

<style>
.All02 {
  width: 100%;
  height: 100%;
  display: flex;
  /* border: 1px solid cyan; */
}
</style>