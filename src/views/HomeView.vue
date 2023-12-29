<template>
  <div class="home">
    <div class="cards">
      <template v-for="note in notes">
      <div class="card" @click="chooseNote(note)">
        <button @click.stop="closeNote" v-if="formData.id == note.id" class="closeButton">x</button>
        <h1 class="title">{{ note.title }}</h1>
        <p class="text">{{ note.text }}</p>
        <sub class="date">{{ note.created }}</sub>
        <button @click.stop="deleteNote" v-if="formData.id == note.id">Удалить</button>
      </div>
    </template>
    </div>
   
    <div class="form">
      <input v-model="formData.title" type="text" size="30">
      <textarea v-model="formData.text" cols="30" rows="10"></textarea>
      <button @click="saveNote" v-if="formData.id != ''">Сохранить</button>
      <button @click="addNote" v-else-if=" formData.id == ''">Создать</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  async mounted() {
    await this.$store.dispatch('fetchAllNotes')
  },
  computed: {
    notes() {
      return this.$store.state.noteState.notes
    }
  },
  data() {
      return{
        formData: {
          id: '',
          title: '',
          text: '',
          created: ''
        }
      }
  },
  methods: {
    chooseNote(note: any){
      this.formData.title = note.title
      this.formData.text = note.text
      this.formData.id = note.id
      this.formData.created = note.created
    },
    saveNote(){
      if (this.formData.id != '') {
        this.$store.dispatch('updateNote', this.formData)
        
      }
    },
    addNote(){
      this.$store.dispatch('createNote', this.formData)
    },
    deleteNote(){
      this.$store.dispatch('deleteNote', this.formData)
    },
    closeNote(){
      this.formData.title = ''
      this.formData.text = ''
      this.formData.id =''
      this.formData.created = ''
    }
  },
});
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.cards{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  position: relative;
  margin-bottom: 2%;
  width: 40%;
  height: max-content;
  border-radius: 5px;
  border: 1px solid black;
  padding: 2%;
  margin: 2%;
}

.text {
  overflow: hidden;

}

.form {
  display: flex;
  flex-direction: column;
}
input, textarea{
  margin-bottom: 1%;
}
.closeButton{
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0;
  background-color: rgba(12, 12, 12, 0);
}

</style>
