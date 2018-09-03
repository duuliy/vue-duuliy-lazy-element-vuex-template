import {
  GetByQuery,
  GetByQueryAsync,
  GetUserDetailDtoByIdAsync,
  AddAsync,
  GetDomainTypesListAsync,
  UpdateUserAsync
} from "@/api/request";

export default {
  state: {
    tableData3: [],
    tableData23: {},
    domainList:[],
    options2:[],
    addmessage:{},
    upmessage:{},
    userDetail:{}
  },
  mutations: {
    GetByQueryAsync(state, tableData3) {
      state.tableData3 = tableData3;
    },
    callGetByQuery(state, tableData23) {
      state.tableData23 = tableData23;
    },
    GetDomainTypesListAsync(state, domainList) {
      state.domainList = domainList;
    },
    GetUserDetailDtoByIdAsync(state, options2) {
      state.options2 = options2;
    },
    AddAsync(state, addmessage){
        state.addmessage = addmessage;
    },
    UpdateUserAsync(state, upmessage){
        state.upmessage = upmessage;
    },
    GetUserDetailDtoByIdAsync(state, userDetail){
        state.userDetail = userDetail;
    }
  },
  getters: {},
  actions: {
    async GETBYQUERYASYNC({ commit }, data) {
      commit('showLoading');
      const res = await GetByQueryAsync(data);
      commit('hideLoading');
      if (res.status == 200) {
        commit("GetByQueryAsync", res.data.result);
      } else {
        throw new Error(res);
      }
    },
    async CALLGETBYQUERY({ dispatch, commit }, data) {
      const res = await GetByQuery(data);
      if (res.status == 200) {
        commit("callGetByQuery", res.data.result[0]);
      } else {
        throw new Error(res);
      }
    },
    async GETDOMAINTYPESLISTASYNC({ commit }, data) {
      const res = await GetDomainTypesListAsync(data);
      if (res.status == 200) {
        commit("GetDomainTypesListAsync", res.data);
      } else {
        throw new Error(res);
      }
    },
    async GETUSERDETAILDTOBYIDASYNC({ commit }, data) {   //This request is post, but get passes.
      const res = await GetUserDetailDtoByIdAsync(data);
      if (res.status == 200) {
        commit("GetUserDetailDtoByIdAsync", res.data.result);
      } else {
        throw new Error(res);
      }
    },
    async ADDASYNC({ commit }, data) {   
        const res = await AddAsync(data);
        if (res.status == 200) {
          commit("AddAsync", res.data);
        } else {
          throw new Error(res);
        }
    },
    async UPDATEUSERASYNC({ commit }, data){
        const res = await UpdateUserAsync(data);
        if (res.status == 200) {
          commit("UpdateUserAsync", res.data);
        } else {
          throw new Error(res);
        }
    },
    async GETUSERDETAILDTOBYIdASYNC(){   //This request is post, but get passes.
        const res = await GetUserDetailDtoByIdAsync(data);
        if (res.status == 200) {
          commit("GetUserDetailDtoByIdAsync", res.data);
        } else {
          throw new Error(res);
        }
    }
  }
};
