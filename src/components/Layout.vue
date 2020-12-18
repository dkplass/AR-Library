<template>
  <div class="wrapper">
    <Navbar @toggleMenu="toggleMenu"></Navbar>
    <MenuPanel :menuActived="menuActived" @toggleMenu="toggleMenu"></MenuPanel>
    <div class="content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue";
import MenuPanel from "@/components/layout/MenuPanel.vue";

export default {
  name: "Layout",
  components: {
    Navbar,
    MenuPanel
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
