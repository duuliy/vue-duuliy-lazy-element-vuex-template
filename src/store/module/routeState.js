import apifuns from '@api/apifuns'


export default {
	state: {
		routeTags:[],  //顶部小标签
		currentRoute:{},
	},
	mutations: {
		pushToRouteTags(state,obj){
			let flag=state.routeTags.some(item=>{
				// console.log(111)
				return item.name===obj.name
			})
			
			if(flag){
				// console.log(222)
				state.currentRoute=obj;
				return
			}
			state.currentRoute=obj;
			state.routeTags.push(obj);
			// state.currentRoute=obj;
			// console.log(333)
			// console.log(state.currentRoute)
		},
		changeCurrentRoute(state,route){
			state.currentRoute=route
		},
		
		
		closeTags(state,route){
			let index=null;
			state.routeTags.forEach((item,itemindex)=>{
				item.name===route.name?index=itemindex:null
			})
			if(index!==null){
				state.routeTags.splice(index,1);
			}
			if(state.routeTags.length>0){
				state.currentRoute=state.routeTags[0];
			}else{
				state.currentRoute={
					title: '组织机构',
					path: 'Organization',
					name: 'Organization',
					fatherTitle: '',
				}
				state.routeTags.push(state.currentRoute);
			}
		}
	},
	getters: {
		
	},
	actions:{
		// changePlayListandIndex({dispatch,commit,rootState},{arr,index}){
		// 	commit("changeIdList",arr);
		// 	commit("changeIdIndex",index);
		// }
		
	}


}




