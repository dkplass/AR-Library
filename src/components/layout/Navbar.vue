<template>
  <nav class="site-navbar">
    <div class="logo">
      <router-link to="/Home">AR Library</router-link>
    </div>
    <div class="menu">
      <button class="menu-btn" @click="toggleMenu">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    toggleMenu() {
      this.$emit("toggleMenu");
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff;
  background-color: #c89666;
  border-color: #e1b382;
}

.menu-btn:focus {
  outline: none;
}

.menu-btn:hover {
  background-color: #e1b382;
  border-color: #c89666;
}
</style>
