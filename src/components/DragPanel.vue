<template>
  <div class="drag-panel" :class="{ active: active }">
    <div class="drag-btn" @click="openDragPanel" @mousedown="dragDown($event)" @mouseleave="dragLeave($event)"></div>
    <div class="slider mt-3">
      <div class="slides">
        <div
          class="slide"
          :style="{
            backgroundImage: 'url(' + require('@/assets/bag-1.png') + ')'
          }"
        >
          <!-- <img src="@/assets/bag-1.png" alt="" /> -->
        </div>
        <div
          class="slide"
          :style="{
            backgroundImage: 'url(' + require('@/assets/bag-3.png') + ')'
          }"
        >
          <!-- <img src="@/assets/bag-3.png" alt="" /> -->
        </div>
        <div
          class="slide"
          :style="{
            backgroundImage: 'url(' + require('@/assets/bag-2.png') + ')'
          }"
        >
          <!-- <img src="@/assets/bag-2.png" alt="" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DragPanel",
  data() {
    return {
      active: false
    };
  },
  methods: {
    openDragPanel() {
      this.active = !this.active;
    },
    resize(e) {
      console.log(e);
    },
    dragDown(e) {
      document.addEventListener("mousemove", this.resize(e), false);
    },
    dragLeave(e) {
      document.removeEventListener("mousemove", this.resize(e), false);
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
  z-index: 99;
  transition: all 0.4s cubic-bezier(0.12, 1.16, 0.65, 0.88);

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
