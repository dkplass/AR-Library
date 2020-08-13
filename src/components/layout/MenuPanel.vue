<template>
  <div class="menu-container">
    <div class="layer" @click="toggleMenu" v-if="menuActived"></div>
    <div class="menu-panel" :class="{ active: menuActived }">
      <div class="menu-header">
        <button class="btn close-btn" @click="toggleMenu">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      <div class="menu-body mt-2">
        <div
          class="menu-first-layer"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <div class="menu-item">
            <span class="px-2">{{ item.BrandName }}</span>
            <button
              class="btn expand-btn float-right"
              v-b-toggle="`collapse-${index}`"
              v-if="item.SeriesTags.length > 0"
            >
              <font-awesome-icon
                class="when-close"
                :icon="['fas', 'angle-down']"
              />
              <font-awesome-icon
                class="when-open"
                :icon="['fas', 'angle-up']"
              />
            </button>
          </div>
          <b-collapse :id="`collapse-${index}`" class="w-100">
            <b-list-group
              class="collapse-content"
              v-for="(tag, index) in item.SeriesTags"
              :key="index"
            >
              <b-list-group-item
                to="{ name:'Sample' }"
                class="collapse-content-item"
                @click="querySample(item, tag)"
                >{{ tag.SeriesTagName }}</b-list-group-item
              >
            </b-list-group>
          </b-collapse>
          <!-- {{ item }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuPanel",
  props: {
    menuActived: Boolean
  },
  data() {
    return {
      menuList: []
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    getMenu() {
      const api = `${process.env.VUE_APP_BASE_API}/api/Menu/GetList`;

      this.$http
        .get(api)
        .then(response => {
          const result = response.data.Resource;
          this.menuList = JSON.parse(result);
        })
        .catch(console.error);
    },
    querySample(i, t) {
      this.$emit("toggleMenu");

      const queryData = {
        BrandNo: i.BrandNo,
        BrandName: i.BrandName,
        SeriesTagNo: t.SeriesTagNo,
        SeriesTagName: t.SeriesTagName
      };

      this.$router.push({ name: "Sample", params: { queryData: queryData } });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .collapsed > .when-open,
.not-collapsed > .when-close {
  display: none;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.6);
  z-index: 900;
}

.menu-panel {
  position: absolute;
  top: 0;
  right: -16rem;
  height: 100%;
  width: 16rem;
  background-color: #12343b;
  border: 1px solid #2d545e;
  z-index: 999;
  transition: right 0.2s linear;

  &.active {
    right: 0;
  }

  .menu-header::after {
    content: "";
    display: block;
    margin: 0 auto;
    position: relative;
    top: 4px;
    width: 98%;
    height: 1px;
    border-bottom: 1px solid #2d545e;
  }

  .menu-body {
    overflow: auto;
  }

  .menu-first-layer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #e5e5e5;
  }

  .menu-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #e5e5e5;
    width: 100%;
    cursor: default;
  }

  .expand-btn {
    color: #e5e5e5;
  }

  .collapse-content {
    width: 100%;
    cursor: pointer;

    .collapse-content-item {
      background: none;
      border: none;
      padding: 0.2rem 0.8rem;
      color: #e5e5e5;

      &:hover {
        padding: 0.2rem 0.8rem;
        border-radius: 0;
        background-color: #2d545e;
      }
    }
  }
}

.close-btn {
  color: #ffffff;
  background-color: #2d545e;
  margin: 0.2rem;
}
</style>
