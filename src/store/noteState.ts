import { createStore } from "vuex";
import api from "./api";

const noteState = {
  state: {
    notes: [],
  },
  getters: {},
  mutations: {
    SET_NOTES(state: any, notes: any) {
      state.notes = notes;
      state.notes.forEach((note: any) => {
        note.created = new Date();
        note.created = note.created.toLocaleString('ru-RU')
      });
    },

    SET_TO_LS(state: any) {
      localStorage.setItem("notes", state.notes);
    },

    CHAGE_NOTE(state: any, payload: any) {
      state.notes.forEach((note: any) => {
        if (note.id == payload.id) {
          note.title = payload.title;
          note.text = payload.text;
          note.id = payload.id;
          note.created = payload.created;
        }
      });
    },
    CREATE_NOTE(state: any, payload: any) {
      payload.created = new Date();
      payload.created = payload.created.toLocaleString('ru-RU')
      state.notes.push(payload);
    },
    DELETE_NOTE(state: any, payload: any){
        state.notes = 
        state.notes.filter((note: any) => {
            if (note.id != payload.id) {
             return note
            }
          });
    }
  },
  actions: {
    async fetchAllNotes({ commit }: any, sort? : string) {
      try {
        const response = await api.get("/notes", {
          params:{
            sort: sort
          }
        });
        commit("SET_NOTES", response.data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async updateNote({ commit }: any, noteData: any) {
      try {
        await api.put(`/notes/${noteData.id}/`, noteData);
        commit("CHAGE_NOTE", noteData);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createNote({ commit }: any, noteData: any) {
      try {
        await api.post(`/notes/`, noteData);
        commit("CREATE_NOTE", noteData);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteNote({ commit }: any, noteData: any) {
        try {
            await api.delete(`/notes/${noteData.id}/`);
            commit("DELETE_NOTE", noteData);
          } catch (error) {
            console.log(error);
            return error;
          }
      },
  },
};

export default noteState;
