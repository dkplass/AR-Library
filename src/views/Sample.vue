<template>
  <div v-if="data" class="container h-100 my-container">
    <model-viewer
      src="https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/YL-O009_M0545.glb"
      ar=""
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="auto"
      quick-look-browsers="safari chrome"
      camera-controls=""
      alt="A 3D model of an astronaut"
    ></model-viewer>
    <div class="description-area">
      品牌名稱：{{ data.BrandName }} <br />
      產品類別：{{ data.SeriesTagName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Sample",
  data() {
    return {
      data: null
    };
  },
  watch: {
    "$route.params.queryData": {
      handler(value) {
        if (value) {
          this.querySample(value);
          this.data = value;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    querySample(v) {
      const api = `${process.env.VUE_APP_BASE_API}/api/Product/GetList`;

      const condition = {
        ProductNo: v.ProductNo ? v.ProductNo : "",
        BrandNo: v.BrandNo ? v.BrandNo : "",
        SeriesTagNo: v.SeriesTagNo ? v.SeriesTagNo : ""
      };

      this.$http
        .post(api, condition)
        .then(response => {
          console.log(response.data);
        })
        .catch(console.error());
    }
  }
};
</script>

<style lang="scss" scoped>
model-viewer {
  height: calc(100% - 3rem);
  width: 100%;
}

.my-container {
  color: #e5e5e5;
}

.description-area {
  position: absolute;
  bottom: 3rem;
}
</style>
