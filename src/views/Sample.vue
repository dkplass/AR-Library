<template>
  <div class="container h-100 my-container">
    <model-viewer
      v-if="sample"
      :src="`${sample.ModelURL}.glb`"
      :ios-src="`${sample.ModelURL}.usdz`"
      ar
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="auto"
      quick-look-browsers="safari chrome"
      camera-controls=""
      camera-target="auto auto 20m"
      camera-orbit="0deg 75deg 100%"
      alt="3D model"
    ></model-viewer>
    <div v-if="sample" class="description-area">
      品牌名稱：{{ sample.BrandNameTemp ? sample.BrandNameTemp : "" }}
      <br />
      產品類別：{{ sample.SeriesTagNameTemp ? sample.SeriesTagNameTemp : "" }}
      <br />
      產品名稱：{{ sample.ProductName ? sample.ProductName : "" }}
    </div>
    <div v-else class="preload-layer"></div>
    <DragPanel :samples="samples" @display3DModel="display3DModel"></DragPanel>
  </div>
</template>

<script>
import DragPanel from "@/components/DragPanel.vue";

export default {
  name: "Sample",
  components: {
    DragPanel
  },
  data() {
    return {
      samples: [],
      sample: null
    };
  },
  watch: {
    "$route.params.queryData": {
      handler(value) {
        if (value) {
          this.querySamples(value);
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    androidModel() {
      if (!this.data || !this.data.ProductNo) {
        return "https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/library/BA5750_4k_High.glb";
      }

      if (this.data && this.data.ProductNo.indexOf("T01") >= 0) {
        return "https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/library/BA5566_4k_High.glb";
      }

      if (this.data && this.data.ProductNo.indexOf("T02") >= 0) {
        return "https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/library/H09Z1805_4k_High.glb";
      }

      return "";
    },
    iosModel() {
      if (!this.data || !this.data.ProductNo) {
        return "https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/library/BA5750_4k_High.usdz";
      }

      if (this.data && this.data.ProductNo.indexOf("T01") >= 0) {
        return "https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/library/BA5566_4k_High.usdz";
      }

      if (this.data && this.data.ProductNo.indexOf("T02") >= 0) {
        return "https://raw.githubusercontent.com/dkplass/dkplass.github.io/master/library/H09Z1805_4k_High.usdz";
      }

      return "";
    }
  },
  methods: {
    querySamples(v) {
      const api = `${process.env.VUE_APP_BASE_API}/api/Product/GetList`;

      const condition = {
        ProductNo: v.ProductNo ? v.ProductNo : "",
        BrandNo: v.BrandNo ? v.BrandNo : "",
        SeriesTagNo: v.SeriesTagNo ? v.SeriesTagNo : ""
      };

      this.$http
        .post(api, condition)
        .then(response => {
          this.samples = response.data.Resource;
        })
        .catch(console.error());
    },
    display3DModel(sample) {
      this.sample = sample;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-container {
  color: #e5e5e5;
}

.description-area {
  position: absolute;
  bottom: 3rem;
}

.preload-layer {
  width: 100%;
  height: 100%;
  background-image: url('../assets/AR.svg');
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
</style>
