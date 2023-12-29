<template>
  <div class="about">
    <div class="form">
      Логин: <input type="text" v-model="formData.username"><br>
      Пароль: <input type="password" v-model="formData.password"><br>
      <button @click="login">Войти</button>
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
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('getToken', this.formData)
    }
  },
  computed: {

  },
});
</script>