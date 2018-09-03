import { SignOutAsync } from "@/api/request";
import { setTimeout } from "timers";

export default {
  state: {
    collapse: false,
    logoutmeg: {},
    LOADINGs: false
  },
  mutations: {
    toggleCollapse(state, num) {
      state.collapse = !state.collapse;
    },
    SignOutAsync(state, SignOutAsync) {
      state.SignOutAsync = SignOutAsync;
    },
    showLoading(state) {
      state.LOADINGs = true;
    },
    hideLoading(state) {
      state.LOADINGs = false;
    }
    // changeIdIndex(state,index) {
    // 	state.idIndex = index;
    // },
    // changeIdList(state,idList) {
    // 	state.idList = idList;
    // },
  },
  getters: {},
  actions: {
    // async getPlayList({dispatch,commit,rootState},{id,index}){
    // 	return apifuns.getPlayList(id).then(data=>{
    // 		data&&commit("changeIdList",data.playlist.trackIds);
    // 		commit("changeIdIndex",index);

    // 	});
    // },
    // changePlayListandIndex({dispatch,commit,rootState},{arr,index}){
    // 	commit("changeIdList",arr);
    // 	commit("changeIdIndex",index);
    // }
    async SignOutAsync({ commit }) {
      const res = await SignOutAsync();
      if (res.status == 200) {
        commit("SignOutAsync", res.data);
      } else {
        throw new Error(res);
      }
    }
  }
};
