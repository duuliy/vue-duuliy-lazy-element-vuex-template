<template>
	<div class="tabsItem inlineblock" :class="{'active':filter($route.fullPath)  === route.fullPath}" @click="changeRoute">
		<b class="dot"></b>
		{{route.title}}
		<i class="el-icon-close fs14" @click.stop="closeView"></i>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "tabsItem",
  components: {},
  props: {
    route: {}
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentRoute: state => {
        state.routeState.currentRoute;
      }
    })
  },
  methods: {
	filter(val){
	  // if (val.indexOf("?") != -1) {    //点亮用户统计小图标
    //     return val.split("?")[0];
    //   } else {
        return val;
	  // }
	},
    ...mapMutations(["closeTags", "changeCurrentRoute"]),
    closeView() {
      this.closeTags(this.route);
      this.$router.push(this.currentRoute.path);
    },
    changeRoute() {
      this.changeCurrentRoute(this.route);
      this.$router.push(this.route.path);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.tabsItem {
  margin-right: 5px;
  height: 26px;
  line-height: 26px;
  padding: 0 12px;
  border-radius: 4px;
  background-color: $tabls;
  color: $tabColor;
  cursor: pointer;
  transition: all linear 0.15s;
  i {
    &:hover {
      color: $danger;
    }
  }
  &.active {
    color: #fff;
    background: #42b983;
  }
}
</style>