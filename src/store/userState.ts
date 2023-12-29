import { createStore } from "vuex";
import api from "./api";

const noteState = {
  state: {
    token: '' as string
  },
  getters: {},
  mutations: {
    SET_TOKEN(state: any, token: any) {
        state.token = token.token
        console.log(state.token)
    },

    SET_TO_LS(state: any) {
      localStorage.setItem("notes", state.notes);
    },
  },


  actions: {
    async getToken({ commit }: any, userData: any) {
      try {
        let response = await api.post(`/token-auth/`, userData);
        commit("SET_TOKEN", response.data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
   
  },
};

export default noteState;
