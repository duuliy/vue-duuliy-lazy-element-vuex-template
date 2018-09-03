<template>
	<div class="tabsBar">
		<tabsitem v-for="(item,index) in tabsArr" :key="index" :route='item' class="item"></tabsitem>
	</div>
</template>

<script>
	import {mapState,mapMutations,mapActions} from "vuex"
	import tabsitem from '@c/tabsBar/tabsItem.vue'
	export default {
		name: 'tabsBar',
		components:{
			tabsitem,
		},
		
		computed:{
			...mapState({
			    tabsArr:state => state.routeState.routeTags,
			}),
		},
		
		data() {
			return {
			}
		},
		methods: {
			abc() {

			}
		},
		created(){
		},
		mounted(){
			
		}
		
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tabsBar{
	width:100%;
	height:60px;
	line-height: 60px;
	background-color: $slider;
	padding:0 20px;
}
</style>