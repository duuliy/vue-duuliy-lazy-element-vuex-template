<template>
	<el-menu class="nav" :default-active="acIndex" text-color="#A7B1D8" active-text-color="#fff">
		<el-menu-item v-for="(item,index) in routeList" :key="index" :index="index+''" @click="pushView(item)">
			<i :class="item.icon"></i>
			<span slot="title">{{item.title}}</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import routeList from "@/router/home";

export default {
  name: "NavMain",
  data() {
    return {
      routeList:routeList.filter(item=>item.path!='userDetails'),
      acIndex:"0",
      now_route:""
    };
  },
  methods: {
    ...mapMutations(["pushToRouteTags"]),
    pushView(route) {
      let rootPath = this.$route.matched[0].path
      this.$router.push(`${rootPath}/${route.path}`);
      this.pushToRouteTags(route);
    },
  },
  created() {
      this.routeList.map((item,index)=>{
        if(this.$route.fullPath.split("?")[0]===item.fullPath){
          this.acIndex=index.toString();
          this.now_route=item;
        }
      })
      this.pushToRouteTags(this.now_route);
  }
};
</script>

<style lang="scss">
.nav:not(.el-menu--collapse) {
  width: 235px;
}

.nav {
  background: $slider !important;
  float: left;
  height: 100% !important;
  overflow-x: hidden;
  overflow-y: auto;
}
.aside {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
  height: 100%;
}

.el-menu {
  border: none !important;
}

</style>