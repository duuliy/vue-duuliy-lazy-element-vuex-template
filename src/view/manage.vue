<template>
	<div class="home">
		<heade></heade>
		<div class="content">
			<navmain></navmain>
			<div class="rightBox" :class="{'active':$store.state.nav.collapse}">
				<tabsbar></tabsbar>
				<div class="route">
					<router-view/>
				</div>
			</div>
		</div>
		<foot></foot>
	</div>
</template>

<script>
import navmain from "@c/NavMain";
import tabsbar from "@c/tabsBar/tabsBar";
import heade from "@c/header";
import foot from "@c/footer";
export default {
  name: "manage",
  data() {
    return {
    };
  },
  components: {
    navmain,
    tabsbar,
    heade,
    foot
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color:rgba(240,243,247,1);
  .content {
    flex: 1;
    .rightBox {
      float: left;
      height: 100%;
      width: calc(100% - 235px);
      transition: all linear 0.3s;
      &.active {
        width: calc(100% - 64px);
        border: 1px solid blue;
      }
    }
    .route {
      // height: 100%;
      // overflow-y: auto;
    }
  }
  
}
</style>
