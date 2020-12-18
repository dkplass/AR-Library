<template>
  <div class="drag-panel" :class="{ active: active }">
    <div class="drag-btn" @click="openDragPanel"></div>
    <div class="slider mt-3">
      <div class="slides">
        <template v-for="(sample, index) in displaySamples">
          <div
            v-if="sample.imgName !== ''"
            class="slide"
            :key="index"
            :style="{
              backgroundImage: 'url(' + sample.imgSrc + ')'
            }"
            @click="display3DModel(sample)"
          ></div>
          <div v-else class="slide" :key="index"></div>
        </template>
        <!-- <div
          class="slide"
          :style="{
            backgroundImage: 'url(' + require('@/assets/BA5566.png') + ')'
          }"
        ></div>
        <div
          class="slide"
          :style="{
            backgroundImage: 'url(' + require('@/assets/H09Z1805.png') + ')'
          }"
        ></div>
        <div
          class="slide"
          :style="{
            backgroundImage: 'url(' + require('@/assets/BA5760.png') + ')'
          }"
        ></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  name: "DragPanel",
  props: {
    samples: Array
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    // this.createInteract();
  },
  computed: {
    displaySamples() {
      const result = this.samples;

      // fake substr in obj
      result.forEach(r => {
        r.imgSrc = `images/${r.ProductNo}.png`;
        // r.imgSrc = "images/B01T01-001.png";
      });

      return result;
    },
    dataSet() {
      console.log(this.currentMenuSet);
      if (!this.currentMenuSet) {
        return [];
      }

      const imageSet = ["BA5566", "H09Z1805", "BA5760"];

      return imageSet;
    }
  },
  methods: {
    openDragPanel() {
      this.active = !this.active;
    },
    display3DModel(sample) {
      this.$emit("display3DModel", sample);
    },
    createInteract() {
      const _target = interact(".drag-panel");

      _target
        .resizable({
          edges: { top: true },
          inertia: true,
          listeners: {
            move: this.resizeListener
          },
          modifiers: [
            interact.modifiers.restrictEdges({
              outer: "parent"
            }),
            interact.modifiers.restrictSize({
              min: { height: 48 },
              max: { height: 256 }
            })
          ]
        })
        .draggable({
          startAxis: "y",
          lockAxis: "y",
          inertia: true,
          listeners: { move: this.dragMoveListener },
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: "parent",
              endOnly: true
            })
          ]
        });
    },
    resizeListener(event) {
      const _target = event.target;
      let y = parseFloat(_target.getAttribute("data-y")) || 0;

      // update element style
      _target.style.height = event.rect.height + "px";

      // translate when resizing from top edge
      _target.style.height = event.rect.height + `${y}px`;

      y += event.deltaRect.top;

      _target.setAttribute("data-y", y);
    },
    dragMoveListener(event) {
      const _target = event.target;

      // keep the dragged position in data-y attribute
      const y = (parseFloat(_target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      _target.style.height = event.rect.height + `${y}px`;

      // update the position attributes
      _target.setAttribute("data-y", y);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/ThemeColors.scss";

.drag-panel {
  position: absolute;
  bottom: 0;
  width: 96%;
  height: 3rem;
  color: $primary-font;
  background-color: $second;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.12, 1.16, 0.65, 0.88);
  touch-action: none;

  &.active {
    height: 16rem;
  }
}

.drag-btn {
  width: 4rem;
  height: 2rem;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
  cursor: n-resize;

  &:before {
    content: "";
    height: 2px;
    width: 30px;
    background-color: #ffffff;
    display: block;
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    content: "";
    height: 2px;
    width: 30px;
    background-color: #ffffff;
    display: block;
    position: absolute;
    top: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
  }
}

.drag-panel-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow: auto;
  width: 100%;

  .img-container {
    display: inline-block;
    height: 100%;

    > img {
      height: 13rem;
    }
  }
}

.slider {
  width: 100%;
  text-align: center;
  overflow: hidden;
  // position: absolute;
  // bottom: 16px;
  padding: 0 0.6rem;
}

.slides {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.slide {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 12rem;
  height: 12rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #c89666;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
  display: flex;
}

.slide.selected {
  border: 2px solid #4285f4;
}

.slide:focus {
  outline: none;
}

.slide:focus-visible {
  outline: 1px solid #4285f4;
}

@media (min-width: 646px) {
  .slides {
    justify-content: center;
  }
}
</style>
