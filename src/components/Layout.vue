<template>
  <div class="wrapper">
    <Navbar @toggleMenu="toggleMenu"></Navbar>
    <MenuPanel :menuActived="menuActived" @toggleMenu="toggleMenu"></MenuPanel>
    <!-- <router-view></router-view> -->
    <div class="content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <!-- <Sample></Sample> -->
    </div>
    <DragPanel></DragPanel>
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue";
import MenuPanel from "@/components/layout/MenuPanel.vue";
// import Sample from "@/components/Sample.vue";
import DragPanel from "@/components/DragPanel.vue";

export default {
  name: "Layout",
  components: {
    Navbar,
    MenuPanel,
    // Sample,
    DragPanel
  },
  data() {
    return {
      menuActived: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuActived = !this.menuActived;
    }
  }
};
</script>
