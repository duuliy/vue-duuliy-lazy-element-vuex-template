import  {
  GetByQuery,
  AddOrAsync,
  UpdateAsync,
  DeleteAsync
} from "@/api/request";
import { setTimeout } from "timers";

export default {
  state: {
    tableData: [],
    DeleAsync:{},
    EditAsync:{}
  },
  mutations: {
    GetByQuery(state, tableData) {
        state.tableData = tableData;
    },
    DeleteAsync(state, DeleAsync) {
        state.DeleAsync = DeleAsync;
    },
    UpdateAsync(state, EditAsync){
        state.EditAsync = EditAsync;
    }
  },
  getters: {},
  actions: {
    async GETBYQUERY({commit},data) {
      commit('showLoading');
      const res = await GetByQuery(data);
      commit('hideLoading');
      if(res.status==200){
          commit('GetByQuery', res.data.result);
      }else{
        throw new Error(res)
      }
    },
    async DELETEASYNC({commit},data) {
        const res = await DeleteAsync(data);
        if(res.status==200){
          commit('DeleteAsync', res.data);
        }else{
          throw new Error(res)
        }
      },
      async UPDATEASYNC({commit},data) {
        const res = await UpdateAsync(data);
        if(res.status==200){
          commit('UpdateAsync', res.data);
        }else{
          throw new Error(res)
        }
      }
  }
};
